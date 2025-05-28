'use client';

import { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, Info } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
  description?: string;
  category?: string;
}

interface CheckboxMultiSelectProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  emptyMessage?: string;
  label?: string;
  helpText?: string;
  showCategories?: boolean;
  maxHeight?: number;
}

export function CheckboxMultiSelect({
  options = [],
  selectedValues = [],
  onChange,
  placeholder = "Click to select your income sources...",
  emptyMessage = "No income sources found.",
  label,
  helpText = "Select all sources of income that apply to your situation. This helps us determine the exact documents you'll need to provide.",
  showCategories = true,
  maxHeight = 300
}: CheckboxMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Ensure options is always an array
  const safeOptions = Array.isArray(options) ? options : [];
  
  // Ensure selectedValues is always an array
  const safeSelectedValues = Array.isArray(selectedValues) ? selectedValues : [];

  // Group options by category if showCategories is true
  const groupedOptions = showCategories ? 
    safeOptions.reduce((acc, option) => {
      const category = option.category || 'Other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(option);
      return acc;
    }, {} as Record<string, Option[]>) : 
    { 'All Sources': safeOptions };

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

  const clearAll = () => {
    onChange([]);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full space-y-2">
      {label && (
        <Label className="text-sm font-medium flex items-center gap-2">
          {label}
          {helpText && (
            <div className="group relative">
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              <div className="absolute left-0 top-6 hidden group-hover:block bg-popover border rounded-md p-3 shadow-md z-50 w-80 text-xs font-normal">
                {helpText}
              </div>
            </div>
          )}
        </Label>
      )}
      
      <div className="relative w-full" ref={dropdownRef}>
        {/* Main trigger button */}
        <div
          className={cn(
            "flex items-center justify-between w-full min-h-[40px] px-3 py-2 text-sm border rounded-md cursor-pointer transition-colors",
            "bg-background hover:bg-accent/50",
            isOpen && "border-primary ring-1 ring-primary/20"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex-1">
            {safeSelectedValues.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : (
              <span className="text-sm font-medium">
                {safeSelectedValues.length} source{safeSelectedValues.length !== 1 ? 's' : ''} selected
              </span>
            )}
          </div>
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </div>

        {/* Selected items display */}
        {safeSelectedValues.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {safeSelectedValues.map((value) => {
              const option = safeOptions.find(opt => opt.value === value);
              return option ? (
                <Badge 
                  key={value} 
                  variant="secondary" 
                  className="text-xs py-1 px-2"
                >
                  <span>{option.label}</span>
                </Badge>
              ) : null;
            })}
          </div>
        )}
        
        {/* Dropdown content */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border rounded-md shadow-lg z-50">
            {/* Options list */}
            {Object.keys(groupedOptions).length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </div>
            ) : (
              <ScrollArea className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
                <div className="p-2">
                  {Object.entries(groupedOptions).map(([category, categoryOptions]) => (
                    <div key={category} className="mb-4 last:mb-0">
                      {showCategories && Object.keys(groupedOptions).length > 1 && (
                        <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          {category}
                        </div>
                      )}
                      <div className="space-y-1">
                        {categoryOptions.map(option => {
                          const isSelected = safeSelectedValues.includes(option.value);
                          return (
                            <div
                              key={option.value}
                              className={cn(
                                "flex items-start gap-3 p-3 rounded-md cursor-pointer transition-colors",
                                isSelected 
                                  ? "bg-green-50 border border-green-200 text-green-800" 
                                  : "hover:bg-accent/50"
                              )}
                              onClick={() => toggleOption(option.value)}
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{option.label}</span>
                                  {isSelected && (
                                    <div className="flex-shrink-0 bg-green-100 rounded-full p-1">
                                      <Check className="h-3 w-3 text-green-600" />
                                    </div>
                                  )}
                                </div>
                                {option.description && (
                                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                    {option.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}

            {/* Footer with selection count */}
            {safeSelectedValues.length > 0 && (
              <div className="border-t p-3 bg-muted/30">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{safeSelectedValues.length} income source{safeSelectedValues.length !== 1 ? 's' : ''} selected</span>
                  <button
                    onClick={clearAll}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}