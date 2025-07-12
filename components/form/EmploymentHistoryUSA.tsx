import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DateField from "./datefield";

interface IEmploymentUSA {
  id: number;
  companyName: string;
  startDate: string;
  endDate: string;
  designation: string;
  duties: string;
  monthlySalary: string;
  supervisorName?: string;
  supervisorDesignation?: string;
  companyAddress?: string;
  companyPhone?: string;
  isCurrent: boolean;
}

interface IEmploymentHistoryUSAProps {
  onChange: (val: any, save?: boolean) => void;
  value: string | any;
  readonly?: boolean;
}

const emptyEmployment: IEmploymentUSA = {
  id: 1,
  companyName: "",
  startDate: "",
  endDate: "",
  designation: "",
  duties: "",
  monthlySalary: "",
  supervisorName: "",
  supervisorDesignation: "",
  companyAddress: "",
  companyPhone: "",
  isCurrent: true
};

export default function EmploymentHistoryUSA(props: IEmploymentHistoryUSAProps) {
  const { value, onChange, readonly } = props;
  const [currentEmployment, setCurrentEmployment] = useState<IEmploymentUSA>({ ...emptyEmployment, isCurrent: true });
  const [pastEmployments, setPastEmployments] = useState<IEmploymentUSA[]>([]);
  
  useEffect(() => {
    if (value) {
      try {
        const data = JSON.parse(value);
        if (data.current) setCurrentEmployment(data.current);
        if (data.past) setPastEmployments(data.past);
      } catch (e) {
        console.error("Error parsing employment data", e);
      }
    }
  }, [value]);

  const handleCurrentEmploymentChange = (field: keyof IEmploymentUSA, value: any) => {
    const updated = { ...currentEmployment, [field]: value };
    setCurrentEmployment(updated);
    saveData(updated, pastEmployments);
  };

  const addPastEmployment = () => {
    const newEmployment = { ...emptyEmployment, id: Date.now(), isCurrent: false };
    const updated = [...pastEmployments, newEmployment];
    setPastEmployments(updated);
    saveData(currentEmployment, updated);
  };

  const removePastEmployment = (id: number) => {
    const updated = pastEmployments.filter(emp => emp.id !== id);
    setPastEmployments(updated);
    saveData(currentEmployment, updated);
  };

  const handlePastEmploymentChange = (id: number, field: keyof IEmploymentUSA, value: any) => {
    const updated = pastEmployments.map(emp => 
      emp.id === id ? { ...emp, [field]: value } : emp
    );
    setPastEmployments(updated);
    saveData(currentEmployment, updated);
  };

  const saveData = (current: IEmploymentUSA, past: IEmploymentUSA[]) => {
    onChange(JSON.stringify({ current, past }), true);
  };

  return (
    <div className="space-y-6">
      {/* Current Employment */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="font-medium">A. Current Employment Details (Mandatory)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Name of company</label>
            <Input
              value={currentEmployment.companyName}
              onChange={(e) => handleCurrentEmploymentChange('companyName', e.target.value)}
              placeholder="Company name"
              readOnly={readonly}
            />
          </div>
          
          <div>
            
            <DateField
              field={{
                id: 'currentEmploymentStartDate',
                label: 'Start Date',
                required: true
              }}
              formData={{ currentEmploymentStartDate: currentEmployment.startDate }}
              handleFieldChange={(id, value) => handleCurrentEmploymentChange('startDate', value)}
              disableFutureDates={false}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Designation (Job title)</label>
            <Input
              value={currentEmployment.designation}
              onChange={(e) => handleCurrentEmploymentChange('designation', e.target.value)}
              placeholder="Your job title"
              readOnly={readonly}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Monthly salary</label>
            <Input
              type="number"
              value={currentEmployment.monthlySalary}
              onChange={(e) => handleCurrentEmploymentChange('monthlySalary', e.target.value)}
              placeholder="Monthly salary"
              readOnly={readonly}
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium">Description of duties/responsibilities</label>
          <textarea
            className="w-full border rounded-md p-2 min-h-[80px]"
            value={currentEmployment.duties}
            onChange={(e) => handleCurrentEmploymentChange('duties', e.target.value)}
            placeholder="Describe your duties and responsibilities"
            readOnly={readonly}
          />
        </div>
        
      </div>

      {/* Past Employment */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">B. Employment History (Last 5 Years)</h3>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={addPastEmployment}
            disabled={readonly}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Employment
          </Button>
        </div>

        {pastEmployments.map((emp, index) => (
          <div key={emp.id} className="border rounded-lg p-4 space-y-4 relative">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={() => removePastEmployment(emp.id)}
              disabled={readonly}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
            
            <h4 className="font-medium">Employment #{index + 1}</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Name of office/company/business</label>
                <Input
                  value={emp.companyName}
                  onChange={(e) => handlePastEmploymentChange(emp.id, 'companyName', e.target.value)}
                  placeholder="Company name"
                  readOnly={readonly}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Company/Office/Business address</label>
                <Input
                  value={emp.companyAddress}
                  onChange={(e) => handlePastEmploymentChange(emp.id, 'companyAddress', e.target.value)}
                  placeholder="Full address"
                  readOnly={readonly}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Name of immediate head/supervisor</label>
                <Input
                  value={emp.supervisorName}
                  onChange={(e) => handlePastEmploymentChange(emp.id, 'supervisorName', e.target.value)}
                  placeholder="Supervisor's name"
                  readOnly={readonly}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Designation of immediate head/supervisor</label>
                <Input
                  value={emp.supervisorDesignation}
                  onChange={(e) => handlePastEmploymentChange(emp.id, 'supervisorDesignation', e.target.value)}
                  placeholder="Supervisor's designation"
                  readOnly={readonly}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Your designation</label>
                <Input
                  value={emp.designation}
                  onChange={(e) => handlePastEmploymentChange(emp.id, 'designation', e.target.value)}
                  placeholder="Your job title"
                  readOnly={readonly}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Contact phone number</label>
                <Input
                  value={emp.companyPhone}
                  onChange={(e) => handlePastEmploymentChange(emp.id, 'companyPhone', e.target.value)}
                  placeholder="Company phone number"
                  readOnly={readonly}
                />
              </div>
              
              <div>
                <DateField
                  field={{
                    id: `pastEmploymentStartDate-${emp.id}`,
                    label: 'Start Date',
                    required: true
                  }}
                  formData={{ [`pastEmploymentStartDate-${emp.id}`]: emp.startDate }}
                  handleFieldChange={(id, value) => handlePastEmploymentChange(emp.id, 'startDate', value)}
                  disableFutureDates={false}
                />
              </div>
              
              <div>
                <DateField
                  field={{
                    id: `pastEmploymentEndDate-${emp.id}`,
                    label: 'End Date',
                    required: true
                  }}
                  formData={{ [`pastEmploymentEndDate-${emp.id}`]: emp.endDate }}
                  handleFieldChange={(id, value) => handlePastEmploymentChange(emp.id, 'endDate', value)}
                  disableFutureDates={false}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Description of duties/responsibilities</label>
              <textarea
                className="w-full border rounded-md p-2 min-h-[80px]"
                value={emp.duties}
                onChange={(e) => handlePastEmploymentChange(emp.id, 'duties', e.target.value)}
                placeholder="Describe your duties and responsibilities"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
