'use client';
import { Fragment, useEffect, useState, useRef } from "react";
import { UserPlus } from "lucide-react";
import { Tab } from "@headlessui/react";
import { Sibling } from "./types";
import FamilyMember from "./familyMember";
import GenericButton from "../buttons/genericButton";
import { SIBLINGS } from "./relativesToVisit/constants";

interface ISiblingProps {
  onChange: (e: any, save?: boolean) => void;
  value: string;
  readonly?: boolean;
}

export default function SiblingTabs(props: ISiblingProps) {
  const { value, onChange, readonly } = props;
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [siblingsData, setSiblingsData] = useState<Sibling[]>([]);

  // Track if we're in the middle of a local update
  const isLocalUpdate = useRef(false);
  
  useEffect(() => {
    // Only update from props when we're not in the middle of a local update
    if (!isLocalUpdate.current) {
      try {
        if (value) {
          const parsedData = JSON.parse(value);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            setSiblingsData(parsedData);
          } else {
            setSiblingsData([createNewSibling(1)]);
          }
        } else {
          setSiblingsData([createNewSibling(1)]);
        }
      } catch (e) {
        console.error("Failed to parse initial value:", e);
        setSiblingsData([createNewSibling(1)]);
      }
    }
    // Reset the flag after the effect runs
    isLocalUpdate.current = false;
  }, [value]);

  function createNewSibling(id: number): Sibling {
    return {
      id,
      name: "",
      dateOfBirth: "",
      address: "",
      occupation: "",
      martialStatus: "",
      comingAlong: false,
      relation: "",
    };
  }

  function handleChange(updatedSibling: Sibling) {
    // Set the local update flag to prevent state resets
    isLocalUpdate.current = true;
    
    const newData = siblingsData.map((sibling) =>
      sibling.id === updatedSibling.id ? updatedSibling : sibling,
    );
    
    // Update local state first
    setSiblingsData(newData);
    
    // Then propagate change to parent
    onChange(JSON.stringify(newData), true);
  }

  function handleRemove(sibling: Sibling) {
    // Set the local update flag to prevent state resets
    isLocalUpdate.current = true;
    
    const newData = siblingsData.filter((s) => s.id !== sibling.id);
    if (newData.length === 0) {
      newData.push(createNewSibling(1));
    } else {
      newData.forEach((s, index) => {
        s.id = index + 1;
      });
    }
    
    // Update local state
    setSiblingsData(newData);
    
    // Propagate change to parent
    onChange(JSON.stringify(newData), true);
    
    // Update selected index
    const newSelectedIndex = Math.min(selectedIndex, newData.length - 1);
    setSelectedIndex(newSelectedIndex);
  }

  function handleSiblingAdd() {
    // Set the local update flag to prevent state resets
    isLocalUpdate.current = true;
    
    const newData = [
      ...siblingsData,
      createNewSibling(siblingsData.length + 1),
    ];
    
    // Update local state
    console.log("New data:", newData);
    setSiblingsData(newData);
    setSelectedIndex(siblingsData.length);
    
    // Propagate change to parent
    onChange(JSON.stringify(newData), true);
  }

  return (
    <div className="dark:text-gray-100 bg-white relative">
      {!readonly && (
        <div className="flex justify-between items-center border-b p-2">
          <h4 className="font-bold text-sm ">{"Siblings Information"}</h4>
          <div className="">
            <GenericButton onClick={handleSiblingAdd}>
              <UserPlus className="w-4 h-4 text-white" /> Add New
            </GenericButton>
          </div>
        </div>
      )}
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex items-center overflow-x-auto whitespace-nowrap px-4 pt-4">
          {siblingsData.map((s) => (
            <Tab key={s.id} as={Fragment}>
              {({ selected }) => (
                <button
                  className={`flex items-center space-x-2 rounded-lg border px-2 py-1 m-1 font-medium transition focus:outline-none focus:ring focus:ring-teal-500 focus:ring-opacity-25 active:border-teal-100 dark:active:border-teal-500 dark:active:border-opacity-25 md:px-5 ${
                    selected
                      ? "border-teal-50 bg-teal-50 text-teal-600 dark:border-transparent dark:bg-teal-500 dark:bg-opacity-20 dark:text-teal-100"
                      : "border-transparent text-gray-600 hover:bg-teal-50 hover:text-teal-600 dark:text-gray-300 dark:hover:bg-teal-500 dark:hover:bg-opacity-20 dark:hover:text-teal-100"
                  }`}
                >
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[80px]">
                  # {s.id} Sibling {s.name}
                  </span>
                  <span className="hidden sm:inline-block">{}</span>
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="px-2">
          {siblingsData.map((s) => (
            <Tab.Panel key={s.id}>
              <FamilyMember
                sibling={s}
                handleChange={handleChange}
                handleRemove={handleRemove}
                relationOptions={SIBLINGS}
                countryOfBirthRequired
                readonly={readonly}
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
