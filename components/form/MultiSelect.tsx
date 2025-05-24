'use client';

import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

export function MultiSelect({
  options = [],
  selectedValues = [],
  onChange,
  placeholder = "Select options...",
  searchPlaceholder = "Search options...",
  emptyMessage = "No option found."
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Ensure options is always an array
  const safeOptions = Array.isArray(options) ? options : [];
  
  // Ensure selectedValues is always an array
  const safeSelectedValues = Array.isArray(selectedValues) ? selectedValues : [];

  // Filter options based on search query
  const filteredOptions = safeOptions.filter(option => 
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedLabels = safeSelectedValues.map(value => {
    const option = safeOptions.find(opt => opt.value === value);
    return option ? option.label : value;
  });

  const toggleOption = (value: string) => {
    const isSelected = safeSelectedValues.includes(value);
    let updated: string[];
    
    if (isSelected) {
      updated = safeSelectedValues.filter(val => val !== value);
    } else {
      updated = [...safeSelectedValues, value];
    }
    
    onChange(updated);
  };

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="border rounded-md w-full min-h-10 p-2 bg-background">
            {safeSelectedValues.length > 0 ? (
              <div className="flex flex-wrap w-full">
                {selectedLabels.map((label, index) => (
                  <Badge key={index} variant="secondary" className="mr-1 mb-1 text-xs truncate max-w-full">
                    {label}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="flex h-6 items-center text-muted-foreground">
                {placeholder}
              </div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <div className="p-2">
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-2"
            />
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </div>
            ) : (
              <ScrollArea className="max-h-64">
                <div className="p-1">
                  {filteredOptions.map(option => (
                    <div
                      key={option.value}
                      className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground ${
                        safeSelectedValues.includes(option.value) ? 'bg-accent text-accent-foreground' : ''
                      }`}
                      onClick={() => toggleOption(option.value)}
                    >
                      <Check
                        className={`mr-2 h-4 w-4 ${
                          safeSelectedValues.includes(option.value) ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      {option.label}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
