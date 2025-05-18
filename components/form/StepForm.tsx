'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DynamicForm } from './DynamicForm';
import { VisaForm } from '@/types/form';
import { ChevronLeft } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StepFormProps {
  form: VisaForm;
  onSubmit: (data: Record<string, any>) => void;
  initialData?: Record<string, any>;
}

export function StepForm({ form, onSubmit, initialData = {} }: StepFormProps) {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);

  // Open step by slug if present in URL
  useEffect(() => {
    const stepSlug = searchParams?.get('slug');
    if (stepSlug && form.steps) {
      const foundIndex = form.steps.findIndex(step => step.slug === stepSlug);
      if (foundIndex !== -1) {
        setCurrentStep(foundIndex);
      }
    }
    // Only run on mount or when form.steps/searchParams changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.steps, searchParams]);
  const [formData, setFormData] = useState(initialData);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStepSubmit = (stepData: Record<string, any>) => {
    const newFormData = { ...formData, ...stepData };
    setFormData(newFormData);
    
    // Mark current step as completed
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
    }
    
    if (currentStep === form.steps.length - 1) {
      onSubmit(newFormData);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleStepClick = (stepIndex: number) => {
    // Allow navigation to any step
    setCurrentStep(stepIndex);
  };

  const currentStepData = form.steps[currentStep];
  const stepFields = currentStepData.showDocuments 
    ? [] 
    : form.fields.filter(f => f.group === currentStepData.group);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
        <div className="text-sm text-gray-500">
          Step {currentStep + 1} of {form.steps.length}
        </div>
      </div>

      <TooltipProvider>
        <div className="flex space-x-4 mb-8">
          {form.steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isActive = index === currentStep;
            const isClickable = isCompleted || index === 0 || index <= Math.max(...completedSteps, 0) + 1;
            
            return (
              <Tooltip key={step.title}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={() => handleStepClick(index)}
                    className="flex-1 relative cursor-pointer hover:opacity-80"
                    aria-label={`Go to step ${index + 1}: ${step.title}`}
                  >
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${isActive ? 'bg-primary' : isCompleted ? 'bg-primary/80' : 'bg-gray-200'}`}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{step.title}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>

      <Card className="p-6">
        <DynamicForm
          form={{
            ...form,
            fields: stepFields,
            showDocuments: currentStepData.showDocuments
          }}
          onSubmit={handleStepSubmit}
          initialData={formData}
          currentStep={currentStep}
          totalSteps={form.steps.length}
        />
      </Card>

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