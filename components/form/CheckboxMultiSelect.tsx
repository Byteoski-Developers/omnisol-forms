'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface CheckboxMultiSelectProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  emptyMessage?: string;
  label?: string;
}

export function CheckboxMultiSelect({
  options = [],
  selectedValues = [],
  onChange,
  placeholder = "Select options...",
  emptyMessage = "No option found.",
  label
}: CheckboxMultiSelectProps) {
  // Ensure options is always an array
  const safeOptions = Array.isArray(options) ? options : [];
  
  // Ensure selectedValues is always an array
  const safeSelectedValues = Array.isArray(selectedValues) ? selectedValues : [];

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

  // Calculate the height based on the number of options
  // Minimum height is 200px, maximum is 400px
  const optionsCount = safeOptions.length;
  const optionsHeight = Math.min(Math.max(optionsCount * 50, 200), 400);

  return (
    <div className="w-full space-y-2">
      {label && (
        <Label className="text-sm font-medium">{label}</Label>
      )}
      
      <div className="border rounded-md w-full p-3 bg-background">
        {/* Selected items display */}
        {safeSelectedValues.length > 0 && (
          <div className="flex flex-wrap w-full mb-3">
            {safeSelectedValues.map((value) => {
              const option = safeOptions.find(opt => opt.value === value);
              return option ? (
                <Badge 
                  key={value} 
                  variant="secondary" 
                  className="mr-2 mb-2 text-sm truncate max-w-full py-1 px-3"
                >
                  {option.label}
                  <span 
                    className="ml-2 cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleOption(value);
                    }}
                  >
                    ×
                  </span>
                </Badge>
              ) : null;
            })}
          </div>
        )}
        
        {/* Checkbox options */}
        {safeOptions.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          <ScrollArea 
            className={`w-full rounded-md`} 
            style={{ height: `${optionsHeight}px` }}
            scrollHideDelay={0}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-1">
              {safeOptions.map(option => {
                const isSelected = safeSelectedValues.includes(option.value);
                return (
                  <div
                    key={option.value}
                    className={cn(
                      "flex items-center p-3 rounded-md border cursor-pointer transition-colors",
                      isSelected 
                        ? "bg-green-50 border-green-200 text-green-800" 
                        : "hover:bg-gray-50 border-gray-200"
                    )}
                    onClick={() => toggleOption(option.value)}
                  >
                    <div className="flex-grow text-sm font-medium">
                      {option.label}
                    </div>
                    {isSelected && (
                      <div className="flex-shrink-0 ml-2 bg-green-100 rounded-full p-1">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
