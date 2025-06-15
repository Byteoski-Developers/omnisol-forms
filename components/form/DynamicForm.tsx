'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { FormField, VisaForm } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DateOfBirthField } from '@/components/form/DateOfBirthField';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, AlertCircle, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChildrenInput } from './ChildrenInput';
import { WorkExperience } from './WorkExperience';
import { TravelItinerary } from './TravelItinerary';
import { ResidenceCountries } from './ResidenceCountries';
import SpouseTabs from '@/components/form/spousedetails'; // Or the correct path if spousedetails.tsx exports SpouseTabs
import SiblingTabs from './SiblingTabs';
import ParentTabs from './ParentTabs';
import MultiCountryDropdown from './MultiCountryDropdown';
import { useParams } from 'next/navigation';
import authRequest from '@/api/authRequest';
import { COUNTRIES } from '@/lib/countries/constants/countries';
import TextArea from '@/components/ui/textarea';
import AccessingBodyAssessmentInput from "@/components/form/AccessingBodyAssessmentInput";
import SocialHandles from "@/components/form/SocialHandles";
import Last10YearActivity from "./Last10YearActivity";
import RefusalInput from "./RefusalInput";
import ChildrenInputField from "./ChildrenInputField";
import LanguageTestInput from "./LanguageTestInput";
import DocumentPreviewPanel from "@/components/form/DocumentPreviewPanel";
import { MultiSelect } from "./MultiSelect";
import { CheckboxMultiSelect } from "./CheckboxMultiSelect";
import DateField from "./datefield";
import ChildrenInputFieldUSA from './ChildrenInputFieldUsa';




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
    const searchParams = typeof window !== 'undefined' ? useSearchParams() : null;
    const [formData, setFormData] = useState<Record<string, any>>(initialData);
    const [visibleFields, setVisibleFields] = useState<Set<string>>(new Set());
    const [requiredDocuments, setRequiredDocuments] = useState<Set<string>>(new Set());
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [childrenHasErrors, setChildrenHasErrors] = useState(false);
    const [itineraryHasErrors, setItineraryHasErrors] = useState(false);

    // Type definitions for conditions
    type SimpleCondition = { field: string; value?: string | number | boolean; not?: string | number | boolean; };
    type ComplexCondition = {
        operator: "or" | "and";
        conditions: Array<SimpleCondition | ComplexCondition>;
    };

    // Recursive function to evaluate complex nested conditions
    const evaluateCondition = useCallback((condition: any): boolean => {
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
            return false;
        }

        // Handle simple condition
        const { field, value, not } = condition as SimpleCondition;
        console.log('Evaluating simple condition - field:', field, 'value:', value, 'not:', not, 'formData[field]:', formData[field]);

        // Check if the field exists in formData
        if (!(field in formData)) {
            console.log('Field not found in formData:', field);
            return false;
        }

        // Check if we're looking for a specific value or a negation
        if (value !== undefined) {
            // For array values, check if the value is included in the array
            if (Array.isArray(formData[field])) {
                return formData[field].includes(value);
            }
            return formData[field] === value;
        } else if (not !== undefined) {
            // For array values, check if the value is NOT included in the array
            if (Array.isArray(formData[field])) {
                return !formData[field].includes(not);
            }
            return formData[field] !== not;
        }

        // If no value or not is specified, check if the field has any value
        return Boolean(formData[field]);
    }, [formData]);

    // Memoize visible fields calculation to prevent infinite loops
    const visibleFieldsCalculation = useMemo(() => {
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
                showIfConditionMet = evaluateCondition(field.showIf);
                console.log('Final condition result for field', field.id, ':', showIfConditionMet);
            }

            // Field is visible if both dependencies and showIf conditions are met
            if (dependenciesMet && showIfConditionMet) {
                visible.add(field.id);
            }
        });

        return visible;
    }, [form.fields, formData, evaluateCondition]);

    // Update visible fields when calculation changes
    useEffect(() => {
        setVisibleFields(visibleFieldsCalculation);
    }, [visibleFieldsCalculation]);

    // Separate effect for required documents
    useEffect(() => {
        const documents = new Set<string>();
        form.documents.forEach((doc) => {
            // If document is required and has no conditions, always include it
            if (doc.required && !doc.conditions) {
                documents.add(doc.id);
            }
            // If document has conditions, check if all conditions are met
            else if (doc.conditions && doc.required) {
                // For documents with multiple conditions (like language_test), any matching condition is sufficient
                const allConditionsMet = doc.conditions.some((condition) => {
                    // Special handling for language test conditions
                    if (condition.questionId === 'languageTest') {
                        // Check if languageTest exists in formData and has a value property
                        if (formData.languageTest && formData.languageTest.value) {
                            // Extract the testType from the languageTest object
                            const testType = formData.languageTest.value.testType;
                            return testType === condition.value;
                        }
                        return false;
                    }

                    // Regular condition checking
                    // Handle array values from checkbox-multiselect
                    if (Array.isArray(formData[condition.questionId])) {
                        return formData[condition.questionId].includes(condition.value);
                    }

                    // Regular single value checking
                    return formData[condition.questionId] === condition.value;
                });

                if (allConditionsMet) {
                    documents.add(doc.id);
                }
            }
        });
        setRequiredDocuments(documents);
    }, [form.documents, formData]);

    // Clean up hidden fields when visibility changes (throttled to prevent loops)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const fieldsToRemove: string[] = [];

            Object.keys(formData).forEach(fieldId => {
                // If field exists in form.fields and is not visible, mark for removal
                const fieldExists = form.fields.some(f => f.id === fieldId);
                if (fieldExists && !visibleFields.has(fieldId)) {
                    fieldsToRemove.push(fieldId);
                }
            });

            // Only update if there are fields to remove
            if (fieldsToRemove.length > 0) {
                setFormData(prev => {
                    const newData = { ...prev };
                    fieldsToRemove.forEach(fieldId => {
                        delete newData[fieldId];
                    });
                    return newData;
                });

                setPendingChanges(prev =>
                    prev.filter(change => !fieldsToRemove.includes(change.question))
                );
            }
        }, 0); // Use setTimeout to defer the update

        return () => clearTimeout(timeoutId);
    }, [visibleFields]);

    // const validateField = (field: FormField, value: any): string | null => {
    //   if (field.required && (value === undefined || value === null || value === '')) {
    //     return 'This field is required';
    //   }

    //   if (field.validations) {
    //     if (field.validations.min !== undefined && value < field.validations.min) {
    //       return `Value must be at least ${field.validations.min}`;
    //     }

    //     if (field.validations.max !== undefined && value > field.validations.max) {
    //       return `Value must be at most ${field.validations.max}`;
    //     }

    //     if (field.validations.pattern && typeof value === 'string') {
    //       const regex = new RegExp(field.validations.pattern);
    //       if (!regex.test(value)) {
    //         return 'Invalid format';
    //       }
    //     }

    //     if (field.validations.customValidation && !field.validations.customValidation(value)) {
    //       return 'Invalid value';
    //     }
    //   }

    //   return null;
    // };


    // Add this enhanced validateField function to replace the existing one in your DynamicForm component
    // Location: Inside the DynamicForm component, replace the existing validateField function

    const validateField = (field: FormField, value: any): string | null => {
        if (field.required && (value === undefined || value === null || value === '')) {
            return 'This field is required';
        }

        // Date-specific validations - ONLY FOR TRAVEL PLANS
        if (field.type === 'date' && value) {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison

            // Check if the date is valid
            if (isNaN(selectedDate.getTime())) {
                return 'Please select a valid date';
            }

            // Define ONLY travel-related fields for validation
            const travelFields = [
                'plannedArrivalDate', 'plannedDepartureDate', 'travelDate',
                'departureDate', 'arrivalDate', 'intendedDateOfTravel',
                'proposedTravelDate', 'scheduledDepartureDate'
            ];

            // Apply validation ONLY to travel-related fields
            if (travelFields.some(fieldName => field.id.toLowerCase().includes(fieldName.toLowerCase()))) {
                // Reset time components to ensure accurate date comparison
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                // For travel dates, ensure they are not in the past (allow today and future dates)
                if (selectedDate < today) {
                    return 'Travel dates cannot be in the past';
                }

                // Additional validation for arrival/departure date logic
                if (field.id === 'plannedDepartureDate' && formData['plannedArrivalDate']) {
                    const arrivalDate = new Date(formData['plannedArrivalDate']);
                    arrivalDate.setHours(0, 0, 0, 0);
                    if (selectedDate <= arrivalDate) {
                        return 'Departure date must be after arrival date';
                    }
                }

                if (field.id === 'plannedArrivalDate' && formData['plannedDepartureDate']) {
                    const departureDate = new Date(formData['plannedDepartureDate']);
                    departureDate.setHours(0, 0, 0, 0);
                    if (selectedDate >= departureDate) {
                        return 'Arrival date must be before departure date';
                    }
                }
            }
        }

        // Existing validations
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

    // Track changes that need to be saved
    const [pendingChanges, setPendingChanges] = useState<Array<{
        question: string;
        label: string;
        answer: any;
        category?: string;
        step?: number;
        step_slug?: string;
        question_type?: string;
    }>>([]);

    // Function to save all pending changes to the backend
    const saveAllChanges = async () => {
        if (!caseId || pendingChanges.length === 0) return;

        // Get the current step slug if available
        const currentStepSlug = form.steps && form.steps[currentStep] ? form.steps[currentStep].slug : undefined;

        // Create a copy of pendingChanges with stringified answers
        const questionsWithStringifiedAnswers = pendingChanges.map(change => ({
            ...change,
            answer: typeof change.answer === 'object' && change.answer !== null
                ? JSON.stringify(change.answer)
                : String(change.answer) // Convert all non-object values to strings too
        }));

        try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';
            const response = await authRequest({
                method: 'POST',
                url: `${baseUrl}/api/form-manager-v2/case-qa-batch`,
                data: {
                    case_id: parseInt(caseId as string, 10),
                    step: currentStep,
                    step_slug: currentStepSlug,
                    total_steps: totalSteps,
                    questions: questionsWithStringifiedAnswers
                }
            });
            console.log('All changes saved:', response.data);

            // Clear pending changes after successful save
            setPendingChanges([]);
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    // Function to add a change to the pending changes queue
    const queueChange = (question: string, label: string, answer: any, category?: string) => {
        // Get the current step slug if available
        const currentStepSlug = form.steps && form.steps[currentStep] ? form.steps[currentStep].slug : undefined;

        // Find the field to get its type
        const field = form.fields.find(f => f.id === question);
        const questionType = field ? field.type : undefined;

        setPendingChanges(prev => {
            // Remove any existing change for this question
            const filtered = prev.filter(change => change.question !== question);
            // Add the new change with the current step information, slug, and question type
            return [...filtered, {
                question,
                label,
                answer,
                category,
                step: currentStep,
                step_slug: currentStepSlug,
                question_type: questionType
            }];
        });
    };

    const handleFieldChange = (fieldId: string, value: any, save?: boolean) => {
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

            // Queue the change to be saved when the form is submitted
            // Only queue if save is true or undefined (backward compatibility)
            if (caseId && (save === undefined || save === true)) {
                queueChange(fieldId, field.label, value, field.category);
            }
        }
    };

    const renderField = (field: FormField) => {
        const { id, type, label, placeholder, options, required, description, showIf, component } = field;

        // Check if the field should be shown based on visibleFields set
        if (!visibleFields.has(id)) {
            return null;
        }

        // Get the field value from form data
        const value = formData[id] || '';
        const error = errors[id];

        // Common props for all field types
        const commonProps = {
            id,
            label,
            value,
            error,
            required,
            description,
            handleChange: (val: any, save?: boolean) => handleFieldChange(id, val, save),
            readonly: false
        };

        switch (type) {
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

            case 'accessingBodyAssessment':
                return (
                    <div className="space-y-2" key={field.id}>
                        <Label htmlFor={field.id}>{field.label}</Label>
                        <AccessingBodyAssessmentInput
                            handleChange={(value) => handleFieldChange(field.id, value)}
                            inputValue={formData[field.id] || ''}
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
                                                    const newErrors = { ...prev };
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
                        <TextArea
                            id={field.id}
                            label=""
                            placeholder={field.placeholder}
                            defaultValue={formData[field.id] || ''}
                            onChange={(value) => handleFieldChange(field.id, value)}
                            required={field.required}
                            error={error}
                            helpText={field.description}
                            setErrorSubmission={(hasError) => {
                                if (hasError) {
                                    setErrors(prev => ({ ...prev, [field.id]: 'Character limit exceeded' }));
                                } else {
                                    setErrors(prev => {
                                        const newErrors = { ...prev };
                                        delete newErrors[field.id];
                                        return newErrors;
                                    });
                                }
                            }}
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

            case 'multiselect':
                return (
                    <div key={field.id} className="mb-4">
                        <Label htmlFor={field.id}>{field.label}</Label>
                        <MultiSelect
                            options={field.options || []}
                            selectedValues={Array.isArray(formData[field.id]) ? formData[field.id] : (formData[field.id] ? [formData[field.id]] : [])}
                            onChange={(values) => handleFieldChange(field.id, values, true)}
                            placeholder={field.placeholder || 'Select options'}
                        />
                        {error && (
                            <div className="flex items-center gap-2 text-destructive mt-2">
                                <AlertCircle className="h-4 w-4" />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
                    </div>
                );

            case 'checkbox-multiselect':
                return (
                    <div key={field.id} className="mb-6">
                        <CheckboxMultiSelect
                            options={field.options || []}
                            selectedValues={Array.isArray(formData[field.id]) ? formData[field.id] : (formData[field.id] ? [formData[field.id]] : [])}
                            onChange={(values) => handleFieldChange(field.id, values, true)}
                            placeholder={field.placeholder || 'Click to select sources'}
                            label={field.label}
                            helpText={field.helpText || "Select all sources that apply to your situation. This helps us determine the exact documents you'll need to provide."}
                            showCategories={field.showCategories !== false}
                            maxHeight={field.maxHeight || 300}
                        />
                        {error && (
                            <div className="flex items-center gap-2 text-destructive mt-2">
                                <AlertCircle className="h-4 w-4" />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                        {description && <p className="text-sm text-muted-foreground mt-2">{description}</p>}
                    </div>
                );

            case 'DateofBirth':
                return (
                    <div className="space-y-2" key={field.id}>
                        <Label htmlFor={field.id}>
                            {field.label}
                            {field.required && <span className="text-destructive ml-1">*</span>}
                        </Label>
                        <DateOfBirthField
                            field={{
                                id: field.id,
                                label: field.label,
                                required: field.required,
                                description: field.description
                            }}
                            value={value}
                            onChange={(val) => {
                                // Clear any existing error when the date changes
                                if (errors[field.id]) {
                                    const newErrors = { ...errors };
                                    delete newErrors[field.id];
                                    setErrors(newErrors);
                                }
                                handleFieldChange(field.id, val);
                            }}
                            error={error}
                        />
                        {field.description && (
                            <p className="text-sm text-muted-foreground mt-1">{field.description}</p>
                        )}
                    </div>
                );

            case 'date':
                return (
                    <DateField
                        field={field}
                        formData={formData}
                        handleFieldChange={handleFieldChange}
                        error={error}
                        disableFutureDates={field.disableFutureDates || false}
                    />
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

            case 'socialHandles':
                return (
                    <div key={field.id} className="mb-4">
                        <Label htmlFor={field.id}>{field.label}</Label>
                        <SocialHandles
                            inputValue={formData[field.id] || {}}
                            handleChange={(handles) => handleFieldChange(field.id, handles.value)}
                        />
                        {error && (
                            <div className="flex items-center gap-2 text-destructive mt-2">
                                <AlertCircle className="h-4 w-4" />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                    </div>
                );

            case 'last10YearActivity':
                return (
                    <div key={field.id} className="mb-4">
                        <Label htmlFor={field.id}>{field.label}</Label>
                        <Last10YearActivity
                            inputValue={formData[field.id] || []}
                            handleChange={(activities: any) => handleFieldChange(field.id, activities.value)}
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

            case 'languageTest':
                return (
                    <div key={field.id} className="mb-4">
                        <Label htmlFor={field.id}>{field.label}</Label>
                        <LanguageTestInput
                            inputValue={formData[field.id] || {}}
                            handleChange={(val: any, save?: boolean) => handleFieldChange(field.id, val, save)}
                            readonly={false}
                        />
                        {error && (
                            <div className="flex items-center gap-2 text-destructive mt-2">
                                <AlertCircle className="h-4 w-4" />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                        {field.description && <p className="text-sm text-muted-foreground mt-1">{field.description}</p>}
                    </div>
                );

            case 'spouseDetails':
                return (
                    <div key={id} className="mb-4">
                        <Label htmlFor={id}>{label}</Label>
                        <SpouseTabs
                            value={formData[id] || {}}
                            onChange={(val) => handleFieldChange(id, val, true)}
                        />
                        {error && (
                            <div className="flex items-center gap-2 text-destructive mt-2">
                                <AlertCircle className="h-4 w-4" />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
                    </div>
                );

            case 'SingleapplicantFamily':
                return (
                    <div key={id} className="mb-4">
                        <Label htmlFor={id}>{label}</Label>
                        <ParentTabs
                            value={formData[id] || {}}
                            onChange={(val) => handleFieldChange(id, val, true)}
                        />
                        {error && (
                            <div className="flex items-center gap-2 text-destructive mt-2">
                                <AlertCircle className="h-4 w-4" />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
                    </div>
                );

            case 'refusalInput':
                return (
                    <div key={id} className="mb-4">
                        <Label htmlFor={id}>{label}</Label>
                        <RefusalInput
                            inputValue={value}
                            handleChange={(val: any, save?: boolean) => handleFieldChange(id, val, save)}
                            readonly={false}
                        />
                        {error && (
                            <div className="flex items-center gap-2 text-destructive mt-2">
                                <AlertCircle className="h-4 w-4" />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
                    </div>
                );

            case 'childrenInput':
                return (
                    <div key={id} className="mb-4">
                        <Label htmlFor={id}>{label}</Label>
                        <ChildrenInputField
                            inputValue={value}
                            handleChange={(val: any, save?: boolean) => handleFieldChange(id, val, save)}
                            readonly={false}
                        />
                        {error && (
                            <div className="flex items-center gap-2 text-destructive mt-2">
                                <AlertCircle className="h-4 w-4" />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
                    </div>
                );

            case 'ChildrenInputFieldUSA':
                return (
                    <div key={id} className="mb-4">
                        <Label htmlFor={id}>{label}</Label>
                        <ChildrenInputFieldUSA
                            inputValue={value}
                            handleChange={(val: any, save?: boolean) => handleFieldChange(id, val, save)}
                            readonly={false}
                        />
                        {error && (
                            <div className="flex items-center gap-2 text-destructive mt-2">
                                <AlertCircle className="h-4 w-4" />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
                    </div>
                );

            default:
                return <>no valid component found for {field.type}</>;
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


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        // Validate all visible fields
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
            // Ensure all visible fields are included in the submission, even if they weren't changed
            ensureAllVisibleFieldsAreQueued();

            // Save all pending changes to the backend
            await saveAllChanges();
            await requestDocuments();

            // Continue with form submission
            onSubmit(formData);

            // If slug is present in URL, close the window
            const stepSlug = searchParams?.get && searchParams.get('slug');
            if (stepSlug && typeof window !== 'undefined') {
                setTimeout(() => window.close(), 100);
            }
        }
    };

    // Function to ensure all visible fields are included in the submission
    const ensureAllVisibleFieldsAreQueued = () => {
        // Get all visible fields that are not already in pendingChanges
        const visibleFieldIds = Array.from(visibleFields);
        const pendingFieldIds = pendingChanges.map(change => change.question);

        // Find fields that are visible but not in pendingChanges
        const missingFieldIds = visibleFieldIds.filter(id => !pendingFieldIds.includes(id));

        // Add all missing fields to pendingChanges
        missingFieldIds.forEach(fieldId => {
            const field = form.fields.find(f => f.id === fieldId);
            if (field) {
                queueChange(fieldId, field.label, formData[fieldId] || '', field.category);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col md:flex-row md:space-x-6">
                {/* Main form content */}
                <div className={currentStep !== 0 ? "md:w-2/3 space-y-6" : "w-full space-y-6"}>
                    {form.fields.map(renderField)}
                </div>

                {/* Document panel as a separate div aligned with the form */}
                {form.documents && form.documents.length > 0 && currentStep !== 0 && (
                    <div className="md:w-1/3 md:pt-0 pt-6">
                        <div className="md:sticky md:top-4">
                            <DocumentPreviewPanel
                                documents={form.documents}
                                requiredDocuments={requiredDocuments}
                            />
                        </div>
                    </div>
                )}
            </div>

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
