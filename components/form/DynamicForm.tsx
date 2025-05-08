'use client';

import { useState, useEffect, useRef } from 'react';
import { FormField, VisaForm } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Upload, AlertCircle, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ChildrenInput } from './ChildrenInput';
import { WorkExperience } from './WorkExperience';
import { TravelItinerary } from './TravelItinerary';
import { useParams } from 'next/navigation';
import authRequest from '@/api/authRequest';

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
        
        // Type guard for complex conditions with operator and conditions array
        type ComplexCondition = { operator: "or" | "and"; conditions: Array<{ field: string; value?: string | number | boolean; not?: string | number | boolean; }>; };
        // Type guard for simple condition with direct field property
        type SimpleCondition = { field: string; value?: string | number | boolean; not?: string | number | boolean; };
        
        // Check if it's a complex condition with operator
        if ('operator' in field.showIf) {
          // Handle the operator/conditions case
          const { operator, conditions } = field.showIf as ComplexCondition;
          console.log('Complex condition - operator:', operator, 'conditions:', conditions);
          
          const conditionResults = conditions.map(condition => {
            const fieldValue = formData[condition.field];
            console.log(`Condition check - field: ${condition.field}, value: ${fieldValue}, condition:`, condition);
            
            if (condition.value !== undefined) {
              const result = fieldValue === condition.value;
              console.log(`Value check: ${fieldValue} === ${condition.value} -> ${result}`);
              return result;
            } else if (condition.not !== undefined) {
              const result = fieldValue !== condition.not;
              console.log(`Not check: ${fieldValue} !== ${condition.not} -> ${result}`);
              return result;
            }
            return true;
          });
          
          showIfConditionMet = operator === 'and' 
            ? conditionResults.every(Boolean)
            : conditionResults.some(Boolean);
            
          console.log('Final complex condition result:', showIfConditionMet);
        } else {
          // Handle the simple field/value case
          const simpleCondition = field.showIf as SimpleCondition;
          const fieldValue = formData[simpleCondition.field];
          console.log(`Simple condition - field: ${simpleCondition.field}, value: ${fieldValue}, condition:`, field.showIf);
          
          if (simpleCondition.value !== undefined) {
            showIfConditionMet = fieldValue === simpleCondition.value;
            console.log(`Value check: ${fieldValue} === ${simpleCondition.value} -> ${showIfConditionMet}`);
          } else if (simpleCondition.not !== undefined) {
            // If the field has a 'not' condition, it should be hidden when the value matches
            showIfConditionMet = fieldValue !== simpleCondition.not;
            console.log(`Not check: ${fieldValue} !== ${simpleCondition.not} -> ${showIfConditionMet}`);
          } else {
            // If no specific condition is met, default to showing the field
            showIfConditionMet = true;
            console.log('No specific condition, defaulting to show');
          }
        }
      }

      // Field is visible if both dependencies and showIf conditions are met
      if (dependenciesMet && showIfConditionMet) {
        visible.add(field.id);
      }
    });
    setVisibleFields(visible);

    const documents = new Set<string>();
    form.documents.forEach((doc) => {
      if (doc.type === 'default') {
        documents.add(doc.id);
      } else if (doc.conditions) {
        const allConditionsMet = doc.conditions.every(
          (condition) => formData[condition.questionId] === condition.value
        );
        if (allConditionsMet) {
          documents.add(doc.id);
        }
      }
    });
    setRequiredDocuments(documents);
  }, [form.fields, form.documents, formData]);

  const validateField = (field: FormField, value: any): string | null => {
    if (field.required && !value) {
      return 'This field is required';
    }
    if (field.validations) {
      const { min, max, pattern, customValidation } = field.validations;
      if (typeof value === 'number') {
        if (min !== undefined && value < min) {
          return `Value must be at least ${min}`;
        }
        if (max !== undefined && value > max) {
          return `Value must be at most ${max}`;
        }
      }
      if (pattern && typeof value === 'string' && !new RegExp(pattern).test(value)) {
        return 'Invalid format';
      }
      if (customValidation && !customValidation(value)) {
        return 'Please ensure all information is complete and valid';
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
    // Clear any existing timer for this question
    if (debounceTimers.current[question]) {
      clearTimeout(debounceTimers.current[question]);
    }

    // Set a new timer for this question (500ms debounce time)
    debounceTimers.current[question] = setTimeout(async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';
        const response = await authRequest({
          method: 'POST',
          url: `${baseUrl}/api/form-manager-v2/case-qa`,
          data: {
            case_id: caseId,
            question: question,
            label: label, 
            answer: String(answer)
          }
        });
        
        console.log('API response for', question, '(', label, '):', response.data);
        return response.data;
      } catch (error) {
        console.error('Error updating case question and answer:', error);
      }
    }, 500); // 500ms debounce time
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      // Clear all debounce timers when component unmounts
      Object.values(debounceTimers.current).forEach(timer => clearTimeout(timer));
    };
  }, []);

  const handleFieldChange = (fieldId: string, value: any) => {
    const field = form.fields.find(f => f.id === fieldId);
    console.log("FIELD ----<>",field)
    if (field) {
      const error = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [fieldId]: error || ''
      }));

      // Call API to update the question and answer
      if (caseId) {
        // Pass both field ID and label to the update function
        updateCaseQuestionAnswer(fieldId, field.label, value);
      }
    }
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const renderField = (field: FormField) => {
    // Skip rendering if field is not in visibleFields
    if (!visibleFields.has(field.id)) {
      return null;
    }

    const error = errors[field.id];
    const commonProps = {
      id: field.id,
      'aria-invalid': !!error,
      className: cn(
        'w-full',
        error ? 'border-destructive' : 'border-input'
      )
    };

    if (field.id === 'children' && field.group === 'family') {
      return (
        <div className="space-y-2" key={field.id}>
          <ChildrenInput
            onChange={(children) => handleFieldChange(field.id, children)}
            value={formData[field.id]}
            onError={setChildrenHasErrors}
          />
          {error && (
            <div className="flex items-center gap-2 text-destructive mt-2">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>
      );
    }

    if (field.id === 'workExperience' && field.group === 'work') {
      return (
        <div className="space-y-2" key={field.id}>
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
    }

    if (field.id === 'itinerary' && field.group === 'travel') {
      return (
        <div className="space-y-2" key={field.id}>
          <TravelItinerary
            onChange={(destinations) => handleFieldChange(field.id, destinations)}
            value={formData[field.id]}
            onError={setItineraryHasErrors}
          />
          {error && (
            <div className="flex items-center gap-2 text-destructive mt-2">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>
      );
    }

    switch (field.type) {
      case 'info':
        return (
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200" key={field.id}>
            <h3 className="text-lg font-medium text-blue-900">{field.label}</h3>
            <div className="space-y-2 text-sm text-blue-800">
              {field.content?.map((line, index) => (
                <p key={index} className={line.startsWith('✓') ? 'flex items-start' : 'pl-6'}>
                  {line.startsWith('✓') && (
                    <span className="mr-2 text-green-600">✓</span>
                  )}
                  {line.startsWith('•') ? (
                    <span className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{line.substring(1).trim()}</span>
                    </span>
                  ) : (
                    line
                  )}
                </p>
              ))}
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              {...commonProps}
              placeholder={field.placeholder}
              value={formData[field.id] || ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              required={field.required}
            />
            {error && (
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        );
      case 'select':
        return (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.id}>{field.label}</Label>
            <Select
              value={formData[field.id] || ''}
              onValueChange={(value) => handleFieldChange(field.id, value)}
            >
              <SelectTrigger className={cn("w-full", error && "border-destructive")}>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && (
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        );
      case 'date':
        return (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.id}>{field.label}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !formData[field.id] && 'text-muted-foreground',
                    error && "border-destructive"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData[field.id] ? format(new Date(formData[field.id]), 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData[field.id] ? new Date(formData[field.id]) : undefined}
                  onSelect={(date) => handleFieldChange(field.id, date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {error && (
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        );
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2" key={field.id}>
            <Checkbox
              {...commonProps}
              checked={formData[field.id] || false}
              onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
            />
            <Label htmlFor={field.id}>{field.label}</Label>
            {error && (
              <div className="flex items-center gap-2 text-destructive">
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

  // Function to request documents from the backend
  const requestDocuments = async () => {
    if (!caseId || !form.documents || form.documents.length === 0) return;
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';
      
      // Prepare document requests based on the required documents
      const documentRequests = form.documents
        .filter(doc => requiredDocuments.has(doc.id))
        .map(doc => ({
          title: doc.name,
          category_id: parseInt(doc.id, 10) || 1, // Convert string ID to number or use default
          remarks: doc.description || ""
        }));
      
      if (documentRequests.length === 0) return;
      
      // Send the document requests to the backend
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
  
  // This function is kept for compatibility but doesn't render anything
  const renderDocuments = () => {
    // We don't render document upload fields anymore
    // Documents will be requested via API when the form is submitted
    return null;
  };

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

    // We no longer validate document uploads since they're handled separately

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && !childrenHasErrors && !itineraryHasErrors) {
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
      {renderDocuments()}
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