"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Icon, Plus, Trash2 } from "lucide-react";
import GenericButton from "../buttons/genericButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRIES } from "@/lib/countries/constants/countries";
import Image from "next/image";
import { log } from "console";

interface IMultiCountryDropdownProps {
  handleChange: (val: string, save?: boolean) => void;
  value: string;

  readonly?: boolean;
}

export default function MultiCountryDropdown(
  props: IMultiCountryDropdownProps
) {
  const { handleChange, value, readonly } = props;
  const [countries, setCountries] = useState<string[]>([]);
  const updateTimeoutRef = useRef<any>(null);
  const isLocalUpdate = useRef(false);

  // Debounced update function to prevent too many form updates
  const debouncedUpdate = useCallback(
    (newCountries: string[]) => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      // Set the local update flag to prevent state resets from props
      isLocalUpdate.current = true;

      updateTimeoutRef.current = setTimeout(() => {
        handleChange(JSON.stringify(newCountries), true);
        updateTimeoutRef.current = null;
      }, 300); // 300ms debounce
    },
    [handleChange]
  );

  const handleDropdownChange = (val: string, index: number) => {
    // Set the local update flag
    isLocalUpdate.current = true;

    const newCountries = [...countries];
    newCountries[index] = val;
    setCountries(newCountries);
    debouncedUpdate(newCountries);
  };

  const addDropdown = () => {
    // Set the local update flag
    isLocalUpdate.current = true;

    const newCountries = [...countries, ""];
    setCountries(newCountries);
    debouncedUpdate(newCountries);
  };

  useEffect(() => {
    // Only update from props when we're not in the middle of a local update
    if (!isLocalUpdate.current) {
      try {
        if (value) {
          const parsedData = JSON.parse(value);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            setCountries(parsedData);
          } else {
            setCountries([""]);
          }
        } else {
          setCountries([""]);
        }
      } catch (e) {
        console.error("Failed to parse initial value:", e);
        setCountries([""]);
      }
    }
    // Reset the flag after the effect runs
    isLocalUpdate.current = false;
  }, [value]);

  const removeDropdown = (index: number) => {
    // Set the local update flag
    isLocalUpdate.current = true;

    const newCountries = countries.filter((_, i) => i !== index);
    if (newCountries.length === 0) {
      newCountries.push("");
    }
    setCountries(newCountries);
    debouncedUpdate(newCountries);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center border-b p-2">
        <h4 className="font-bold text-sm">Destination Countries</h4>
        {!readonly && (
          <div>
            <GenericButton onClick={addDropdown}>
              <Plus className="w-4 h-4 text-white" /> Add Country
            </GenericButton>
          </div>
        )}
      </div>
      <div className="grid gap-3 py-3 px-3">
        {countries.map((country, index) => (
          <div key={index} className="flex gap-2 items-center">
            <div className="w-full">
              <Select
                value={country}
                onValueChange={(value) => handleDropdownChange(value, index)}
                disabled={readonly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      <div className="flex items-center gap-2">
                        <span>{country.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {countries.length > 1 && !readonly && (
              <Trash2
                onClick={() => removeDropdown(index)}
                className="text-red-500 w-6 h-6 cursor-pointer"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
