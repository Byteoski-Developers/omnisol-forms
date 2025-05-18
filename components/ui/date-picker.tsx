"use client"
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

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
 
  // Update selectedDate when value changes from parent
  React.useEffect(() => {
    setSelectedDate(value);
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
        <DayPicker    
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          disabled={disabled}
          className="border-none"
          showOutsideDays
          fixedWeeks
          captionLayout="buttons"
        
            
        />
      </PopoverContent>
    </Popover>
  )
}
