// components/form/SpouseTabs.tsx
'use client';
import { Fragment, useState, useRef, useEffect } from "react";
import { UserPlus } from "lucide-react";
import { Tab } from "@headlessui/react";
import { DatePicker } from "../ui/date-picker";
import { COUNTRIES } from "@/lib/countries/constants/countries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

export interface SpouseData {
  id: string;
  name: string;
  dob: string;
  passportNumber: string;
  countryOfBirth: string;
  dobDate?: Date;
  isComingAlong?: boolean;
}

interface SpouseTabsProps {
  onChange: (value: string) => void;
  value: string;
  readonly?: boolean;
}

export default function SpouseTabs({ value, onChange, readonly = false }: SpouseTabsProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [spouses, setSpouses] = useState<SpouseData[]>([]);
  const isLocalUpdate = useRef(false);

  useEffect(() => {
    if (!isLocalUpdate.current) {
      try {
        if (value) {
          const parsedData = JSON.parse(value);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            const dataWithDates = parsedData.map(spouse => ({
              ...spouse,
              dobDate: spouse.dob ? new Date(spouse.dob) : undefined
            }));
            setSpouses(dataWithDates);
          } else {
            setSpouses([createNewSpouse(1)]);
          }
        } else {
          setSpouses([createNewSpouse(1)]);
        }
      } catch (error) {
        console.error("Error parsing spouse data:", error);
        setSpouses([createNewSpouse(1)]);
      }
    }
    isLocalUpdate.current = false;
  }, [value]);

  function createNewSpouse(id: number): SpouseData {
    return {
      id: `spouse-${id}`,
      name: '',
      dob: '',
      passportNumber: '',
      countryOfBirth: '',
      dobDate: undefined,
      isComingAlong: false
    };
  }

  const handleAddSpouse = () => {
    const newSpouse = createNewSpouse(spouses.length + 1);
    const updatedSpouses = [...spouses, newSpouse];
    setSpouses(updatedSpouses);
    setSelectedIndex(updatedSpouses.length - 1);
    updateParent(updatedSpouses);
  };

  const handleRemoveSpouse = (index: number) => {
    if (spouses.length <= 1) return;
    
    const updatedSpouses = spouses.filter((_, i) => i !== index);
    setSpouses(updatedSpouses);
    setSelectedIndex(Math.min(selectedIndex, updatedSpouses.length - 1));
    updateParent(updatedSpouses);
  };

  const handleSpouseChange = (index: number, field: keyof SpouseData, value: string | Date | boolean) => {
    const updatedSpouses = [...spouses];
    
    if (field === 'dobDate' && value instanceof Date) {
      // Format date as YYYY-MM-DD for storage
      const formattedDate = value.toISOString().split('T')[0];
      updatedSpouses[index] = { 
        ...updatedSpouses[index], 
        dob: formattedDate,
        dobDate: value 
      };
    } else if (typeof value === 'string') {
      updatedSpouses[index] = { ...updatedSpouses[index], [field]: value };
    } else if (typeof value === 'boolean') {
      updatedSpouses[index] = { ...updatedSpouses[index], [field]: value };
    }
    
    setSpouses(updatedSpouses);
    updateParent(updatedSpouses);
  };

  const updateParent = (updatedSpouses: SpouseData[]) => {
    isLocalUpdate.current = true;
    // Only send the necessary fields to parent
    const dataToSend = updatedSpouses.map(({ id, name, dob, passportNumber, countryOfBirth, isComingAlong }) => ({
      id,
      name,
      dob,
      passportNumber,
      countryOfBirth,
      isComingAlong
    }));
    onChange(JSON.stringify(dataToSend));
  };

  return (
    <div className="w-full">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex items-center overflow-x-auto whitespace-nowrap px-4 pt-4">
          {spouses.map((spouse, idx) => (
            <Tab key={spouse.id} as={Fragment}>
              {({ selected }) => (
                <button
                  className={`flex items-center space-x-2 rounded-lg border px-5 py-1 m-1 font-medium transition focus:outline-none focus:ring focus:ring-teal-500 focus:ring-opacity-25 active:border-teal-100 dark:active:border-teal-500 dark:active:border-opacity-25 dark:active:bg-teal-500 dark:active:bg-opacity-20 dark:active:text-teal-100 ${
                    selected
                      ? "border-teal-50 bg-teal-50 text-teal-600 dark:border-transparent dark:bg-teal-500 dark:bg-opacity-20 dark:text-teal-100"
                      : "border-transparent text-gray-600 hover:bg-teal-50 hover:text-teal-600 dark:text-gray-300 dark:hover:bg-teal-500 dark:hover:bg-opacity-20 dark:hover:text-teal-100"
                  }`}
                >
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {spouse.name ? spouse.name : `Spouse ${idx + 1}`}
                  </span>
                  {!readonly && spouses.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSpouse(idx);
                      }}
                      className="text-gray-400 hover:text-red-500 focus:outline-none"
                      aria-label="Remove spouse"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {spouses.map((spouse, index) => (
            <Tab.Panel
              key={spouse.id}
              className="space-y-4 p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Full Name
                  </label>
                  <Input
                    value={spouse.name}
                    onChange={(e) => handleSpouseChange(index, 'name', e.target.value)}
                    disabled={readonly}
                    placeholder="Spouse's full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Date of Birth
                  </label>
                  <DatePicker
                    value={spouse.dobDate}
                    onChange={(date) => handleSpouseChange(index, 'dobDate', date as Date)}
                    disabled={readonly}
                    disableFutureDates={true}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Passport Number
                  </label>
                  <Input
                    value={spouse.passportNumber}
                    onChange={(e) => handleSpouseChange(index, 'passportNumber', e.target.value)}
                    disabled={readonly}
                    placeholder="Passport number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Country of Birth
                  </label>
                  <Select
                    value={spouse.countryOfBirth}
                    onValueChange={(value) => handleSpouseChange(index, 'countryOfBirth', value)}
                    disabled={readonly}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 flex items-center justify-between">
                  <label className="text-sm font-medium leading-none">
                    Coming along?
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">No</span>
                    <button
                      type="button"
                      onClick={() => handleSpouseChange(index, 'isComingAlong', !spouse.isComingAlong)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                        spouse.isComingAlong ? 'bg-primary' : 'bg-muted-foreground/25'
                      }`}
                      disabled={readonly}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-background shadow-lg transition-transform ${
                          spouse.isComingAlong ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                    <span className="text-sm text-muted-foreground">Yes</span>
                  </div>
                </div>
              </div>
              
              
              {!readonly && spouses.length > 1 && (
                <div className="flex justify-end pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveSpouse(index)}
                    className="text-destructive hover:text-destructive/90"
                  >
                    Remove Spouse
                  </Button>
                </div>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      {!readonly && (
        <Button
          type="button"
          onClick={handleAddSpouse}
          disabled={spouses.length >= 2}
          className="h-8 gap-1 mt-4 bg-teal-600 hover:bg-teal-700 text-white"
        >
          <UserPlus className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Spouse
          </span>
        </Button>
      )}
    </div>
  );
}