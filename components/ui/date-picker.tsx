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
  disableFutureDates?: boolean
}

export function DatePicker({
  value,
  onChange,
  disabled = false,
  disableFutureDates = false,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value)
  const [month, setMonth] = React.useState<Date>(selectedDate || new Date())
  const [dateError, setDateError] = React.useState<string>('')

  // Get today's date at midnight to prevent timezone issues
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  React.useEffect(() => {
    setSelectedDate(value)
    if (value) {
      setMonth(value)
      // Clear any previous error when value changes externally
      setDateError('')
    }
  }, [value])

  const handleSelect = (date?: Date) => {
    if (date) {
      // Create a new date at noon to avoid timezone issues
      const fixedDate = new Date(date);
      fixedDate.setHours(12, 0, 0, 0);
      
      // Update the selected date regardless of validation
      setSelectedDate(fixedDate);
      
      
      // Check if date is in the future and we need to validate
      if (disableFutureDates && fixedDate > today) {
        setDateError('Date cannot be in the future');
      } else {
        // Only update the form value if it's a valid date
        setDateError('');
        onChange?.(fixedDate);
      }
      
      // Close the popover after selection
      setIsOpen(false);
    }
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 2200 - 1900 + 1 }, (_, i) => 1900 + i)
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ]

  const handleYearChange = (yearStr: string) => {
    const newYear = parseInt(yearStr)
    const newDate = new Date(month)
    newDate.setFullYear(newYear)
    setMonth(newDate)

    if (selectedDate) {
      const updatedDate = new Date(selectedDate)
      updatedDate.setFullYear(newYear)
      setSelectedDate(updatedDate)
      
      // Validate the updated date
      if (disableFutureDates && updatedDate > today) {
        setDateError('Date cannot be in the future');
      } else {
        setDateError('');
        onChange?.(updatedDate)
      }
    }
  }

  const handleMonthChange = (monthStr: string) => {
    const newMonthIndex = parseInt(monthStr)
    const newDate = new Date(month)
    newDate.setMonth(newMonthIndex)
    setMonth(newDate)

    if (selectedDate) {
      const updatedDate = new Date(selectedDate)
      updatedDate.setMonth(newMonthIndex)
      setSelectedDate(updatedDate)
      
      // Validate the updated date
      if (disableFutureDates && updatedDate > today) {
        setDateError('Date cannot be in the future');
      } else {
        setDateError('');
        onChange?.(updatedDate)
      }
    }
  }

  // Format the display date to show in local format
  const displayDate = selectedDate 
    ? format(selectedDate, 'PPP')
    : 'Pick a date';

  return (
    <div className="grid w-full items-center gap-1.5">
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
              value={(month.getMonth()).toString()} 
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
            modifiers={
              disableFutureDates 
                ? { disabled: (date: Date) => date > today }
                : {}
            }
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
      {dateError && (
        <p className="text-sm text-destructive mt-1">{dateError}</p>
      )}
    </div>
  )
}
