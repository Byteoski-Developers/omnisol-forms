'use client';

import { useState, useEffect } from 'react';
import { Tab } from "@headlessui/react";
import { Plus, Trash2, AlertCircle } from 'lucide-react';
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface Destination {
  id: number;
  city: string;
  address: string;
  arrivalDate: string;
  departureDate: string;
}

interface ValidationErrors {
  [key: string]: {
    [field: string]: string;
  };
}

interface TravelItineraryProps {
  onChange: (val: Destination[]) => void;
  value?: Destination[];
  readonly?: boolean;
  onError?: (hasErrors: boolean) => void;
  cities?: { label: string; value: string }[];
}

const CHINA_CITIES = [
  { label: 'Beijing', value: 'beijing' },
  { label: 'Shanghai', value: 'shanghai' },
  { label: 'Guangzhou', value: 'guangzhou' },
  { label: 'Shenzhen', value: 'shenzhen' },
  { label: 'Chengdu', value: 'chengdu' },
  { label: 'Xi\'an', value: 'xian' },
  { label: 'Hangzhou', value: 'hangzhou' },
  { label: 'Suzhou', value: 'suzhou' },
  { label: 'Nanjing', value: 'nanjing' },
  { label: 'Tianjin', value: 'tianjin' }
];

export function TravelItinerary({ onChange, value = [], readonly, onError, cities = CHINA_CITIES }: TravelItineraryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [destinations, setDestinations] = useState<Destination[]>(value);
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (value.length > 0) {
      setDestinations(value);
    }
  }, [value]);

  useEffect(() => {
    validateDestinations();
  }, [destinations]);

  const createNewDestination = (id: number): Destination => ({
    id,
    city: '',
    address: '',
    arrivalDate: '',
    departureDate: ''
  });

  const validateField = (value: string, fieldName: string): string => {
    if (!value.trim()) {
      return `${fieldName} is required`;
    }
    
    if (fieldName === 'Arrival Date' || fieldName === 'Departure Date') {
      const date = new Date(value);
      const today = new Date();
      
      if (isNaN(date.getTime())) {
        return 'Invalid date format';
      }
      
      if (date < today) {
        return 'Date cannot be in the past';
      }
    }
    
    return '';
  };

  const validateDestinations = () => {
    const newErrors: ValidationErrors = {};
    let hasValidationErrors = false;

    destinations.forEach(destination => {
      const destinationErrors: { [key: string]: string } = {};
      
      const fields = [
        { key: 'city', label: 'City' },
        { key: 'address', label: 'Address' },
        { key: 'arrivalDate', label: 'Arrival Date' },
        { key: 'departureDate', label: 'Departure Date' }
      ];

      fields.forEach(({ key, label }) => {
        const error = validateField(String(destination[key as keyof Destination]), label);
        if (error) {
          destinationErrors[key] = error;
          hasValidationErrors = true;
        }
      });

      // Validate that departure is after arrival
      if (destination.arrivalDate && destination.departureDate) {
        const arrival = new Date(destination.arrivalDate);
        const departure = new Date(destination.departureDate);
        if (departure < arrival) {
          destinationErrors.departureDate = 'Departure date must be after arrival date';
          hasValidationErrors = true;
        }
      }

      if (Object.keys(destinationErrors).length > 0) {
        newErrors[destination.id] = destinationErrors;
      }
    });

    setErrors(newErrors);
    onError?.(hasValidationErrors);
    return hasValidationErrors;
  };

  const handleDestinationChange = (updatedDestination: Destination) => {
    const newDestinations = destinations.map((dest) =>
      dest.id === updatedDestination.id ? updatedDestination : dest
    );
    setDestinations(newDestinations);
    onChange(newDestinations);
  };

  const handleDestinationRemove = (destinationId: number) => {
    const newDestinations = destinations.filter((dest) => dest.id !== destinationId)
      .map((dest, index) => ({ ...dest, id: index + 1 }));
    
    setDestinations(newDestinations);
    onChange(newDestinations);
    setSelectedIndex(Math.min(selectedIndex, newDestinations.length - 1));
    
    const newErrors = { ...errors };
    delete newErrors[destinationId];
    setErrors(newErrors);
  };

  const handleAddDestination = () => {
    const newDestination = createNewDestination(destinations.length + 1);
    const newDestinations = [...destinations, newDestination];
    setDestinations(newDestinations);
    setSelectedIndex(newDestinations.length - 1);
    onChange(newDestinations);
  };

  const renderFieldError = (destinationId: number, field: string) => {
    const error = errors[destinationId]?.[field];
    if (!error) return null;

    return (
      <div className="flex items-center gap-1 text-destructive text-sm mt-1">
        <AlertCircle className="h-4 w-4" />
        <span>{error}</span>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-4 space-y-4">
      <div className="flex justify-between items-center border-b pb-4">
        <h4 className="font-semibold text-lg">Travel Itinerary</h4>
        {!readonly && (
          <Button onClick={handleAddDestination} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Destination
          </Button>
        )}
      </div>

      {destinations.length > 0 ? (
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="flex space-x-2 overflow-x-auto pb-2">
            {destinations.map((destination) => (
              <Tab key={destination.id} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`
                      px-4 py-2 rounded-lg font-medium text-sm transition
                      ${selected 
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }
                      ${errors[destination.id] ? 'ring-2 ring-destructive' : ''}
                    `}
                  >
                    {destination.city || `Destination #${destination.id}`}
                    {errors[destination.id] && (
                      <AlertCircle className="inline-block w-4 h-4 ml-2 text-destructive" />
                    )}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-4">
            {destinations.map((destination) => (
              <Tab.Panel key={destination.id} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Select
                      value={destination.city}
                      onValueChange={(value) => 
                        handleDestinationChange({ ...destination, city: value })
                      }
                      disabled={readonly}
                    >
                      <SelectTrigger className={errors[destination.id]?.city ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.value} value={city.value}>
                            {city.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {renderFieldError(destination.id, 'city')}
                  </div>

                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input
                      value={destination.address}
                      onChange={(e) => 
                        handleDestinationChange({ ...destination, address: e.target.value })
                      }
                      className={errors[destination.id]?.address ? 'border-destructive' : ''}
                      placeholder="Hotel or residence address"
                      disabled={readonly}
                    />
                    {renderFieldError(destination.id, 'address')}
                  </div>

                  <div className="space-y-2">
                    <Label>Arrival Date</Label>
                    <Input
                      type="date"
                      value={destination.arrivalDate}
                      onChange={(e) => 
                        handleDestinationChange({ ...destination, arrivalDate: e.target.value })
                      }
                      className={errors[destination.id]?.arrivalDate ? 'border-destructive' : ''}
                      disabled={readonly}
                    />
                    {renderFieldError(destination.id, 'arrivalDate')}
                  </div>

                  <div className="space-y-2">
                    <Label>Departure Date</Label>
                    <Input
                      type="date"
                      value={destination.departureDate}
                      onChange={(e) => 
                        handleDestinationChange({ ...destination, departureDate: e.target.value })
                      }
                      className={errors[destination.id]?.departureDate ? 'border-destructive' : ''}
                      disabled={readonly}
                    />
                    {renderFieldError(destination.id, 'departureDate')}
                  </div>
                </div>

                {!readonly && destinations.length > 1 && (
                  <div className="flex justify-end">
                    <Button
                      onClick={() => handleDestinationRemove(destination.id)}
                      variant="destructive"
                      className="mt-4"
                    >
                      Remove Destination
                    </Button>
                  </div>
                )}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No destinations added yet. Click "Add Destination" to begin.
        </div>
      )}
    </div>
  );
}