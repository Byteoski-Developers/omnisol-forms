import React, { useEffect, useState } from "react";
import { UserPlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { COUNTRIES } from "@/lib/countries/constants/countries";
import { DateOfBirthField } from "./DateOfBirthField";

interface IChildrenInputProps {
  handleChange: (val: any, save?: boolean) => void;
  inputValue: string | any;
  readonly?: boolean;
}

interface IChild {
  id: number;
  name: string;
  dateOfBirth: string;
  relationship: string;
  activity: string;
  address: string;
  countryOfBirth: string;
  comingAlong: string;
  isDeceased: string;
  dateOfDeath?: string;
  placeOfDeath?: string;
  maritalStatus: string;
  [key: string]: any;
}

const RELATIONSHIP_OPTIONS = [
  { value: "son", label: "Son" },
  { value: "daughter", label: "Daughter" },
  { value: "step_son", label: "Step Son" },
  { value: "step_daughter", label: "Step Daughter" },
  { value: "adopted_son", label: "Adopted Son" },
  { value: "adopted_daughter", label: "Adopted Daughter" }
];

const CHILD_ACTIVITY_OPTIONS = [
  { value: "study", label: "Studying" },
  { value: "employed", label: "Employed" },
  { value: "farming", label: "Farming" },
  { value: "unemployed", label: "Unemployed" },
  { value: "doctor", label: "Doctor" }
];

const MARITAL_STATUS_OPTIONS = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
  { value: "separated", label: "Separated" }
];

const COMING_ALONG_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" }
];

const createEmptyChild = (id: number): IChild => ({
  id,
  name: "",
  dateOfBirth: "",
  relationship: "",
  activity: "",
  address: "",
  countryOfBirth: "",
  comingAlong: "no",
  isDeceased: "no",
  dateOfDeath: "",
  placeOfDeath: "",
  maritalStatus: ""
});

const ChildrenInputField = (props: IChildrenInputProps) => {
  const { inputValue, handleChange, readonly = false } = props;
  const [children, setChildren] = useState<IChild[]>([]);
  const [activeChild, setActiveChild] = useState<number | null>(null);

  // Log state changes
  useEffect(() => {
    console.log('Children updated:', children);
    console.log('Active child:', activeChild);
  }, [children, activeChild]);

  useEffect(() => {
    try {
      console.log('Initial inputValue:', inputValue);
      let parsedChildren: IChild[] = [];

      // Handle different input value formats
      if (inputValue) {
        if (typeof inputValue === 'string') {
          // Handle string input (JSON)
          try {
            const parsed = JSON.parse(inputValue);
            parsedChildren = Array.isArray(parsed) ? parsed : parsed?.value || [];
          } catch (e) {
            console.error("Error parsing inputValue as JSON:", e);
          }
        } else if (Array.isArray(inputValue)) {
          // Handle direct array input
          parsedChildren = inputValue;
        } else if (inputValue && typeof inputValue === 'object' && 'value' in inputValue) {
          // Handle { value: [...] } format
          parsedChildren = Array.isArray(inputValue.value) ? inputValue.value : [];
        }
      }

      // Ensure we have at least one child
      if (parsedChildren.length === 0) {
        const initialChild = createEmptyChild(Date.now());
        console.log('No children found, creating initial child:', initialChild);
        setChildren([initialChild]);
        setActiveChild(initialChild.id);
        handleChange({ value: [initialChild] }, false);
      } else {
        // Ensure all children have required fields and proper IDs
        const validatedChildren = parsedChildren.map((child, index) => {
          const newId = child.id || Date.now() + index;
          console.log(`Validating child ${index}:`, { original: child, newId });
          return {
            ...createEmptyChild(newId),
            ...child,
            id: newId // Ensure ID exists
          };
        });

        console.log('Validated children:', validatedChildren);
        setChildren(validatedChildren);
        const newActiveChild = validatedChildren[0]?.id || Date.now();
        console.log('Setting active child:', newActiveChild);
        setActiveChild(newActiveChild);

        // Only update parent if the value has changed
        if (JSON.stringify(validatedChildren) !== JSON.stringify(children)) {
          handleChange({ value: validatedChildren }, false);
        }
      }
    } catch (e) {
      console.error("Error processing children data:", e);
      const initialChild = createEmptyChild(Date.now());
      setChildren([initialChild]);
      setActiveChild(initialChild.id);
      handleChange({ value: [initialChild] }, false);
    }
  }, [inputValue]);

  const handleAddChild = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newId = Date.now();
    const newChild = createEmptyChild(newId);
    const newChildren = [...children, newChild];

    console.log('Adding new child:', newChild);
    console.log('All children after add:', newChildren);

    setChildren(newChildren);
    setActiveChild(newId);

    // Always use the same structure for consistency
    handleChange({ value: newChildren }, true);
  };

  const handleRemoveChild = (id: number) => {
    console.log('Removing child with ID:', id);
    const newChildren = children.filter(child => child.id !== id);
    console.log('Remaining children after removal:', newChildren);

    if (newChildren.length === 0) {
      const initialChild = createEmptyChild(Date.now());
      console.log('No children left, creating initial child');
      setChildren([initialChild]);
      setActiveChild(initialChild.id);
      handleChange({ value: [initialChild] }, true);
    } else {
      const renumberedChildren = newChildren.map((child, index) => ({
        ...child,
        id: index + 1
      }));

      setChildren(renumberedChildren);
      setActiveChild(renumberedChildren[0].id);

      handleChange({ value: renumberedChildren }, true);
    }
  };

  const handleChildChange = (id: number, field: keyof IChild, value: any) => {
    console.log(`Field ${field} changed to:`, value);

    const updatedChildren = children.map(child =>
      child.id === id ? { ...child, [field]: value } : child
    );

    console.log('Updated child data:', updatedChildren);
    setChildren(updatedChildren);

    // Always use the same structure for consistency
    handleChange({ value: updatedChildren }, true);
  };

  const activeChildData = children.find(child => child.id === activeChild) || children[0];

  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Children Information</h3>
        {!readonly && (
          <Button
            type="button"
            variant="default"
            onClick={handleAddChild}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Child
          </Button>
        )}
      </div>

      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        {children.map((child) => (
          <button
            key={child.id}
            type="button"
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeChild === child.id
                ? "bg-teal-50 text-teal-700 border border-teal-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveChild(child.id);
            }}
          >
            #{child.id} {child.name || "Child..."}
          </button>
        ))}
      </div>

      {activeChildData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              value={activeChildData.name}
              onChange={(e) => handleChildChange(activeChildData.id, "name", e.target.value)}
              placeholder="Full name"
              disabled={readonly}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date of Birth</label>
            <DateOfBirthField
              field={{
                id: `dob-${activeChildData.id}`,
                label: 'Date of Birth',
                required: true
              }}
              value={activeChildData.dateOfBirth || ''}
              onChange={(date) => handleChildChange(activeChildData.id, "dateOfBirth", date)}
              disabled={readonly}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Relationship</label>
            <Select
              value={activeChildData.relationship}
              onValueChange={(value) => handleChildChange(activeChildData.id, "relationship", value)}
              disabled={readonly}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                {RELATIONSHIP_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Activities</label>
            <Select
              value={activeChildData.activity}
              onValueChange={(value) => handleChildChange(activeChildData.id, "activity", value)}
              disabled={readonly}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Activities" />
              </SelectTrigger>
              <SelectContent>
                {CHILD_ACTIVITY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Current Address</label>
            <Input
              value={activeChildData.address}
              onChange={(e) => handleChildChange(activeChildData.id, "address", e.target.value)}
              placeholder="Current address"
              disabled={readonly}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Country of Birth</label>
            <Select
              value={activeChildData.countryOfBirth}
              onValueChange={(value) => handleChildChange(activeChildData.id, "countryOfBirth", value)}
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Coming Along?</label>
            <Select
              value={activeChildData.comingAlong}
              onValueChange={(value) => handleChildChange(activeChildData.id, "comingAlong", value)}
              disabled={readonly}
            >
              <SelectTrigger>
                <SelectValue placeholder="No" />
              </SelectTrigger>
              <SelectContent>
                {COMING_ALONG_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Is child deceased?</label>
            <Select
              value={activeChildData.isDeceased}
              onValueChange={(value) => handleChildChange(activeChildData.id, "isDeceased", value)}
              disabled={readonly}
            >
              <SelectTrigger>
                <SelectValue placeholder="No" />
              </SelectTrigger>
              <SelectContent>
                {COMING_ALONG_OPTIONS.map((option) => (
                  <SelectItem key={`deceased-${option.value}`} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {activeChildData.isDeceased === "yes" && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date of Death</label>
                <DateOfBirthField
                  field={{
                    id: `dateOfDeath-${activeChildData.id}`,
                    label: 'Date of Death',
                    required: false
                  }}
                  value={activeChildData.dateOfDeath || ''}
                  onChange={(date) => handleChildChange(activeChildData.id, "dateOfDeath", date)}
                  disabled={readonly}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Place of Death</label>
                <Input
                  value={activeChildData.placeOfDeath || ""}
                  onChange={(e) => handleChildChange(activeChildData.id, "placeOfDeath", e.target.value)}
                  placeholder="City, Country"
                  disabled={readonly}
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Marital Status</label>
            <Select
              value={activeChildData.maritalStatus}
              onValueChange={(value) => handleChildChange(activeChildData.id, "maritalStatus", value)}
              disabled={readonly}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
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

          {/* {activeChildData.comingAlong === "yes" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Is the child applying along or already possesses a valid visa?
              </label>
              <Select
                value={activeChildData.visaStatus || ""}
                onValueChange={(value) =>
                  handleChildChange(activeChildData.id, "visaStatus", value)
                }
                disabled={readonly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="applying_along">Applying Along</SelectItem>
                  <SelectItem value="has_visa">Already Has Valid Visa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )} */}
        </div>
      )}

      {children.length > 1 && !readonly && activeChildData && (
        <div className="mt-4 flex justify-end">
          <Button
            type="button"
            variant="destructive"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleRemoveChild(activeChildData.id);
            }}
            size="sm"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChildrenInputField;
