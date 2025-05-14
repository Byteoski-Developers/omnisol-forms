import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import Textarea from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ROLES } from "./constants";

interface IExperience {
  startDate: string;
  endDate: string;
  role: string;
  details: string;
}

interface ILast10YearActivityProps {
  handleChange: (val: any, save?: boolean) => void;
  inputValue: string | any;
  readonly?: boolean;
}

const emptyExperience: IExperience = {
  startDate: "",
  endDate: "",
  role: "",
  details: "",
};

export default function Last10YearActivity(props: ILast10YearActivityProps) {
  const { inputValue, handleChange, readonly } = props;
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [isOpen, setIsOpen] = useState<boolean[]>(
    new Array(experiences?.length).fill(false),
  );

  useEffect(() => {
    if (inputValue) {
      try {
        const parsedInputValue: any = inputValue;
        if (Array.isArray(parsedInputValue)) {
          if (parsedInputValue.length === 0) {
            setExperiences([emptyExperience]);
          } else {
            setExperiences(parsedInputValue);
            setIsOpen(new Array(parsedInputValue.length).fill(false));
          }
        } else {
          setExperiences([emptyExperience]);
        }
      } catch (e) {
        setExperiences([emptyExperience]);
        console.error("Failed to parse inputValue", e);
      }
    } else {
      setExperiences([emptyExperience]);
    }
  }, [inputValue]);

  const handleFieldChange = (
    index: number,
    field: keyof IExperience,
    value: string,
  ) => {
    const newExperiences = [...experiences];
    newExperiences[index][field] = value;
    setExperiences(newExperiences);
    handleChange({ value: newExperiences });
  };

  const addDropdown = () => {
    const newExperiences = [...experiences, emptyExperience];
    setExperiences(newExperiences);
    setIsOpen([...isOpen, false]);
    handleChange({ value: newExperiences }, true);
  };

  const removeDropdown = (index: number) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
    setIsOpen(isOpen.filter((_, i) => i !== index));
    handleChange({ value: newExperiences }, true);
  };

  return (
    <div className="grid gap-4 pt-4">
      {experiences.map((exp, index) => (
        <div className="rounded-lg border relative" key={index}>
          <header className="py-2 px-4 bg-muted flex justify-between items-center">
            <h4 className="font-semibold text-sm">
              {`Experience #${index + 1}`}
            </h4>
            <div>
              {experiences.length > 1 && !readonly && (
                <Button
                  onClick={() => removeDropdown(index)}
                  variant="destructive"
                  size="icon"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </header>

          <div className="grid grid-cols-2 gap-y-3 gap-x-2 py-2 px-4">
            <div className="space-y-2">
              <label
                htmlFor={`startDate-${index}`}
                className="text-sm text-slate-700"
              >
                Start Date
              </label>
              <Input
                id={`startDate-${index}`}
                type="date"
                onChange={(e) =>
                  handleFieldChange(index, "startDate", e.target.value)
                }
                value={exp.startDate}
                disabled={readonly}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`endDate-${index}`}
                className="text-sm text-slate-700"
              >
                End Date
              </label>
              <Input
                id={`endDate-${index}`}
                type="date"
                onChange={(e) =>
                  handleFieldChange(index, "endDate", e.target.value)
                }
                value={exp.endDate}
                disabled={readonly}
              />
            </div>

            <div className="col-span-full space-y-1">
              <label
                htmlFor={`role-${index}`}
                className="text-sm text-slate-700"
              >
                Role
              </label>
              <Select
                disabled={readonly}
                value={exp.role}
                onValueChange={(value) => handleFieldChange(index, "role", value)}
              >
                <SelectTrigger id={`role-${index}`}>
                  <SelectValue placeholder="Your Role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="col-span-full space-y-1">
              <label
                htmlFor={`details-${index}`}
                className="text-sm text-slate-700"
              >
                Details
              </label>
              <Textarea
                id={`details-${index}`}
                label="Details"
                onChange={(value: string) => handleFieldChange(index, "details", value)}
                placeholder="School / Company Name/ Course taken etc.."
                defaultValue={exp.details}
                disabled={readonly}
              />
            </div>
          </div>
        </div>
      ))}
      {!readonly && (
        <Button
          className="mx-auto mb-4"
          variant="outline"
          onClick={addDropdown}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add another experience
        </Button>
      )}
    </div>
  );
}
