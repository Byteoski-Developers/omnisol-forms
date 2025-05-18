'use client';

import { useState } from 'react';
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
  const [currentStep, setCurrentStep] = useState(0);
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
        <div className="overflow-x-auto pb-2 mb-6 scrollbar-thin">
          <style jsx>{`
            /* Custom scrollbar styling */
            .scrollbar-thin::-webkit-scrollbar {
              height: 4px;
            }
            .scrollbar-thin::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 10px;
            }
            .scrollbar-thin::-webkit-scrollbar-thumb {
              background: #888;
              border-radius: 10px;
            }
            .scrollbar-thin::-webkit-scrollbar-thumb:hover {
              background: #555;
            }
            /* For Firefox */
            .scrollbar-thin {
              scrollbar-width: thin;
              scrollbar-color: #888 #f1f1f1;
            }
          `}</style>
          <div className="flex min-w-full">
            {form.steps.map((step, index) => {
              const isCompleted = completedSteps.includes(index);
              const isActive = index === currentStep;
              const isClickable = isCompleted || index === 0 || index <= Math.max(...completedSteps, 0) + 1;
              
              return (
                <div key={step.title} className="flex-shrink-0 px-1" style={{ minWidth: '80px' }}>
                  <button
                    type="button"
                    onClick={() => handleStepClick(index)}
                    className={`w-full py-1 px-1 text-center rounded text-xs transition-all duration-300 ${
                      isActive 
                        ? 'bg-primary text-white font-medium' 
                        : isCompleted 
                          ? 'bg-primary/80 text-white' 
                          : 'bg-gray-200 text-gray-600'
                    }`}
                    aria-label={`Go to step ${index + 1}: ${step.title}`}
                  >
                    <span className="block truncate">{step.title}</span>
                  </button>
                </div>
              );
            })}
          </div>
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