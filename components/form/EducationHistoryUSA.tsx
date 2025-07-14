import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DateField from "./datefield";

interface IEducationUSA {
  id: number;
  institutionName: string;
  duration: string;
  yearOfCompletion: string;
  address: string;
  degreeOrCertification: string;
  fieldOfStudy: string;
  isCurrent: boolean;
}

interface IEducationHistoryUSAProps {
  onChange: (val: any, save?: boolean) => void;
  value: string | any;
  readonly?: boolean;
}

const emptyEducation: IEducationUSA = {
  id: 1,
  institutionName: "",
  duration: "",
  yearOfCompletion: "",
  address: "",
  degreeOrCertification: "",
  fieldOfStudy: "",
  isCurrent: false
};

export default function EducationHistoryUSA(props: IEducationHistoryUSAProps) {
  const { value, onChange, readonly } = props;
  const [educationList, setEducationList] = useState<IEducationUSA[]>([]);
  
  // Initialize with one empty education entry
  useEffect(() => {
    if (value) {
      try {
        const parsedValue = typeof value === 'string' ? JSON.parse(value) : value;
        if (Array.isArray(parsedValue) && parsedValue.length > 0) {
          setEducationList(parsedValue);
        } else {
          setEducationList([{ ...emptyEducation }]);
        }
      } catch (e) {
        console.error("Error parsing education history:", e);
        setEducationList([{ ...emptyEducation }]);
      }
    } else {
      setEducationList([{ ...emptyEducation }]);
    }
  }, [value]);

  // Update parent when education list changes
  useEffect(() => {
    if (educationList.length > 0) {
      onChange(educationList);
    }
  }, [educationList, onChange]);

  const handleEducationChange = (id: number, field: keyof IEducationUSA, value: any) => {
    setEducationList(prev => 
      prev.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const addEducation = () => {
    const newId = educationList.length > 0 
      ? Math.max(...educationList.map(edu => edu.id)) + 1 
      : 1;
      
    setEducationList(prev => [...prev, { ...emptyEducation, id: newId }]);
  };

  const removeEducation = (id: number) => {
    if (educationList.length > 1) {
      setEducationList(prev => prev.filter(edu => edu.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {educationList.map((education, index) => (
        <div key={education.id} className="border rounded-lg p-4 space-y-4 relative">
          {educationList.length > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={() => removeEducation(education.id)}
              disabled={readonly}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
          
          <h4 className="text-sm font-medium">
            {education.institutionName || `Education ${index + 1}`}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Name of School/University</label>
              <Input
                value={education.institutionName}
                onChange={(e) => handleEducationChange(education.id, 'institutionName', e.target.value)}
                placeholder="School/University name"
                readOnly={readonly}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Duration (e.g., 4 years)</label>
              <Input
                value={education.duration}
                onChange={(e) => handleEducationChange(education.id, 'duration', e.target.value)}
                placeholder="e.g., 4 years"
                readOnly={readonly}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Year of Completion</label>
              <Input
                type="text"
                value={education.yearOfCompletion}
                onChange={(e) => handleEducationChange(education.id, 'yearOfCompletion', e.target.value)}
                placeholder="e.g., 2020"
                readOnly={readonly}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Degree/Certification</label>
              <Input
                value={education.degreeOrCertification}
                onChange={(e) => handleEducationChange(education.id, 'degreeOrCertification', e.target.value)}
                placeholder="e.g., Bachelor of Science"
                readOnly={readonly}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Field of Study</label>
              <Input
                value={education.fieldOfStudy}
                onChange={(e) => handleEducationChange(education.id, 'fieldOfStudy', e.target.value)}
                placeholder="e.g., Computer Science"
                readOnly={readonly}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="text-sm font-medium">School/University Address</label>
              <Input
                value={education.address}
                onChange={(e) => handleEducationChange(education.id, 'address', e.target.value)}
                placeholder="Full address"
                readOnly={readonly}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`current-${education.id}`}
                checked={education.isCurrent}
                onChange={(e) => handleEducationChange(education.id, 'isCurrent', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                disabled={readonly}
              />
              <label htmlFor={`current-${education.id}`} className="text-sm text-gray-600">
                Currently attending
              </label>
            </div>
          </div>
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addEducation}
        disabled={readonly}
        className="mt-2"
      >
        <Plus className="h-4 w-4 mr-2" /> Add Education
      </Button>
    </div>
  );
}
