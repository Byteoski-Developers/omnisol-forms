import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { COUNTRIES } from "@/lib/countries/constants/countries";
import Textarea from "@/components/ui/textarea";
import DateField from "./datefield";

interface IEmployment {
  id: number;
  companyName: string;
  position: string;
  country: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  jobDescription: string;
}

interface IEmploymentHistoryProps {
  onChange: (val: any, save?: boolean) => void;
  value: string | any;
  readonly?: boolean;
}

const emptyEmployment: IEmployment = {
  id: 1,
  companyName: "",
  position: "",
  country: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  jobDescription: ""
};

export default function EmploymentHistory(props: IEmploymentHistoryProps) {
  const { value, onChange, readonly } = props;
  const [employmentList, setEmploymentList] = useState<IEmployment[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    if (!isInitialized) {
      try {
        if (value) {
          const parsedData = typeof value === 'string' ? JSON.parse(value) : value;
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            setEmploymentList(parsedData);
          } else {
            setEmploymentList([{ ...emptyEmployment, id: 1 }]);
          }
        } else {
          setEmploymentList([{ ...emptyEmployment, id: 1 }]);
        }
        setIsInitialized(true);
      } catch (e) {
        console.error("Failed to parse initial value:", e);
        setEmploymentList([{ ...emptyEmployment, id: 1 }]);
        setIsInitialized(true);
      }
    }
  }, [value, isInitialized]);

  const handleFieldChange = (index: number, field: keyof IEmployment, value: any) => {
    const newEmploymentList = [...employmentList];
    
    // Special handling for currentlyWorking field
    if (field === 'currentlyWorking' && value === true) {
      newEmploymentList[index] = {
        ...newEmploymentList[index],
        [field]: value,
        endDate: "" // Clear end date when currently working is selected
      };
    } else {
      newEmploymentList[index] = {
        ...newEmploymentList[index],
        [field]: value
      };
    }
    
    setEmploymentList(newEmploymentList);
    onChange(JSON.stringify(newEmploymentList), true);
  };

  const addEmployment = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default form submission behavior
    e.preventDefault();
    e.stopPropagation();
    
    const newId = employmentList.length > 0 
      ? Math.max(...employmentList.map(emp => emp.id)) + 1 
      : 1;
    
    const newEmploymentList = [
      ...employmentList,
      { ...emptyEmployment, id: newId }
    ];
    
    setEmploymentList(newEmploymentList);
    onChange(JSON.stringify(newEmploymentList), true);
  };

  const removeEmployment = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default form submission behavior
    e.preventDefault();
    e.stopPropagation();
    
    const newEmploymentList = employmentList.filter(emp => emp.id !== id);
    
    if (newEmploymentList.length === 0) {
      const resetList = [{ ...emptyEmployment, id: 1 }];
      setEmploymentList(resetList);
      onChange(JSON.stringify(resetList), true);
    } else {
      setEmploymentList(newEmploymentList);
      onChange(JSON.stringify(newEmploymentList), true);
    }
  };

  return (
    <div className="dark:text-gray-100 bg-white relative">
      <div className="flex justify-between items-center border-b p-2">
        <h4 className="font-bold text-sm">Employment History</h4>
        {!readonly && (
          <div>
            <Button onClick={addEmployment} variant="outline" size="sm" type="button">
              <Plus className="w-4 h-4 mr-2" /> Add Employment
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4 p-2">
        {employmentList.map((emp, index) => (
          <div key={emp.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="font-medium">Employment #{index + 1}</h5>
              {!readonly && employmentList.length > 1 && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={(e) => removeEmployment(emp.id, e)}
                  type="button"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Remove
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <Input
                  value={emp.companyName}
                  onChange={(e) => handleFieldChange(index, 'companyName', e.target.value)}
                  disabled={readonly}
                  placeholder="Company name"
                  className="border-primary focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Position</label>
                <Input
                  value={emp.position}
                  onChange={(e) => handleFieldChange(index, 'position', e.target.value)}
                  disabled={readonly}
                  placeholder="Job title"
                  className="border-primary focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Select
                  value={emp.country}
                  onValueChange={(value) => handleFieldChange(index, 'country', value)}
                  disabled={readonly}
                >
                  <SelectTrigger className="border-primary focus:border-primary">
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
                <label className="text-sm font-medium">Currently Working</label>
                <Select
                  value={emp.currentlyWorking ? "yes" : "no"}
                  onValueChange={(value) => handleFieldChange(index, 'currentlyWorking', value === "yes")}
                  disabled={readonly}
                >
                  <SelectTrigger className="border-primary focus:border-primary">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <DateField
                  field={{
                    id: `emp-start-${emp.id}`,
                    label: "Start Date",
                    required: false
                  }}
                  formData={{ [`emp-start-${emp.id}`]: emp.startDate ? new Date(emp.startDate).toISOString() : "" }}
                  handleFieldChange={(_, value) => handleFieldChange(index, 'startDate', value)}
                  disableFutureDates={false}
                />
              </div>

              {!emp.currentlyWorking && (
                <div className="space-y-2">
                  <DateField
                    field={{
                      id: `emp-end-${emp.id}`,
                      label: "End Date",
                      required: false
                    }}
                    formData={{ [`emp-end-${emp.id}`]: emp.endDate ? new Date(emp.endDate).toISOString() : "" }}
                    handleFieldChange={(_, value) => handleFieldChange(index, 'endDate', value)}
                    disableFutureDates={true}
                  />
                </div>
              )}

              <div className="col-span-full space-y-2">
                <label className="text-sm font-medium">Job Description</label>
                <Textarea
                  id={`job-description-${index}`}
                  label=""
                  defaultValue={emp.jobDescription}
                  onChange={(value) => handleFieldChange(index, 'jobDescription', value)}
                  disabled={readonly}
                  placeholder="Describe your responsibilities and achievements"
                  className="border-primary focus:border-primary"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
