'use client';

import { useState, useEffect, useRef } from 'react';
import { FormField, VisaForm } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, AlertCircle, Calendar as CalendarIcon, FileText, X } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ChildrenInput } from './ChildrenInput';
import { WorkExperience } from './WorkExperience';
import { TravelItinerary } from './TravelItinerary';
import { ResidenceCountries } from './ResidenceCountries';
import { DocumentUpload } from './DocumentUpload';
import SiblingTabs from './SiblingTabs';
import ParentTabs from './ParentTabs';
import MultiCountryDropdown from './MultiCountryDropdown';
import { useParams } from 'next/navigation';
import authRequest from '@/api/authRequest';
import { COUNTRIES } from '@/lib/countries/constants/countries';

interface DynamicFormProps {
  form: VisaForm & { showDocuments?: boolean };
  onSubmit: (data: Record<string, any>) => void;
  initialData?: Record<string, any>;
  currentStep?: number;
  totalSteps?: number;
}

export function DynamicForm({ 
  form, 
  onSubmit, 
  initialData = {}, 
  currentStep = 0, 
  totalSteps = 1 
}: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [visibleFields, setVisibleFields] = useState<Set<string>>(new Set());
  const [requiredDocuments, setRequiredDocuments] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [childrenHasErrors, setChildrenHasErrors] = useState(false);
  const [itineraryHasErrors, setItineraryHasErrors] = useState(false);

  useEffect(() => {
    const visible = new Set<string>();
    console.log('Form data:', formData);
    form.fields.forEach((field) => {
      // Check dependencies first
      const dependenciesMet = !field.dependencies || field.dependencies.every(
        (dep) => formData[dep.fieldId] === dep.value
      );

      // Check showIf condition if it exists
      let showIfConditionMet = true;
      if (field.showIf) {
        console.log('Checking showIf for field:', field.id, 'showIf:', field.showIf);
        
        // Type definitions for conditions
        type SimpleCondition = { field: string; value?: string | number | boolean; not?: string | number | boolean; };
        type ComplexCondition = { 
          operator: "or" | "and"; 
          conditions: Array<SimpleCondition | ComplexCondition>; 
        };
        
        // Recursive function to evaluate complex nested conditions
        const evaluateCondition = (condition: any): boolean => {
          // Handle complex condition with operator
          if ('operator' in condition) {
            const { operator, conditions } = condition as ComplexCondition;
            console.log('Evaluating complex condition - operator:', operator, 'conditions:', conditions);
            
            // Map and evaluate each condition recursively
            const results = conditions.map(subCondition => evaluateCondition(subCondition));
            
            // Apply the appropriate logical operator
            if (operator === 'and') {
              return results.every(Boolean);
            } else if (operator === 'or') {
              return results.some(Boolean);
            }
            return false; // Default case (should not happen)
          } 
          // Handle simple condition
          else if ('field' in condition) {
            const simpleCondition = condition as SimpleCondition;
            const fieldValue = formData[simpleCondition.field];
            console.log(`Evaluating simple condition - field: ${simpleCondition.field}, value: ${fieldValue}, condition:`, condition);
            
            // Handle both value and not conditions
            let result = true;
            
            // If value is defined, check equality
            if (simpleCondition.value !== undefined) {
              result = result && (fieldValue === simpleCondition.value);
              console.log(`Value check: ${fieldValue} === ${simpleCondition.value} -> ${result}`);
            }
            
            // If not is defined, check inequality (this works even if value is also defined)
            if (simpleCondition.not !== undefined) {
              result = result && (fieldValue !== simpleCondition.not);
              console.log(`Not check: ${fieldValue} !== ${simpleCondition.not} -> ${result}`);
            }
            
            return result;
          }
          
          // Default to true if no condition matched
          return true;
        };
        
        // Evaluate the entire condition tree
        showIfConditionMet = evaluateCondition(field.showIf);
        console.log('Final condition result for field', field.id, ':', showIfConditionMet);
      }

      // Field is visible if both dependencies and showIf conditions are met
      if (dependenciesMet && showIfConditionMet) {
        visible.add(field.id);
      }
    });
    setVisibleFields(visible);

    // Update required documents based on form field values
    const documents = new Set<string>();
    form.documents.forEach((doc) => {
      // If document is required and has no conditions, always include it
      if (doc.required && !doc.conditions) {
        documents.add(doc.id);
      } 
      // If document has conditions, check if all conditions are met
      else if (doc.conditions && doc.required) {
        const allConditionsMet = doc.conditions.every(
          (condition) => formData[condition.questionId] === condition.value
        );
        if (allConditionsMet) {
          documents.add(doc.id);
        }
      }
    });
    setRequiredDocuments(documents);
    console.log('Required documents updated:', Array.from(documents));
  }, [form.fields, form.documents, formData]);

  const validateField = (field: FormField, value: any): string | null => {
    if (field.required && (value === undefined || value === null || value === '')) {
      return 'This field is required';
    }
    
    if (field.validations) {
      if (field.validations.min !== undefined && value < field.validations.min) {
        return `Value must be at least ${field.validations.min}`;
      }
      
      if (field.validations.max !== undefined && value > field.validations.max) {
        return `Value must be at most ${field.validations.max}`;
      }
      
      if (field.validations.pattern && typeof value === 'string') {
        const regex = new RegExp(field.validations.pattern);
        if (!regex.test(value)) {
          return 'Invalid format';
        }
      }
      
      if (field.validations.customValidation && !field.validations.customValidation(value)) {
        return 'Invalid value';
      }
    }
    
    return null;
  };

  // Get case ID from URL params
  const params = useParams();
  const caseId = params?.caseId || '';

  // Debounce timer reference
  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});

  // Function to update case question and answer via API with debouncing
  const updateCaseQuestionAnswer = (question: string, label: string, answer: any) => {
    if (!caseId) return;
    
    // Clear any existing timer for this question
    if (debounceTimers.current[question]) {
      clearTimeout(debounceTimers.current[question]);
    }
    
    // Set a new timer
    debounceTimers.current[question] = setTimeout(async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';
        const response = await authRequest({
          method: 'POST',
          url: `${baseUrl}/api/form-manager-v2/case-qa`,
          data: {
            case_id: parseInt(caseId as string, 10),
            question,
            label,
            answer
          }
        });
        console.log('Answer saved:', response.data);
      } catch (error) {
        console.error('Error saving answer:', error);
      }
    }, 1000); // 1 second debounce
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      // Clear all debounce timers when component unmounts
      Object.values(debounceTimers.current).forEach(timer => clearTimeout(timer));
    };
  }, []);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [fieldId]: value };
      console.log(`Field ${fieldId} changed to:`, value);
      return newData;
    });
    
    // Validate the field
    const field = form.fields.find(f => f.id === fieldId);
    if (field) {
      const error = validateField(field, value);
      if (error) {
        setErrors(prev => ({ ...prev, [fieldId]: error }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[fieldId];
          return newErrors;
        });
      }
      
      // Update the case question/answer in the backend
      if (caseId) {
        updateCaseQuestionAnswer(fieldId, field.label, value);
      }
    }
  };
  
  const renderField = (field: FormField) => {
    if (!visibleFields.has(field.id)) {
      return null;
    }
    
    const error = errors[field.id];
    
    switch (field.type) {
      case 'siblingsInput':
        return (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.id}>{field.label}</Label>
            <SiblingTabs 
              value={formData[field.id] ? JSON.stringify(formData[field.id]) : ''} 
              onChange={(value, save) => handleFieldChange(field.id, value)}
              readonly={false}
            />
            {error && (
              <div className="flex items-center gap-2 text-destructive mt-2">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        );

      case 'parentsInput':
        return (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.id}>{field.label}</Label>
            <ParentTabs 
              value={formData[field.id] ? JSON.stringify(formData[field.id]) : ''} 
              onChange={(value, save) => handleFieldChange(field.id, value)}
              readonly={false}
            />
            {error && (
              <div className="flex items-center gap-2 text-destructive mt-2">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        );
        
      case 'countriesInput':
        return (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.id}>{field.label}</Label>
            <MultiCountryDropdown 
              value={formData[field.id] ? JSON.stringify(formData[field.id]) : ''} 
              handleChange={(value, save) => handleFieldChange(field.id, value)}
              readonly={false}
            />
            {error && (
              <div className="flex items-center gap-2 text-destructive mt-2">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        );
        
      case 'residence_countries':
        return (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.id}>{field.label}</Label>
            <ResidenceCountries
              countries={COUNTRIES}
              statuses={[
                { value: 'citizen', label: 'Citizen' },
                { value: 'permanent_resident', label: 'Permanent resident' },
                { value: 'temporary_resident', label: 'Temporary resident' },
                { value: 'worker', label: 'Worker' },
                { value: 'student', label: 'Student' },
                { value: 'visitor', label: 'Visitor' }
              ]}
              value={formData[field.id] || []}
              onChange={(countries) => handleFieldChange(field.id, countries)}
            />
            {error && (
              <div className="flex items-center gap-2 text-destructive mt-2">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        );
        
      case 'work_experience':
        return (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.id}>{field.label}</Label>
            <WorkExperience
              onChange={(experiences) => handleFieldChange(field.id, experiences)}
              value={formData[field.id]}
            />
            {error && (
              <div className="flex items-center gap-2 text-destructive mt-2">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        );
        
      case 'file':
        return (
          <div className="space-y-2 mb-6" key={field.id}>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor={field.id} className="font-medium">
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>
              <div className="text-sm text-muted-foreground">
                PDF, JPG, PNG (max 4MB)
              </div>
            </div>
            
            {field.description && (
              <p className="text-sm text-muted-foreground mb-3">{field.description}</p>
            )}
            
            {!formData[field.id] ? (
              <div className="flex items-center justify-center h-32 bg-muted rounded-md cursor-pointer border border-dashed"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = '.pdf,.jpg,.jpeg,.png';
                  input.onchange = (e: any) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 4 * 1024 * 1024) {
                        setErrors(prev => ({
                          ...prev,
                          [field.id]: 'File size exceeds 4MB limit'
                        }));
                        return;
                      }
                      
                      if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
                        setErrors(prev => ({
                          ...prev,
                          [field.id]: 'Invalid file type. Please upload PDF, JPG, or PNG'
                        }));
                        return;
                      }
                      
                      handleFieldChange(field.id, {
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        lastModified: file.lastModified
                      });
                      
                      if (errors[field.id]) {
                        setErrors(prev => {
                          const newErrors = {...prev};
                          delete newErrors[field.id];
                          return newErrors;
                        });
                      }
                    }
                  };
                  input.click();
                }}
              >
                <div className="text-center">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium">Click to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">or drag and drop</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm truncate max-w-[200px]">
                    {formData[field.id].name}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    handleFieldChange(field.id, null);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {error && (
              <div className="flex items-center gap-2 text-destructive mt-2">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        );
        
      case 'header':
        return (
          <div key={field.id} className="mb-4">
            <h2 className="text-xl font-semibold mb-2">{field.label}</h2>
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
          </div>
        );
        
      case 'info':
        return (
          <div key={field.id} className="mb-4 p-4 bg-muted rounded-md">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                {field.label && <h3 className="font-medium mb-1">{field.label}</h3>}
                {field.description && <p className="text-sm">{field.description}</p>}
                {field.content && Array.isArray(field.content) && (
                  <div className="mt-2 space-y-1">
                    {field.content.map((item, index) => (
                      <p key={index} className="text-sm">{item}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
        return (
          <div key={field.id} className="mb-4">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.id] || ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={cn(
                'w-full',
                error ? 'border-destructive' : 'border-input'
              )}
            />
            {field.description && <p className="text-sm text-muted-foreground mt-1">{field.description}</p>}
            {error && (
              <p className="text-sm text-destructive flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {error}
              </p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id} className="mb-4">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <textarea
              id={field.id}
              placeholder={field.placeholder}
              value={formData[field.id] || ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={cn(
                'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                error && 'border-destructive'
              )}
            />
            {field.description && <p className="text-sm text-muted-foreground mt-1">{field.description}</p>}
            {error && (
              <p className="text-sm text-destructive flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {error}
              </p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="mb-4">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Select
              value={formData[field.id] || ''}
              onValueChange={(value) => handleFieldChange(field.id, value)}
            >
              <SelectTrigger id={field.id} className={cn(error && 'border-destructive')}>
                <SelectValue placeholder={field.placeholder || 'Select an option'} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field.description && <p className="text-sm text-muted-foreground mt-1">{field.description}</p>}
            {error && (
              <p className="text-sm text-destructive flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {error}
              </p>
            )}
          </div>
        );

      case 'date':
        return (
          <div key={field.id} className="mb-4">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id={field.id}
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !formData[field.id] && 'text-muted-foreground',
                    error && 'border-destructive'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData[field.id] ? format(new Date(formData[field.id]), 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData[field.id] ? new Date(formData[field.id]) : undefined}
                  onSelect={(date) => handleFieldChange(field.id, date ? date.toISOString() : '')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {field.description && <p className="text-sm text-muted-foreground mt-1">{field.description}</p>}
            {error && (
              <p className="text-sm text-destructive flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {error}
              </p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id} className="mb-4 flex items-start space-x-2">
            <Checkbox
              id={field.id}
              checked={formData[field.id] === true}
              onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
              className={error ? 'border-destructive' : ''}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor={field.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>
              {field.description && (
                <p className="text-sm text-muted-foreground">{field.description}</p>
              )}
              {error && (
                <p className="text-sm text-destructive flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {error}
                </p>
              )}
            </div>
          </div>
        );

      case 'children':
        return (
          <div key={field.id} className="mb-4">
            <Label htmlFor={field.id}>{field.label}</Label>
            <ChildrenInput
              value={formData[field.id] || []}
              onChange={(children) => {
                handleFieldChange(field.id, children);
              }}
              onError={(hasErrors) => setChildrenHasErrors(hasErrors)}
            />
            {error && (
              <div className="flex items-center gap-2 text-destructive mt-2">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        );

      case 'travel_itinerary':
        return (
          <div key={field.id} className="mb-4">
            <Label htmlFor={field.id}>{field.label}</Label>
            <TravelItinerary
              value={formData[field.id] || []}
              onChange={(itinerary) => {
                handleFieldChange(field.id, itinerary);
              }}
              onError={(hasErrors) => setItineraryHasErrors(hasErrors)}
            />
            {error && (
              <div className="flex items-center gap-2 text-destructive mt-2">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const requestDocuments = async () => {
    if (!caseId || !form.documents || form.documents.length === 0) return;
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';
      
      const documentRequests = form.documents
        .filter(doc => requiredDocuments.has(doc.id))
        .map(doc => ({
          title: doc.name,
          category_id: parseInt(doc.id, 10) || 1, // Convert string ID to number or use default
          remarks: doc.description || ""
        }));
      
      if (documentRequests.length === 0) return;
      
      const response = await authRequest({
        method: 'POST',
        url: `${baseUrl}/api/case-manager/documents/request-multiple-documents`,
        data: {
          case_id: parseInt(caseId as string, 10),
          documents: documentRequests
        }
      });
      
      console.log('Document requests sent successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error requesting documents:', error);
    }
  };

  // Debug panel to show which documents are required based on form responses
  const renderDebugPanel = () => {
    if (process.env.NODE_ENV === 'production') return null;
    
    return (
      <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-md bg-gray-50">
        <h3 className="text-sm font-medium mb-2">Required Documents (Debug):</h3>
        {requiredDocuments.size === 0 ? (
          <p className="text-xs text-gray-500">No documents required based on current form state</p>
        ) : (
          <ul className="text-xs space-y-1">
            {Array.from(requiredDocuments).map(docId => {
              const doc = form.documents.find(d => d.id === docId);
              return (
                <li key={docId} className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <div>
                    <span className="font-medium">{doc?.name}</span> (ID: {docId})
                    {doc?.conditions && (
                      <div className="text-gray-500 ml-4 mt-1">
                        <span className="text-xs">Conditions: </span>
                        {doc.conditions.map((c, i) => (
                          <span key={i} className="text-xs">
                            {c.questionId}={c.value}{i < doc.conditions!.length - 1 ? ' AND ' : ''}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  // Render document upload component when showDocuments is true
//   const renderDocuments = () => {
//     if (!form.showDocuments) return null;
    
//     // Get the purpose of visit from form data
//     const purposeOfVisit = formData.purposeOfVisit || '';
    
//     return (
//       <div className="mt-8">
//         <DocumentUpload 
//           form={form} 
//           purposeOfVisit={purposeOfVisit}
//           onUploadComplete={(documentId, extractedData) => {
//             // Update form data with extracted information
//             setFormData(prev => ({
//               ...prev,
//               ...extractedData,
//               [`document_${documentId}_uploaded`]: true
//             }));
//           }}
//           onError={(hasErrors) => {
//             // Track document upload errors
//             setErrors(prev => ({
//               ...prev,
//               documentUploadErrors: hasErrors ? 'Please fix document upload errors' : ''
//             }));
//           }}
//         />
//       </div>
//     );
//   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    form.fields.forEach(field => {
      if (visibleFields.has(field.id)) {
        const error = validateField(field, formData[field.id]);
        if (error) {
          newErrors[field.id] = error;
        }
      }
    });

    // Check for document upload errors if we're on a document step
    const hasDocumentErrors = form.showDocuments && errors.documentUploadErrors;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && !childrenHasErrors && !itineraryHasErrors && !hasDocumentErrors) {
      // If we're on the final step and documents are required, request them from the backend
      if (currentStep === totalSteps - 1 && form.showDocuments) {
        await requestDocuments();
      }
      
      // Continue with form submission
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        {form.fields.map(renderField)}
      </div>
      {/* {renderDocuments()} */}
      
      {/* Show debug panel in development mode when documents are available */}
      {process.env.NODE_ENV !== 'production' && form.documents && form.documents.length > 0 && renderDebugPanel()}
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={childrenHasErrors || itineraryHasErrors}
      >
        {currentStep === totalSteps - 1 ? 'Submit Application' : 'Continue'}
      </Button>
    </form>
  );
}
