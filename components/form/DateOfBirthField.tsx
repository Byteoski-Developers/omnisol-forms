"use client";
import React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface DateOfBirthFieldProps {
  field: {
    id: string;
    label?: string;
    required?: boolean;
    description?: string;
  };
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  showLabel?: boolean;
}

export function DateOfBirthField({ 
  field, 
  value, 
  onChange, 
  error, 
  disabled = false,
  showLabel = true
}: DateOfBirthFieldProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const [month, setMonth] = React.useState<Date>(selectedDate || new Date());
  const [dateError, setDateError] = React.useState<string>('');

  // Get today's date at midnight to prevent timezone issues
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  React.useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
      setMonth(date);
      // Clear any previous error when value changes externally
      setDateError('');
    }
  }, [value]);

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      // Create a new date at noon to avoid timezone issues
      const fixedDate = new Date(date);
      fixedDate.setHours(12, 0, 0, 0);
      
      // Update the selected date regardless of validation
      setSelectedDate(fixedDate);
      
      // Check if date is in the future
      if (fixedDate > today) {
        setDateError('Date of birth cannot be in the future');
      } else {
        // Only update the form value if it's a valid date
        setDateError('');
        onChange(fixedDate.toISOString());
      }
      
      // Close the popover after selection
      setIsOpen(false);
    }
  };

  // Generate years from 1945 to 2090
  const years = Array.from({ length: 2090 - 1945 + 1 }, (_, i) => 1945 + i);
  
  // Generate months
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleYearChange = (yearStr: string) => {
    const newYear = parseInt(yearStr);
    const newDate = new Date(month);
    newDate.setFullYear(newYear);
    setMonth(newDate);

    if (selectedDate) {
      const updatedDate = new Date(selectedDate);
      updatedDate.setFullYear(newYear);
      setSelectedDate(updatedDate);
      onChange(updatedDate.toISOString());
    }
  };

  const handleMonthChange = (monthStr: string) => {
    const newMonthIndex = parseInt(monthStr);
    const newDate = new Date(month);
    newDate.setMonth(newMonthIndex);
    setMonth(newDate);

    if (selectedDate) {
      const updatedDate = new Date(selectedDate);
      updatedDate.setMonth(newMonthIndex);
      setSelectedDate(updatedDate);
      onChange(updatedDate.toISOString());
    }
  };

  // Format the display date to show in local format
  const displayDate = selectedDate 
    ? format(selectedDate, 'PPP')
    : 'Pick a date';

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {/* {showLabel && field.label && (
        <Label htmlFor={field.id}>
          {field.label}
          {field.required && <span className="text-destructive">*</span>}
        </Label>
      )} */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {displayDate}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex justify-between p-3 border-b">
            <Select 
              value={month.getFullYear().toString()} 
              onValueChange={handleYearChange}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select 
              value={month.getMonth().toString()} 
              onValueChange={handleMonthChange}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((monthName, index) => (
                  <SelectItem key={monthName} value={index.toString()}>
                    {monthName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DayPicker    
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            disabled={disabled}
            month={month}
            onMonthChange={setMonth}
            className="border-none p-3"
            showOutsideDays
            fixedWeeks
            modifiers={{
              disabled: [] // Remove the disabled dates
            }}
            modifiersStyles={{
              selected: {
                backgroundColor: "black",
                color: "white",
                fontWeight: "bold"
              }
            }}
            styles={{
              caption: { display: "flex", justifyContent: "space-between", alignItems: "center" },
              nav: { display: "flex", justifyContent: "space-between" },
              day: { 
                margin: "0.15rem", 
                borderRadius: "0.2rem", 
                width: "2rem", 
                height: "2rem", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center",
                cursor: "pointer" // Ensure cursor is pointer for all days
              },
              head_cell: { width: "2rem", fontSize: "0.875rem", fontWeight: "500" },
              table: { width: "100%", borderCollapse: "collapse" as const },
              cell: { width: "2rem", height: "2rem", padding: "0" }
            }}
          />
        </PopoverContent>
      </Popover>
      {field.description && (
        <p className="text-sm text-muted-foreground mt-1">{field.description}</p>
      )}
      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
      {dateError && (
        <p className="text-sm text-destructive mt-1">{dateError}</p>
      )}
    </div>
  );
}

export default DateOfBirthField;
