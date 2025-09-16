import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { COUNTRIES } from "@/lib/countries/constants/countries";
import { EDUCATION_QUALIFICATION_OPTIONS } from "@/lib/countries/constants/form-labels";
import DateField from "./datefield";

interface IEducation {
  id: number;
  instituteName: string;
  country: string;
  yearStart: string;
  yearEnd: string;
  qualification: string;
  degreeName: string;
  completed: boolean;
}

interface IEducationHistoryProps {
  onChange: (val: any, save?: boolean) => void;
  value: string | any;
  readonly?: boolean;
}

const emptyEducation: IEducation = {
  id: 1,
  instituteName: "",
  country: "",
  yearStart: "",
  yearEnd: "",
  qualification: "",
  degreeName: "",
  completed: true
};

export default function EducationHistory(props: IEducationHistoryProps) {
  const { value, onChange, readonly } = props;
  const [educationList, setEducationList] = useState<IEducation[]>([]);
  
  // Use a ref to track if we're in the middle of a local update
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    if (!isInitialized) {
      try {
        if (value) {
          const parsedData = typeof value === 'string' ? JSON.parse(value) : value;
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            setEducationList(parsedData);
          } else {
            setEducationList([{ ...emptyEducation, id: 1 }]);
          }
        } else {
          setEducationList([{ ...emptyEducation, id: 1 }]);
        }
        setIsInitialized(true);
      } catch (e) {
        console.error("Failed to parse initial value:", e);
        setEducationList([{ ...emptyEducation, id: 1 }]);
        setIsInitialized(true);
      }
    }
  }, [value, isInitialized]);

  const handleFieldChange = (index: number, field: keyof IEducation, value: any) => {
    const newEducationList = [...educationList];
    newEducationList[index] = {
      ...newEducationList[index],
      [field]: value
    };
    
    setEducationList(newEducationList);
    onChange(JSON.stringify(newEducationList), true);
  };

  const addEducation = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default form submission behavior
    e.preventDefault();
    e.stopPropagation();
    
    const newId = educationList.length > 0 
      ? Math.max(...educationList.map(edu => edu.id)) + 1 
      : 1;
    
    const newEducationList = [
      ...educationList,
      { ...emptyEducation, id: newId }
    ];
    
    setEducationList(newEducationList);
    onChange(JSON.stringify(newEducationList), true);
  };

  const removeEducation = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default form submission behavior
    e.preventDefault();
    e.stopPropagation();
    
    const newEducationList = educationList.filter(edu => edu.id !== id);
    
    if (newEducationList.length === 0) {
      const resetList = [{ ...emptyEducation, id: 1 }];
      setEducationList(resetList);
      onChange(JSON.stringify(resetList), true);
    } else {
      setEducationList(newEducationList);
      onChange(JSON.stringify(newEducationList), true);
    }
  };

  return (
    <div className="dark:text-gray-100 bg-white relative">
      <div className="flex justify-between items-center border-b p-2">
        <h4 className="font-bold text-sm">Post-secondary Education History</h4>
        {!readonly && (
          <div>
            <Button onClick={addEducation} variant="outline" size="sm" type="button">
              <Plus className="w-4 h-4 mr-2" /> Add Education
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4 p-2">
        {educationList.map((edu, index) => (
          <div key={edu.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="font-medium">Education #{index + 1}</h5>
              {!readonly && educationList.length > 1 && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={(e) => removeEducation(edu.id, e)}
                  type="button"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Remove
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Institute Name</label>
                <Input
                  value={edu.instituteName}
                  onChange={(e) => handleFieldChange(index, 'instituteName', e.target.value)}
                  disabled={readonly}
                  placeholder="University/College name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Select
                  value={edu.country}
                  onValueChange={(value) => handleFieldChange(index, 'country', value)}
                  disabled={readonly}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <DateField
                  field={{
                    id: `edu-start-${edu.id}`,
                    label: "Start Date",
                    required: false
                  }}
                  formData={{ [`edu-start-${edu.id}`]: edu.yearStart ? new Date(edu.yearStart).toISOString() : "" }}
                  handleFieldChange={(_, value) => handleFieldChange(index, 'yearStart', value)}
                  disableFutureDates={false}
                />
              </div>

              <div className="space-y-2">
                <DateField
                  field={{
                    id: `edu-end-${edu.id}`,
                    label: "End Date",
                    required: false
                  }}
                  formData={{ [`edu-end-${edu.id}`]: edu.yearEnd ? new Date(edu.yearEnd).toISOString() : "" }}
                  handleFieldChange={(_, value) => handleFieldChange(index, 'yearEnd', value)}
                  disableFutureDates={false}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Is your have completed your Higher Education</label>
                <Select
                  value={edu.completed ? "yes" : "no"}
                  onValueChange={(value) => handleFieldChange(index, 'completed', value === "yes")}
                  disabled={readonly}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
  
              {edu.completed && (
              <div className="space-y-6">
                
                <label className="text-sm font-medium">Qualification</label>
                <Select
                  value={edu.qualification}
                  onValueChange={(value) => handleFieldChange(index, 'qualification', value)}
                  disabled={readonly}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    {EDUCATION_QUALIFICATION_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                  <div>
                    {/* Add any content you want to show when completed is "yes" */}
                  </div>
                
                </div>
                )}

              {edu.qualification && edu.qualification !== '' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Course/Degree Name</label>
                  <Input
                    value={edu.degreeName || ''}
                    onChange={(e) => handleFieldChange(index, 'degreeName', e.target.value)}
                    disabled={readonly}
                    placeholder="Enter your course/degree name"
                  />
                </div>
              )}

              {/* <div className="space-y-2">
                <label className="text-sm font-medium">Completed</label>
                <Select
                  value={edu.completed ? "yes" : "no"}
                  onValueChange={(value) => handleFieldChange(index, 'completed', value === "yes")}
                  disabled={readonly}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
