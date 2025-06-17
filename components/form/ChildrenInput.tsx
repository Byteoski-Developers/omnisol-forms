'use client';

import { Tab } from "@headlessui/react";
import { UserPlus, AlertCircle } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DatePicker } from '../ui/date-picker';

interface Child {
  id: number;
  surname: string;
  givenNames: string;
  dateOfBirth: string;
  gender: string;
  relationship: string;
}

interface ValidationErrors {
  [key: string]: {
    [field: string]: string;
  };
}

interface ChildrenInputProps {
  onChange: (val: Child[]) => void;
  value?: Child[];
  readonly?: boolean;
  onError?: (hasErrors: boolean) => void;
}

export function ChildrenInput({ onChange, value = [], readonly, onError }: ChildrenInputProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [children, setChildren] = useState<Child[]>(value);
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (value.length > 0) {
      setChildren(value);
    }
  }, [value]);

  useEffect(() => {
    validateChildren();
  }, [children]);

  const createNewChild = (id: number): Child => ({
    id,
    surname: "",
    givenNames: "",
    dateOfBirth: "",
    gender: "",
    relationship: ""
  });

  const validateField = (value: string, fieldName: string): string => {
    if (!value.trim()) {
      return `${fieldName} is required`;
    }
    
    if (fieldName === 'Date of Birth') {
      const date = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      
      if (isNaN(date.getTime())) {
        return 'Invalid date format';
      }
      
      if (age >= 16) {
        return 'Child must be under 16 years old';
      }
      
      if (date > today) {
        return 'Date cannot be in the future';
      }
    }
    
    return '';
  };

  const validateChildren = () => {
    const newErrors: ValidationErrors = {};
    let hasValidationErrors = false;

    children.forEach(child => {
      const childErrors: { [key: string]: string } = {};
      
      const fields: Array<{ key: keyof Child; label: string }> = [
        { key: 'surname', label: 'Surname' },
        { key: 'givenNames', label: 'Given Names' },
        { key: 'dateOfBirth', label: 'Date of Birth' },
        { key: 'gender', label: 'Gender' },
        { key: 'relationship', label: 'Relationship' }
      ];

      fields.forEach(({ key, label }) => {
        const error = validateField(String(child[key]), label);
        if (error) {
          childErrors[key] = error;
          hasValidationErrors = true;
        }
      });

      if (Object.keys(childErrors).length > 0) {
        newErrors[child.id] = childErrors;
      }
    });

    setErrors(newErrors);
    onError?.(hasValidationErrors);
    return hasValidationErrors;
  };

  const handleChildChange = (updatedChild: Child) => {
    const newChildren = children.map((child) =>
      child.id === updatedChild.id ? updatedChild : child
    );
    setChildren(newChildren);
    onChange(newChildren);
  };

  const handleChildRemove = (childId: number) => {
    const newChildren = children.filter((child) => child.id !== childId)
      .map((child, index) => ({ ...child, id: index + 1 }));
    
    setChildren(newChildren);
    onChange(newChildren);
    setSelectedIndex(Math.min(selectedIndex, newChildren.length - 1));
    
    // Clear errors for removed child
    const newErrors = { ...errors };
    delete newErrors[childId];
    setErrors(newErrors);
  };

  const handleAddChild = () => {
    const newChild = createNewChild(children.length + 1);
    const newChildren = [...children, newChild];
    setChildren(newChildren);
    setSelectedIndex(newChildren.length - 1);
    onChange(newChildren);
  };

  const renderFieldError = (childId: number, field: string) => {
    const error = errors[childId]?.[field];
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
        <h4 className="font-semibold text-lg">Children Information</h4>
        {!readonly && (
          <Button onClick={handleAddChild} className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Add Child
          </Button>
        )}
      </div>

      {children.length > 0 ? (
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="flex space-x-2 overflow-x-auto pb-2">
            {children.map((child) => (
              <Tab key={child.id} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`
                      px-4 py-2 rounded-lg font-medium text-sm transition
                      ${selected 
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }
                      ${errors[child.id] ? 'ring-2 ring-destructive' : ''}
                    `}
                  >
                    Child #{child.id}
                    {errors[child.id] && (
                      <AlertCircle className="inline-block w-4 h-4 ml-2 text-destructive" />
                    )}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-4">
            {children.map((child) => (
              <Tab.Panel key={child.id} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Surname/Family Name</label>
                    <input
                      type="text"
                      value={child.surname}
                      onChange={(e) => handleChildChange({ ...child, surname: e.target.value })}
                      className={`w-full rounded-md border px-3 py-2 ${
                        errors[child.id]?.surname 
                          ? 'border-destructive' 
                          : 'border-input'
                      } bg-background`}
                      disabled={readonly}
                    />
                    {renderFieldError(child.id, 'surname')}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Given Names</label>
                    <input
                      type="text"
                      value={child.givenNames}
                      onChange={(e) => handleChildChange({ ...child, givenNames: e.target.value })}
                      className={`w-full rounded-md border px-3 py-2 ${
                        errors[child.id]?.givenNames 
                          ? 'border-destructive' 
                          : 'border-input'
                      } bg-background`}
                      disabled={readonly}
                    />
                    {renderFieldError(child.id, 'givenNames')}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date of Birth</label>
                    <DatePicker
                      disableFutureDates={true}
                      value={child.dateOfBirth ? new Date(child.dateOfBirth) : undefined}
                      onChange={(date) => {
                        // Store date in ISO format for backend compatibility and validation
                        const formattedDate = date ? date.toISOString().split('T')[0] : '';
                        handleChildChange({ 
                          ...child, 
                          dateOfBirth: formattedDate
                        });
                      }}
                      disabled={readonly}
                    />
                    {renderFieldError(child.id, 'dateOfBirth')}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Gender</label>
                    <select
                      value={child.gender}
                      onChange={(e) => handleChildChange({ ...child, gender: e.target.value })}
                      className={`w-full rounded-md border px-3 py-2 ${
                        errors[child.id]?.gender 
                          ? 'border-destructive' 
                          : 'border-input'
                      } bg-background`}
                      disabled={readonly}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {renderFieldError(child.id, 'gender')}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Relationship</label>
                    <select
                      value={child.relationship}
                      onChange={(e) => handleChildChange({ ...child, relationship: e.target.value })}
                      className={`w-full rounded-md border px-3 py-2 ${
                        errors[child.id]?.relationship 
                          ? 'border-destructive' 
                          : 'border-input'
                      } bg-background`}
                      disabled={readonly}
                    >
                      <option value="">Select Relationship</option>
                      <option value="son">Son</option>
                      <option value="daughter">Daughter</option>
                      <option value="ward">Ward</option>
                    </select>
                    {renderFieldError(child.id, 'relationship')}
                  </div>
                </div>

                {!readonly && (
                  <div className="flex justify-end">
                    <Button
                      onClick={() => handleChildRemove(child.id)}
                      variant="destructive"
                      className="mt-4"
                    >
                      Remove Child
                    </Button>
                  </div>
                )}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No children added yet. Click "Add Child" to begin.
        </div>
      )}
    </div>
  );
}