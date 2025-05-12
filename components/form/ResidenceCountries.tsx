'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Country {
  value: string;
  label: string;
}

interface ResidenceStatus {
  value: string;
  label: string;
}

interface ResidenceCountry {
  id: string;
  country: string;
  status: string;
  fromDate: Date | null;
  toDate: Date | null;
}

interface ResidenceCountriesProps {
  countries: Country[];
  statuses: ResidenceStatus[];
  value: ResidenceCountry[];
  onChange: (value: ResidenceCountry[]) => void;
}

export function ResidenceCountries({
  countries,
  statuses,
  value = [],
  onChange
}: ResidenceCountriesProps) {
  // Initialize with one country if empty
  const [residenceCountries, setResidenceCountries] = useState<ResidenceCountry[]>(() => {
    if (Array.isArray(value) && value.length > 0) {
      return value;
    } else {
      // Always start with one empty country entry
      return [{
        id: `country-${Date.now()}`,
        country: '',
        status: '',
        fromDate: null,
        toDate: null
      }];
    }
  });

  useEffect(() => {
    onChange(residenceCountries);
  }, [residenceCountries, onChange]);

  const addCountry = () => {
    const newCountry: ResidenceCountry = {
      id: `country-${Date.now()}`,
      country: '',
      status: '',
      fromDate: null,
      toDate: null
    };
    setResidenceCountries([...residenceCountries, newCountry]);
  };

  const removeCountry = (id: string) => {
    setResidenceCountries(residenceCountries.filter(country => country.id !== id));
  };

  const updateCountry = (id: string, field: keyof ResidenceCountry, value: any) => {
    setResidenceCountries(
      residenceCountries.map(country => 
        country.id === id ? { ...country, [field]: value } : country
      )
    );
  };

  return (
    <div className="space-y-4">
      {Array.isArray(residenceCountries) && residenceCountries.map((residenceCountry, index) => (
        <Card key={residenceCountry.id} className="p-4">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium">
              {index === 0 ? 'Country of Residence' : `Additional Country of Residence ${index}`}
            </h3>
            {index > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => removeCountry(residenceCountry.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor={`country-${residenceCountry.id}`} className="text-sm font-medium">
                Country or territory
              </label>
              <Select
                value={residenceCountry.country}
                onValueChange={(value) => updateCountry(residenceCountry.id, 'country', value)}
              >
                <SelectTrigger id={`country-${residenceCountry.id}`}>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label htmlFor={`status-${residenceCountry.id}`} className="text-sm font-medium">
                Status in this country or territory
              </label>
              <Select
                value={residenceCountry.status}
                onValueChange={(value) => updateCountry(residenceCountry.id, 'status', value)}
              >
                <SelectTrigger id={`status-${residenceCountry.id}`}>
                  <SelectValue placeholder="Select your status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor={`from-${residenceCountry.id}`} className="text-sm font-medium">
                  From
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id={`from-${residenceCountry.id}`}
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !residenceCountry.fromDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {residenceCountry.fromDate ? (
                        format(residenceCountry.fromDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={residenceCountry.fromDate || undefined}
                      onSelect={(date) => updateCountry(residenceCountry.id, 'fromDate', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <label htmlFor={`to-${residenceCountry.id}`} className="text-sm font-medium">
                  To
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id={`to-${residenceCountry.id}`}
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !residenceCountry.toDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {residenceCountry.toDate ? (
                        format(residenceCountry.toDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={residenceCountry.toDate || undefined}
                      onSelect={(date) => updateCountry(residenceCountry.id, 'toDate', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </Card>
      ))}

      {/* Only show the Add button if there's at least one country already */}
      {Array.isArray(residenceCountries) && residenceCountries.length > 0 && (
        <Button 
          type="button" 
          variant="outline" 
          className="w-full" 
          onClick={addCountry}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Another Country of Residence
        </Button>
      )}
    </div>
  );
}
