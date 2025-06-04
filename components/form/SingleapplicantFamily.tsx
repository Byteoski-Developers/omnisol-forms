// components/form/ParentTabs.tsx
'use client';
import { Fragment, useState, useRef, useEffect } from "react";
import { UserPlus } from "lucide-react";
import { Tab } from "@headlessui/react";
import GenericButton from "../buttons/genericButton";

interface ParentTabsProps {
  onChange: (value: string) => void;
  value: string;
  readonly?: boolean;
}

interface ParentData {
  id: string;
  name: string;
  relationship: 'father' | 'mother';
  dob: string;
  passportNumber: string;
  isComing: boolean;
}

export default function ParentTabs({ value, onChange, readonly = false }: ParentTabsProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [parents, setParents] = useState<ParentData[]>([]);
  const isLocalUpdate = useRef(false);

  useEffect(() => {
    if (!isLocalUpdate.current) {
      try {
        if (value) {
          const parsedData = JSON.parse(value);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            setParents(parsedData);
          } else {
            setParents([createNewParent('father'), createNewParent('mother')]);
          }
        } else {
          setParents([createNewParent('father'), createNewParent('mother')]);
        }
      } catch (error) {
        console.error("Error parsing parent data:", error);
        setParents([createNewParent('father'), createNewParent('mother')]);
      }
    }
    isLocalUpdate.current = false;
  }, [value]);

  function createNewParent(relationship: 'father' | 'mother'): ParentData {
    return {
      id: `${relationship}-${Date.now()}`,
      name: '',
      relationship,
      dob: '',
      passportNumber: '',
      isComing: false
    };
  }

  const handleParentChange = (index: number, field: keyof ParentData, value: any) => {
    const updatedParents = [...parents];
    updatedParents[index] = { ...updatedParents[index], [field]: value };
    setParents(updatedParents);
    updateParent(updatedParents);
  };

  const updateParent = (updatedParents: ParentData[]) => {
    isLocalUpdate.current = true;
    onChange(JSON.stringify(updatedParents));
  };

  return (
    <div className="w-full">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <div className="flex items-center justify-between mb-4">
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            {parents.map((parent, index) => (
              <Tab key={parent.id} as={Fragment}>
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
                    {parent.relationship === 'father' ? 'Father' : 'Mother'}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
        </div>
        <Tab.Panels className="mt-2">
          {parents.map((parent, index) => (
            <Tab.Panel
              key={parent.id}
              className={`
                rounded-xl bg-white p-3
                ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none
              `}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{parent.relationship === 'father' ? "Father's" : "Mother's"} Name</label>
                    <input
                      type="text"
                      value={parent.name}
                      onChange={(e) => handleParentChange(index, 'name', e.target.value)}
                      disabled={readonly}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder={`${parent.relationship === 'father' ? "Father's" : "Mother's"} full name`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date of Birth</label>
                    <input
                      type="date"
                      value={parent.dob}
                      onChange={(e) => handleParentChange(index, 'dob', e.target.value)}
                      disabled={readonly}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Passport Number</label>
                    <input
                      type="text"
                      value={parent.passportNumber}
                      onChange={(e) => handleParentChange(index, 'passportNumber', e.target.value)}
                      disabled={readonly}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Passport number"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Coming with you?</label>
                    <select
                      value={parent.isComing ? 'yes' : 'no'}
                      onChange={(e) => handleParentChange(index, 'isComing', e.target.value === 'yes')}
                      disabled={readonly}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                </div>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}