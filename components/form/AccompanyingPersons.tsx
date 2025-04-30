'use client';

import { useState, useEffect } from 'react';
import { Tab } from "@headlessui/react";
import { UserPlus, AlertCircle, Upload } from "lucide-react";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AccompanyingPerson {
  id: number;
  familyName: string;
  givenNames: string;
  gender: string;
  dateOfBirth: string;
  photo?: File;
}

interface ValidationErrors {
  [key: string]: {
    [field: string]: string;
  };
}

interface AccompanyingPersonsProps {
  onChange: (val: AccompanyingPerson[]) => void;
  value?: AccompanyingPerson[];
  readonly?: boolean;
  onError?: (hasErrors: boolean) => void;
}

export function AccompanyingPersons({ onChange, value = [], readonly, onError }: AccompanyingPersonsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [persons, setPersons] = useState<AccompanyingPerson[]>(value);
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (value.length > 0) {
      setPersons(value);
    }
  }, [value]);

  useEffect(() => {
    validatePersons();
  }, [persons]);

  const createNewPerson = (id: number): AccompanyingPerson => ({
    id,
    familyName: "",
    givenNames: "",
    gender: "",
    dateOfBirth: "",
  });

  const validateField = (value: string, fieldName: string): string => {
    if (!value.trim()) {
      return `${fieldName} is required`;
    }
    
    if (fieldName === 'Date of Birth') {
      const date = new Date(value);
      const today = new Date();
      
      if (isNaN(date.getTime())) {
        return 'Invalid date format';
      }
      
      if (date > today) {
        return 'Date cannot be in the future';
      }
    }
    
    return '';
  };

  const validatePersons = () => {
    const newErrors: ValidationErrors = {};
    let hasValidationErrors = false;

    persons.forEach(person => {
      const personErrors: { [key: string]: string } = {};
      
      const fields = [
        { key: 'familyName', label: 'Family Name' },
        { key: 'givenNames', label: 'Given Names' },
        { key: 'gender', label: 'Gender' },
        { key: 'dateOfBirth', label: 'Date of Birth' }
      ];

      fields.forEach(({ key, label }) => {
        const error = validateField(String(person[key as keyof AccompanyingPerson]), label);
        if (error) {
          personErrors[key] = error;
          hasValidationErrors = true;
        }
      });

      if (Object.keys(personErrors).length > 0) {
        newErrors[person.id] = personErrors;
      }
    });

    setErrors(newErrors);
    onError?.(hasValidationErrors);
    return hasValidationErrors;
  };

  const handlePersonChange = (updatedPerson: AccompanyingPerson) => {
    const newPersons = persons.map((person) =>
      person.id === updatedPerson.id ? updatedPerson : person
    );
    setPersons(newPersons);
    onChange(newPersons);
  };

  const handlePersonRemove = (personId: number) => {
    const newPersons = persons.filter((person) => person.id !== personId)
      .map((person, index) => ({ ...person, id: index + 1 }));
    
    setPersons(newPersons);
    onChange(newPersons);
    setSelectedIndex(Math.min(selectedIndex, newPersons.length - 1));
    
    const newErrors = { ...errors };
    delete newErrors[personId];
    setErrors(newErrors);
  };

  const handleAddPerson = () => {
    const newPerson = createNewPerson(persons.length + 1);
    const newPersons = [...persons, newPerson];
    setPersons(newPersons);
    setSelectedIndex(newPersons.length - 1);
    onChange(newPersons);
  };

  const handlePhotoUpload = (personId: number, file: File) => {
    const updatedPerson = persons.find(p => p.id === personId);
    if (updatedPerson) {
      handlePersonChange({ ...updatedPerson, photo: file });
    }
  };

  const renderFieldError = (personId: number, field: string) => {
    const error = errors[personId]?.[field];
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
        <h4 className="font-semibold text-lg">Accompanying Persons</h4>
        {!readonly && (
          <Button onClick={handleAddPerson} className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Add Person
          </Button>
        )}
      </div>

      {persons.length > 0 ? (
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="flex space-x-2 overflow-x-auto pb-2">
            {persons.map((person) => (
              <Tab key={person.id} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`
                      px-4 py-2 rounded-lg font-medium text-sm transition
                      ${selected 
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }
                      ${errors[person.id] ? 'ring-2 ring-destructive' : ''}
                    `}
                  >
                    Person #{person.id}
                    {errors[person.id] && (
                      <AlertCircle className="inline-block w-4 h-4 ml-2 text-destructive" />
                    )}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-4">
            {persons.map((person) => (
              <Tab.Panel key={person.id} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Family Name</Label>
                    <Input
                      value={person.familyName}
                      onChange={(e) => 
                        handlePersonChange({ ...person, familyName: e.target.value })
                      }
                      className={errors[person.id]?.familyName ? 'border-destructive' : ''}
                      placeholder="As shown on passport"
                      disabled={readonly}
                    />
                    {renderFieldError(person.id, 'familyName')}
                  </div>

                  <div className="space-y-2">
                    <Label>Given Names</Label>
                    <Input
                      value={person.givenNames}
                      onChange={(e) => 
                        handlePersonChange({ ...person, givenNames: e.target.value })
                      }
                      className={errors[person.id]?.givenNames ? 'border-destructive' : ''}
                      placeholder="Given name(s) & Middle Name as shown on passport"
                      disabled={readonly}
                    />
                    {renderFieldError(person.id, 'givenNames')}
                  </div>

                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup
                      value={person.gender}
                      onValueChange={(value) => 
                        handlePersonChange({ ...person, gender: value })
                      }
                      className="flex space-x-4"
                      disabled={readonly}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id={`female-${person.id}`} />
                        <Label htmlFor={`female-${person.id}`}>Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id={`male-${person.id}`} />
                        <Label htmlFor={`male-${person.id}`}>Male</Label>
                      </div>
                    </RadioGroup>
                    {renderFieldError(person.id, 'gender')}
                  </div>

                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      value={person.dateOfBirth}
                      onChange={(e) => 
                        handlePersonChange({ ...person, dateOfBirth: e.target.value })
                      }
                      className={errors[person.id]?.dateOfBirth ? 'border-destructive' : ''}
                      disabled={readonly}
                    />
                    {renderFieldError(person.id, 'dateOfBirth')}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Photo</Label>
                    <Card className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-32 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                          {person.photo ? (
                            <img
                              src={URL.createObjectURL(person.photo)}
                              alt="Preview"
                              className="w-full h-full object-cover rounded"
                            />
                          ) : (
                            <Upload className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handlePhotoUpload(person.id, file);
                              }
                            }}
                            disabled={readonly}
                          />
                          <p className="text-sm text-gray-500 mt-2">
                            Upload a recent passport-size photo with white background
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                {!readonly && persons.length > 1 && (
                  <div className="flex justify-end">
                    <Button
                      onClick={() => handlePersonRemove(person.id)}
                      variant="destructive"
                      className="mt-4"
                    >
                      Remove Person
                    </Button>
                  </div>
                )}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No accompanying persons added yet. Click "Add Person" to begin.
        </div>
      )}
    </div>
  );
}