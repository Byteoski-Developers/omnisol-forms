"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DynamicForm } from "./DynamicForm";
import { VisaForm } from "@/types/form";
import { ChevronLeft } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProgressBar from "@ramonak/react-progress-bar";
import DocumentPreviewPanel from "./DocumentPreviewPanel";

interface StepFormProps {
  form: VisaForm;
  onSubmit: (data: Record<string, any>) => void;
  initialData?: Record<string, any>;
}

export function StepForm({ form, onSubmit, initialData = {} }: StepFormProps) {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [requiredDocuments, setRequiredDocuments] = useState<Set<string>>(
    new Set()
  );

  const appEnv = process.env.NEXT_PUBLIC_APP_ENV;

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
          if (condition.questionId === "languageTest") {
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

  // Function to evaluate conditions (similar to DynamicForm's evaluateCondition)
  const evaluateCondition = (condition: any): boolean => {
    // Handle complex condition with operator
    if ("operator" in condition) {
      const { operator, conditions } = condition;

      // Map and evaluate each condition recursively
      const results = conditions.map((subCondition: any) =>
        evaluateCondition(subCondition)
      );

      // Apply the appropriate logical operator
      if (operator === "and") {
        return results.every(Boolean);
      } else if (operator === "or") {
        return results.some(Boolean);
      }
      return false;
    }

    // Handle simple condition
    const { field, value, not } = condition;

    // Check if the field exists in formData
    if (!(field in formData)) {
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
  };

  // Filter visible steps based on showIf conditions
  const visibleSteps = form.steps.filter((step) => {
    if (!step.showIf) return true; // If no showIf condition, always show
    return evaluateCondition(step.showIf);
  });

  const progressPercentage =
    visibleSteps.length > 0
      ? Math.round((completedSteps.length / visibleSteps.length) * 100)
      : 0;

  // Open step by slug if present in URL
  useEffect(() => {
    const stepSlug = searchParams?.get("slug");
    if (stepSlug && visibleSteps.length > 0) {
      const foundIndex = visibleSteps.findIndex(
        (step) => step.slug === stepSlug
      );
      if (foundIndex !== -1) {
        setCurrentStep(foundIndex);
      }
    }
    // Only run on mount or when visibleSteps/searchParams changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleSteps, searchParams]);

  const handleStepSubmit = (stepData: Record<string, any>) => {
    const newFormData = { ...formData, ...stepData };
    setFormData(newFormData);

    // Mark current step as completed
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }

    if (currentStep === visibleSteps.length - 1) {
      onSubmit(newFormData);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleStepClick = (stepIndex: number) => {
    // Allow navigation to any step
    setCurrentStep(stepIndex);
  };

  // If no visible steps, render nothing or a message
  if (visibleSteps.length === 0) {
    return <div>No applicable form steps available.</div>;
  }

  const currentStepData = visibleSteps[currentStep];
  const stepFields = currentStepData.showDocuments
    ? []
    : form.fields.filter((f) => f.group === currentStepData.group);

  return (
    <div className="space-y-10">
      <div className="max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
        </div>
        <div className="flex py-2 px-4 justify-between">
          <div className="text-sm font-medium text-black">
            Step {currentStep + 1} of {visibleSteps.length}
          </div>
          <div className="text-sm text-gray-500">
            <span>{progressPercentage}% completed</span>
          </div>
        </div>
        <ProgressBar
          height="15px"
          bgColor="black"
          isLabelVisible={false}
          completed={progressPercentage}
        />
      </div>
      <div className="flex gap-6">
        {/* Sidebar Step Navigation */}
        <TooltipProvider>
          <div className="overflow-y-auto max-h-[500px] pr-2 border-r border-gray-200">
            <div className="flex flex-col space-y-2">
              {visibleSteps.map((step, index) => {
                const isCompleted = completedSteps.includes(index);
                const isActive = index === currentStep;
                const isClickable =
                  isCompleted ||
                  index === 0 ||
                  index <= Math.max(...completedSteps, 0) + 1;

                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => handleStepClick(index)}
                    disabled={!isClickable}
                    className={`
                flex items-center w-full text-left px-3 py-2 rounded-lg border transition
                ${isActive ? "bg-primary text-white border-primary" : ""}
                ${
                  isCompleted && !isActive
                    ? "bg-primary/10 text-primary border-primary/20"
                    : ""
                }
                ${
                  !isCompleted && !isActive
                    ? "bg-gray-100 text-gray-700 border-gray-200"
                    : ""
                }
                hover:bg-primary/10 hover:border-primary/30
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
                  >
                    <span
                      className={`
                  flex-shrink-0 w-6 h-6 mr-3 flex items-center justify-center rounded-full border
                  ${isActive ? "bg-white text-primary border-white" : ""}
                  ${
                    isCompleted && !isActive
                      ? "bg-primary text-white border-primary"
                      : ""
                  }
                  ${
                    !isCompleted && !isActive
                      ? "bg-white text-gray-500 border-gray-300"
                      : ""
                  }
                `}
                    >
                      {isCompleted ? "✓" : index + 1}
                    </span>
                    <span className="truncate text-sm font-medium">
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </TooltipProvider>

        {/* Main Form Card */}
        <Card className="flex-1 p-6">
          <DynamicForm
            form={{
              ...form,
              fields: stepFields,
              showDocuments: currentStepData.showDocuments,
            }}
            onSubmit={handleStepSubmit}
            initialData={formData}
            currentStep={currentStep}
            totalSteps={visibleSteps.length}
          />
        </Card>
        {/* Document panel as a separate div aligned with the form */}
        {appEnv === "testing" &&
          form.documents &&
          form.documents.length > 0 &&
          currentStep !== 0 && (
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

      <div className="flex justify-between mt-6">
        {currentStep > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
        <div className="flex-1" />
      </div>
    </div>
  );
}
