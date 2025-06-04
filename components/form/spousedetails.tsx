// components/form/SpouseTabs.tsx
'use client';
import { Fragment, useState, useRef, useEffect } from "react";
import { UserPlus } from "lucide-react";
import { Tab } from "@headlessui/react";
import GenericButton from "../buttons/genericButton";

interface SpouseTabsProps {
  onChange: (value: string) => void;
  value: string;
  readonly?: boolean;
}

interface SpouseData {
  id: string;
  name: string;
  dob: string;
  passportNumber: string;
  countryOfBirth: string;
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
            setSpouses(parsedData);
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
      countryOfBirth: ''
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

  const handleSpouseChange = (index: number, field: keyof SpouseData, value: string) => {
    const updatedSpouses = [...spouses];
    updatedSpouses[index] = { ...updatedSpouses[index], [field]: value };
    setSpouses(updatedSpouses);
    updateParent(updatedSpouses);
  };

  const updateParent = (updatedSpouses: SpouseData[]) => {
    isLocalUpdate.current = true;
    onChange(JSON.stringify(updatedSpouses));
  };

  return (
    <div className="w-full">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <div className="flex items-center justify-between mb-4">
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            {spouses.map((spouse, index) => (
              <Tab key={spouse.id} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`
                      w-full rounded-lg py-2.5 text-sm font-medium leading-5
                      ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none
                      ${selected
                        ? 'bg-white text-blue-700 shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                      } px-3
                    `}
                  >
                    Spouse {index + 1}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          {!readonly && (
            <GenericButton
              type="button"
              onClick={handleAddSpouse}
              disabled={spouses.length >= 2} // Typically only one spouse, but allowing up to 2
            >
              <UserPlus className="w-4 h-4 mr-2" /> Add
            </GenericButton>
          )}
        </div>
        <Tab.Panels className="mt-2">
          {spouses.map((spouse, index) => (
            <Tab.Panel
              key={spouse.id}
              className={`
                rounded-xl bg-white p-3
                ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none
              `}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input
                      type="text"
                      value={spouse.name}
                      onChange={(e) => handleSpouseChange(index, 'name', e.target.value)}
                      disabled={readonly}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Spouse's full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date of Birth</label>
                    <input
                      type="date"
                      value={spouse.dob}
                      onChange={(e) => handleSpouseChange(index, 'dob', e.target.value)}
                      disabled={readonly}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Passport Number</label>
                    <input
                      type="text"
                      value={spouse.passportNumber}
                      onChange={(e) => handleSpouseChange(index, 'passportNumber', e.target.value)}
                      disabled={readonly}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Passport number"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Country of Birth</label>
                    <select
                      value={spouse.countryOfBirth}
                      onChange={(e) => handleSpouseChange(index, 'countryOfBirth', e.target.value)}
                      disabled={readonly}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Select country</option>
                      {/* You can map through COUNTRIES here if needed */}
                    </select>
                  </div>
                </div>
                {!readonly && spouses.length > 1 && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemoveSpouse(index)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove Spouse
                    </button>
                  </div>
                )}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}