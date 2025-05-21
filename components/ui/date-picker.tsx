"use client"
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type DatePickerProps = {
  value?: Date
  onChange?: (date?: Date) => void
  disabled?: boolean
}

export function DatePicker({
  value,
  onChange,
  disabled = false,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value);
  const [month, setMonth] = React.useState<Date>(selectedDate || new Date());
 
  // Update selectedDate when value changes from parent
  React.useEffect(() => {
    setSelectedDate(value);
    if (value) {
      setMonth(value);
    }
  }, [value]);

  // Custom handler for date selection
  const handleSelect = (date?: Date) => {
    setSelectedDate(date);
    
    if (onChange) {
      onChange(date);
    }
    
    // Close the popover when a date is selected
    if (date) {
      setIsOpen(false);
    }
  };

  // Get available years (10 years before and after current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
  
  // Get all months
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex justify-between p-3 border-b">
          <Select 
            value={month.getFullYear().toString()} 
            onValueChange={(value) => {
              const newMonth = new Date(month);
              newMonth.setFullYear(parseInt(value));
              setMonth(newMonth);
            }}
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
            value={(month.getMonth()).toString()} 
            onValueChange={(value) => {
              const newMonth = new Date(month);
              newMonth.setMonth(parseInt(value));
              setMonth(newMonth);
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={month} value={index.toString()}>
                  {month}
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
            day: { margin: "0.15rem", borderRadius: "0.2rem", width: "2rem", height: "2rem", display: "flex", justifyContent: "center", alignItems: "center" },
            head_cell: { width: "2rem", fontSize: "0.875rem", fontWeight: "500" },
            table: { width: "100%", borderCollapse: "collapse" as const },
            cell: { width: "2rem", height: "2rem", padding: "0" }
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
