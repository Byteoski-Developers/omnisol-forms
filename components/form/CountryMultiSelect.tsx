'use client';

import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

interface Country {
  value: string;
  label: string;
}

interface CountryMultiSelectProps {
  countries: Country[];
  selectedCountries: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export function CountryMultiSelect({
  countries,
  selectedCountries,
  onChange,
  placeholder = "Select countries..."
}: CountryMultiSelectProps) {
  const [open, setOpen] = useState(false);

  const selectedCountryLabels = selectedCountries.map(value => {
    return countries.find(country => country.value === value)?.label || value;
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedCountries.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selectedCountryLabels.map(label => (
                <Badge key={label} variant="secondary" className="mr-1">
                  {label}
                </Badge>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search countries..." />
          <CommandEmpty>No country found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {countries.map(country => (
              <CommandItem
                key={country.value}
                onSelect={() => {
                  const isSelected = selectedCountries.includes(country.value);
                  let updated: string[];
                  if (isSelected) {
                    updated = selectedCountries.filter(value => value !== country.value);
                  } else {
                    updated = [...selectedCountries, country.value];
                  }
                  onChange(updated);
                }}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${
                    selectedCountries.includes(country.value) ? "opacity-100" : "opacity-0"
                  }`}
                />
                {country.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}