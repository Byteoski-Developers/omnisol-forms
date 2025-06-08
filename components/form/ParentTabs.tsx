'use client';
import { Fragment, useEffect, useState, useRef } from "react";
import { UserPlus } from "lucide-react";
import { Tab } from "@headlessui/react";
import { Sibling } from "./types";
import FamilyMember from "./familyMember";
import GenericButton from "../buttons/genericButton";

const PARENTS = [
  { label: 'Father', value: 'father' },
  { label: 'Mother', value: 'mother' },
  { label: 'Step-Father', value: 'step-father' },
  { label: 'Step-Mother', value: 'step-mother' },
  { label: 'Guardian', value: 'guardian' }
];

interface IParentProps {
  onChange: (e: any, save?: boolean) => void;
  value: string;
  readonly?: boolean;
}

export default function ParentTabs(props: IParentProps) {
  const { value, onChange, readonly } = props;
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [parentsData, setParentsData] = useState<Sibling[]>([]);

  // Track if we're in the middle of a local update
  const isLocalUpdate = useRef(false);
  
  useEffect(() => {
    // Only update from props when we're not in the middle of a local update
    if (!isLocalUpdate.current) {
      try {
        if (value) {
          const parsedData = JSON.parse(value);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            setParentsData(parsedData);
          } else {
            setParentsData([createNewParent(1)]);
          }
        } else {
          setParentsData([createNewParent(1)]);
        }
      } catch (e) {
        console.error("Failed to parse initial value:", e);
        setParentsData([createNewParent(1)]);
      }
    }
    // Reset the flag after the effect runs
    isLocalUpdate.current = false;
  }, [value]);

  function createNewParent(id: number): Sibling {
    return {
      id,
      name: "",
      dateOfBirth: "",
    //   address: "",
    //   occupation: "",
      martialStatus: "",
      comingAlong: false,
      relation: "",
      countryOfBirth: "",
    };
  }

  function handleChange(updatedParent: Sibling) {
    // Set the local update flag to prevent state resets
    isLocalUpdate.current = true;
    
    const newData = parentsData.map((parent) =>
      parent.id === updatedParent.id ? updatedParent : parent,
    );
    
    // Update local state first
    setParentsData(newData);
    
    // Then propagate change to parent
    onChange(JSON.stringify(newData), true);
  }

  function handleRemove(parent: Sibling) {
    // Set the local update flag to prevent state resets
    isLocalUpdate.current = true;
    
    const newData = parentsData.filter((p) => p.id !== parent.id);
    if (newData.length === 0) {
      newData.push(createNewParent(1));
    } else {
      newData.forEach((p, index) => {
        p.id = index + 1;
      });
    }
    
    // Update local state
    setParentsData(newData);
    
    // Propagate change to parent
    onChange(JSON.stringify(newData), true);
    
    // Update selected index
    const newSelectedIndex = Math.min(selectedIndex, newData.length - 1);
    setSelectedIndex(newSelectedIndex);
  }

  function handleParentAdd() {
    // Set the local update flag to prevent state resets
    isLocalUpdate.current = true;
    
    // Limit to 2 parents maximum
    if (parentsData.length >= 2) {
      return;
    }
    
    const newData = [
      ...parentsData,
      createNewParent(parentsData.length + 1),
    ];
    
    // Update local state
    setParentsData(newData);
    setSelectedIndex(parentsData.length);
    
    // Propagate change to parent
    onChange(JSON.stringify(newData), true);
  }

  return (
    <div className="dark:text-gray-100 bg-white relative">
      {!readonly && (
        <div className="flex justify-between items-center border-b p-2">
          <h4 className="font-bold text-sm ">{"Parent Information"}</h4>
          {parentsData.length < 2 && (
            <div className="">
              <GenericButton onClick={handleParentAdd}>
                <UserPlus className="w-4 h-4 text-white" /> Add Parent
              </GenericButton>
            </div>
          )}
        </div>
      )}
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex items-center overflow-x-auto whitespace-nowrap px-4 pt-4">
          {parentsData.map((p) => (
            <Tab key={p.id} as={Fragment}>
              {({ selected }) => (
                <button
                  className={`flex items-center space-x-2 rounded-lg border px-2 py-1 m-1 font-medium transition focus:outline-none focus:ring focus:ring-teal-500 focus:ring-opacity-25 active:border-teal-100 dark:active:border-teal-500 dark:active:border-opacity-25 md:px-5 ${
                    selected
                      ? "border-teal-50 bg-teal-50 text-teal-600 dark:border-transparent dark:bg-teal-500 dark:bg-opacity-20 dark:text-teal-100"
                      : "border-transparent text-gray-600 hover:bg-teal-50 hover:text-teal-600 dark:text-gray-300 dark:hover:bg-teal-500 dark:hover:bg-opacity-20 dark:hover:text-teal-100"
                  }`}
                >
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[80px]">
                    #{p.id} {p.name || `Parent ${p.id}`}
                  </span>
                  <span className="hidden sm:inline-block">{}</span>
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="px-2">
          {parentsData.map((p) => (
            <Tab.Panel key={p.id}>
              <FamilyMember
                sibling={p}
                handleChange={handleChange}
                handleRemove={handleRemove}
                relationOptions={PARENTS}
                countryOfBirthRequired={true}
                readonly={readonly}
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
