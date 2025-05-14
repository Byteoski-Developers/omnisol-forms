import React, { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BooleanChoices, RefusalReasonChoices } from "./constants";
import { COUNTRIES } from "@/lib/countries/constants/countries";

interface IRefusalInputProps {
  handleChange: (val: any, save?: boolean) => void;
  inputValue: string | any;
  readonly?: boolean;
}

interface IRefusal {
  country: string;
  visaType: string;
  date: string;
  hasRefusalLetter: string;
}

const emptyRefusal: IRefusal = {
  country: "",
  visaType: "",
  date: "",
  hasRefusalLetter: "",
};

// Simple RadioChoices component
const RadioChoices = ({ 
  id, 
  options, 
  selectedOption, 
  onChange, 
  disabled 
}: { 
  id: string; 
  options: any[]; 
  selectedOption?: any; 
  onChange: (value: string) => void; 
  disabled?: boolean 
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {options.map((option) => (
        <label 
          key={option.value} 
          className="flex items-center space-x-2 cursor-pointer"
        >
          <input
            type="radio"
            name={id}
            value={option.value}
            checked={selectedOption?.value === option.value}
            onChange={() => onChange(option.value)}
            disabled={disabled}
            className="h-4 w-4"
          />
          <span className="text-sm">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

const RefusalInput = (props: IRefusalInputProps) => {
  const { inputValue, handleChange, readonly = false } = props;
  const [refusals, setRefusals] = useState<IRefusal[]>([]);
  
  // Initialize with at least one empty refusal
  useEffect(() => {
    if (inputValue) {
      try {
        const parsedValue = typeof inputValue === 'string' 
          ? JSON.parse(inputValue) 
          : inputValue;
        
        if (Array.isArray(parsedValue?.value)) {
          if (parsedValue.value.length === 0) {
            setRefusals([{...emptyRefusal}]);
          } else {
            setRefusals(parsedValue.value);
          }
        } else if (parsedValue && typeof parsedValue === 'object') {
          // Handle case where value is directly in inputValue
          if (Array.isArray(parsedValue)) {
            if (parsedValue.length === 0) {
              setRefusals([{...emptyRefusal}]);
            } else {
              setRefusals(parsedValue);
            }
          } else {
            setRefusals([{...emptyRefusal}]);
          }
        } else {
          setRefusals([{...emptyRefusal}]);
        }
      } catch (e) {
        console.error("Failed to parse inputValue", e);
        setRefusals([{...emptyRefusal}]);
      }
    } else {
      setRefusals([{...emptyRefusal}]);
    }
  }, [inputValue]);

  const handleAddRefusal = () => {
    console.log("Adding new refusal");
    const newRefusals = [...refusals, {...emptyRefusal}];
    setRefusals(newRefusals);
    handleChange({ value: newRefusals }, true);
  };
  
  const handleRemoveRefusal = (index: number) => {
    const newRefusals = refusals.filter((_, i) => i !== index);
    if (newRefusals.length === 0) {
      // Always keep at least one refusal
      newRefusals.push({...emptyRefusal});
    }
    setRefusals(newRefusals);
    handleChange({ value: newRefusals }, true);
  };
  
  const handleFieldChange = (
    index: number,
    field: keyof IRefusal,
    value: string,
  ) => {
    const newRefusals = [...refusals];
    newRefusals[index] = {
      ...newRefusals[index],
      [field]: value
    };
    setRefusals(newRefusals);
    handleChange({ value: newRefusals });
  };
  
  return (
    <div className="relative">
      <div className="flex flex-col gap-4">
        {refusals.map((refusal, index) => (
          <div
            key={index}
            className="gap-4 flex flex-col p-4 border border-gray-200 rounded-md"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Refusal #{index + 1}</h3>
              {refusals.length > 1 && !readonly && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleRemoveRefusal(index)}
                  className="text-red-500"
                  type="button"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div>
              <p className="text-sm text-gray-800 mb-2">
                Which country refused your visa?
              </p>
              <Select
                disabled={readonly}
                value={refusal.country}
                onValueChange={(value) => handleFieldChange(index, "country", value)}
              >
                <SelectTrigger id={`refusal-country-${index}`}>
                  <SelectValue placeholder="Select a country" />
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
            
            <div>
              <p className="text-sm text-gray-800 mb-2">
                What type of visa did you apply for?
              </p>
              <RadioChoices
                id={`visa-type-${index}`}
                options={RefusalReasonChoices}
                selectedOption={RefusalReasonChoices.find(
                  (c) => c.value === refusal.visaType
                )}
                onChange={(val) => handleFieldChange(index, "visaType", val)}
                disabled={readonly}
              />
            </div>
            
            <div>
              <p className="text-sm text-gray-800 mb-2">
                When did this problem occur?
              </p>
              <Input
                id={`refusal-date-${index}`}
                name={`refusal-date-${index}`}
                type="date"
                value={refusal.date}
                onChange={(e) =>
                  handleFieldChange(index, "date", e.target.value)
                }
                max={new Date().toISOString().split("T")[0]}
                disabled={readonly}
                className="w-full"
              />
            </div>
            
            <div>
              <p className="text-sm text-gray-800 mb-2">
                Do you have any letter of refusal?
              </p>
              <RadioChoices
                id={`has-refusal-letter-${index}`}
                options={BooleanChoices}
                selectedOption={BooleanChoices.find(
                  (c) => c.value === refusal.hasRefusalLetter
                )}
                onChange={(val) =>
                  handleFieldChange(index, "hasRefusalLetter", val)
                }
                disabled={readonly}
              />
            </div>
          </div>
        ))}
      </div>
      
      {!readonly && (
        <div className="mt-4">
          <Button
            variant="outline"
            type="button"
            onClick={handleAddRefusal}
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add another refusal
          </Button>
        </div>
      )}
    </div>
  );
};

export default RefusalInput;
