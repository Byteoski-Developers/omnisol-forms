'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DynamicForm } from './DynamicForm';
import { VisaForm } from '@/types/form';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StepFormProps {
  form: VisaForm;
  onSubmit: (data: Record<string, any>) => void;
  initialData?: Record<string, any>;
}

export function StepForm({ form, onSubmit, initialData = {} }: StepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialData);

  const handleStepSubmit = (stepData: Record<string, any>) => {
    const newFormData = { ...formData, ...stepData };
    setFormData(newFormData);
    
    if (currentStep === form.steps.length - 1) {
      onSubmit(newFormData);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
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

      <div className="flex space-x-4 mb-8">
        {form.steps.map((step, index) => (
          <div
            key={step.title}
            className={`flex-1 h-2 rounded-full ${
              index <= currentStep ? 'bg-primary' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

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