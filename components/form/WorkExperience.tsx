'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';

interface WorkExperience {
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  employerName: string;
  employerAddress: string;
  employerPhone: string;
  position: string;
  duty: string;
  supervisorName: string;
  supervisorPhone: string;
}

interface WorkExperienceProps {
  onChange: (value: WorkExperience[]) => void;
  value?: WorkExperience[];
  readonly?: boolean;
}

const emptyExperience: WorkExperience = {
  startDate: '',
  endDate: '',
  isCurrentJob: false,
  employerName: '',
  employerAddress: '',
  employerPhone: '',
  position: '',
  duty: '',
  supervisorName: '',
  supervisorPhone: ''
};

export function WorkExperience({ onChange, value = [], readonly }: WorkExperienceProps) {
  const [experiences, setExperiences] = useState<WorkExperience[]>([emptyExperience]);

  useEffect(() => {
    if (value.length > 0) {
      setExperiences(value);
    }
  }, [value]);

  const handleFieldChange = (index: number, field: keyof WorkExperience, value: string | boolean) => {
    const newExperiences = [...experiences];
    newExperiences[index] = {
      ...newExperiences[index],
      [field]: value
    };

    if (field === 'isCurrentJob' && value === true) {
      newExperiences[index].endDate = '';
    }

    setExperiences(newExperiences);
    onChange(newExperiences);
  };

  const addExperience = () => {
    const newExperiences = [...experiences, emptyExperience];
    setExperiences(newExperiences);
    onChange(newExperiences);
  };

  const removeExperience = (index: number) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
    onChange(newExperiences);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        {!readonly && experiences.length < 5 && (
          <Button onClick={addExperience} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        )}
      </div>

      {experiences.map((exp, index) => (
        <Card key={index} className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium">Experience #{index + 1}</h4>
            {!readonly && experiences.length > 1 && (
              <Button
                onClick={() => removeExperience(index)}
                variant="destructive"
                size="icon"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`startDate-${index}`}>Start Date</Label>
              <Input
                type="date"
                id={`startDate-${index}`}
                value={exp.startDate}
                onChange={(e) => handleFieldChange(index, 'startDate', e.target.value)}
                disabled={readonly}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`endDate-${index}`}>End Date</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`current-${index}`}
                    checked={exp.isCurrentJob}
                    onCheckedChange={(checked) => 
                      handleFieldChange(index, 'isCurrentJob', checked)
                    }
                    disabled={readonly}
                  />
                  <Label htmlFor={`current-${index}`} className="text-sm">
                    Current Job
                  </Label>
                </div>
              </div>
              <Input
                type="date"
                id={`endDate-${index}`}
                value={exp.endDate}
                onChange={(e) => handleFieldChange(index, 'endDate', e.target.value)}
                disabled={readonly || exp.isCurrentJob}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor={`employerName-${index}`}>Employer Name</Label>
              <Input
                id={`employerName-${index}`}
                value={exp.employerName}
                onChange={(e) => handleFieldChange(index, 'employerName', e.target.value)}
                disabled={readonly}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor={`employerAddress-${index}`}>Employer Address</Label>
              <Input
                id={`employerAddress-${index}`}
                value={exp.employerAddress}
                onChange={(e) => handleFieldChange(index, 'employerAddress', e.target.value)}
                disabled={readonly}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`employerPhone-${index}`}>Employer Phone</Label>
              <Input
                id={`employerPhone-${index}`}
                value={exp.employerPhone}
                onChange={(e) => handleFieldChange(index, 'employerPhone', e.target.value)}
                disabled={readonly}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`position-${index}`}>Position</Label>
              <Input
                id={`position-${index}`}
                value={exp.position}
                onChange={(e) => handleFieldChange(index, 'position', e.target.value)}
                disabled={readonly}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor={`duty-${index}`}>Duty/Responsibilities</Label>
              <Input
                id={`duty-${index}`}
                value={exp.duty}
                onChange={(e) => handleFieldChange(index, 'duty', e.target.value)}
                disabled={readonly}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`supervisorName-${index}`}>Supervisor's Name</Label>
              <Input
                id={`supervisorName-${index}`}
                value={exp.supervisorName}
                onChange={(e) => handleFieldChange(index, 'supervisorName', e.target.value)}
                disabled={readonly}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`supervisorPhone-${index}`}>Supervisor's Phone</Label>
              <Input
                id={`supervisorPhone-${index}`}
                value={exp.supervisorPhone}
                onChange={(e) => handleFieldChange(index, 'supervisorPhone', e.target.value)}
                disabled={readonly}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}