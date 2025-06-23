import React, { useState, useEffect } from "react";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface DateFieldProps {
  field: {
    id: string;
    label: string;
    required?: boolean;
    description?: string;
  };
  formData: Record<string, any>;
  handleFieldChange: (id: string, value: string) => void;
  error?: string;
  disableFutureDates?: boolean;
}

const DateField: React.FC<DateFieldProps> = ({ field, formData, handleFieldChange, error, disableFutureDates = false }) => {
  const savedDate = formData[field.id] ? new Date(formData[field.id]) : null;
  const [open, setOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(savedDate || new Date());
  const [futureDateError, setFutureDateError] = useState<string>("");

  useEffect(() => {
    // When external value changes, sync tempDate
    if (formData[field.id]) {
      setTempDate(new Date(formData[field.id]));
    }
  }, [formData[field.id]]);

  // Clear future date error when disableFutureDates changes or field value changes
  useEffect(() => {
    setFutureDateError("");
  }, [disableFutureDates, formData[field.id]]);

  const handleYearChange = (year: string) => {
    const updated = new Date(tempDate);
    updated.setFullYear(parseInt(year));
    setTempDate(updated);
  };

  const handleMonthChange = (month: string) => {
    const updated = new Date(tempDate);
    updated.setMonth(parseInt(month));
    setTempDate(updated);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      // Check if future date is selected when disableFutureDates is true
      if (disableFutureDates && date > new Date()) {
        setFutureDateError("Future dates are not allowed for this field");
        return;
      }
      
      // Clear any previous future date error
      setFutureDateError("");
      handleFieldChange(field.id, date.toISOString());
      setOpen(false);
    }
  };

  // Determine which error to show - external error takes precedence
  const displayError = error || futureDateError;

  return (
    <div key={field.id} className="mb-4">
      <Label htmlFor={field.id}>
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={field.id}
            variant="outline"
            className={!formData[field.id] ? "text-muted-foreground w-full" : "w-full"}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formData[field.id]
              ? format(new Date(formData[field.id]), "PPP")
              : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0 z-50">
          <div className="p-3 border-b">
            <div className="flex justify-between gap-2 mb-2">
              <Select
                value={tempDate.getFullYear().toString()}
                onValueChange={handleYearChange}
              >
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] overflow-auto z-50">
                  {Array.from({ length: 2200 - 1900 + 1 }, (_, i) => {
                    const year = 1900 + i;
                    return (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <Select
                value={tempDate.getMonth().toString()}
                onValueChange={handleMonthChange}
              >
                <SelectTrigger className="w-[110px]">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent className="z-50">
                  {[
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December",
                  ].map((month, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Calendar
            mode="single"
            selected={savedDate || undefined}
            month={tempDate}
            onMonthChange={setTempDate}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {field.description && (
        <p className="text-sm text-muted-foreground mt-1">{field.description}</p>
      )}

      {displayError && (
        <p className="text-sm text-destructive flex items-center mt-1">
          <AlertCircle className="h-4 w-4 mr-1" />
          {displayError}
        </p>
      )}
    </div>
  );
};

export default DateField;
