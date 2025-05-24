'use client';

import { useState, useEffect } from 'react';
import { Check, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

interface Option {
  value: string;
  label: string;
}

interface CheckboxMultiSelectProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  label?: string;
}

export function CheckboxMultiSelect({
  options = [],
  selectedValues = [],
  onChange,
  placeholder = "Select options...",
  searchPlaceholder = "Search options...",
  emptyMessage = "No option found.",
  label
}: CheckboxMultiSelectProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Ensure options is always an array
  const safeOptions = Array.isArray(options) ? options : [];
  
  // Ensure selectedValues is always an array
  const safeSelectedValues = Array.isArray(selectedValues) ? selectedValues : [];

  // Filter options based on search query
  const filteredOptions = safeOptions.filter(option => 
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div className="w-full space-y-2">
      {label && (
        <Label className="text-sm font-medium">{label}</Label>
      )}
      
      <div className="border rounded-md w-full p-2 bg-background">
        {/* Search input */}
        <div className="relative mb-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        
        {/* Selected items display */}
        {safeSelectedValues.length > 0 && (
          <div className="flex flex-wrap w-full mb-2">
            {safeSelectedValues.map((value) => {
              const option = safeOptions.find(opt => opt.value === value);
              return option ? (
                <Badge 
                  key={value} 
                  variant="secondary" 
                  className="mr-1 mb-1 text-xs truncate max-w-full"
                >
                  {option.label}
                  <span 
                    className="ml-1 cursor-pointer" 
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
        {filteredOptions.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          <ScrollArea className="max-h-64">
            <div className="space-y-1">
              {filteredOptions.map(option => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2 py-1 px-1 rounded-sm hover:bg-accent"
                >
                  <Checkbox
                    id={`checkbox-${option.value}`}
                    checked={safeSelectedValues.includes(option.value)}
                    onCheckedChange={() => toggleOption(option.value)}
                  />
                  <Label
                    htmlFor={`checkbox-${option.value}`}
                    className="text-sm cursor-pointer flex-grow"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
