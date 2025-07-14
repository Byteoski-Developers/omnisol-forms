"use client";
import React, { useState, useEffect, useRef } from "react";
import { Sibling } from "./types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { MARITAL_STATUS_OPTIONS } from "@/lib/countries/constants/form-labels";
import { COUNTRIES } from "@/lib/countries/constants/countries";
import { DateOfBirthField } from "./DateOfBirthField";

interface FamilyMemberProps {
  sibling: Sibling;
  handleChange: (updatedSibling: Sibling) => void;
  handleRemove: (sibling: Sibling) => void;
  relationOptions: { label: string; value: string }[];
  countryOfBirthRequired?: boolean;
  readonly?: boolean;
}

export default function FamilyMember({
  sibling,
  handleChange,
  handleRemove,
  relationOptions,
  countryOfBirthRequired = false,
  readonly = false,
}: FamilyMemberProps) {
  // Use state for rendering
  const [localSibling, setLocalSibling] = useState<Sibling>(sibling);

  // Use a ref to track if we're in the middle of a local update
  const isLocalUpdate = useRef(false);
  // Track the latest local changes
  const latestSiblingRef = useRef<Sibling>(sibling);

  // Only update from props when we're not in the middle of a local update
  useEffect(() => {
    if (!isLocalUpdate.current) {
      setLocalSibling(sibling);
      latestSiblingRef.current = sibling;
    }
    // Reset the flag after the effect runs
    isLocalUpdate.current = false;
  }, [sibling]);

  const handleInputChange = (field: keyof Sibling, value: any) => {
    // Set the local update flag
    isLocalUpdate.current = true;

    // Create updated sibling
    const updatedSibling = {
      ...latestSiblingRef.current,
      [field]: value,
    };

    // Update refs and state
    latestSiblingRef.current = updatedSibling;
    setLocalSibling(updatedSibling);

    // Propagate to parent
    handleChange(updatedSibling);
  };

  // Check if address field should be emphasized
  // For married siblings 
  const isMarried = localSibling.martialStatus === 'married';

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <Input
            value={localSibling.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            disabled={readonly}
            placeholder="Full name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Date of Birth</label>
          <DateOfBirthField
            value={localSibling.dateOfBirth}
            onChange={(date) => handleInputChange("dateOfBirth", date)}
            disabled={readonly}
            field={{
              id: `dob-${sibling.id}`,
              label: "Date of Birth",
              required: true,
            }}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Relationship</label>
          <Select
            value={localSibling.relation}
            onValueChange={(value) => handleInputChange("relation", value)}
            disabled={readonly}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select relationship" />
            </SelectTrigger>
            <SelectContent>
              {relationOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Marital Status</label>
          <Select
            value={localSibling.maritalStatus}
            onValueChange={(value) => handleInputChange("maritalStatus", value)}
            disabled={readonly}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select marital status" />
            </SelectTrigger>
            <SelectContent>
              {MARITAL_STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {countryOfBirthRequired && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Country of Birth</label>
            <Select
              value={localSibling.countryOfBirth}
              onValueChange={(value) =>
                handleInputChange("countryOfBirth", value)
              }
              disabled={readonly}
            >
              <SelectTrigger>
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
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Coming Along?</label>
          <Select
            value={localSibling.comingAlong ? "yes" : "no"}
            onValueChange={(value) =>
              handleInputChange("comingAlong", value === "yes")
            }
            disabled={readonly}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Occupation field */}
        {isMarried && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Occupation</label>
          <Input
            value={localSibling.occupation || ''}
            onChange={(e) => handleInputChange('occupation', e.target.value)}
            disabled={readonly}
            placeholder="Current occupation"
          />
        </div>
         )}

        {/* Current Address field - only shown for married siblings */}
        {isMarried && (
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">
              Current Address
            </label>
            <Input
              value={localSibling.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              disabled={readonly}
              placeholder="Current address"
              className="border-primary focus:border-primary"
            />
          </div>
        )}
      </div>

      {!readonly && (
        <div className="flex justify-end">
          <Button
            variant="destructive"
            onClick={() => handleRemove(localSibling)}
            type="button"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Remove
          </Button>
        </div>
      )}
    </div>
  );
}
