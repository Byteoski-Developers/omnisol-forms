import React, { useEffect, useState } from "react";
import { UserPlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { COUNTRIES } from "@/lib/countries/constants/countries";

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
  education: string;
  address: string;
  countryOfBirth: string;
  comingAlong: string;
}

const RELATIONSHIP_OPTIONS = [
  { value: "son", label: "Son" },
  { value: "daughter", label: "Daughter" },
  { value: "step_son", label: "Step Son" },
  { value: "step_daughter", label: "Step Daughter" },
  { value: "adopted_son", label: "Adopted Son" },
  { value: "adopted_daughter", label: "Adopted Daughter" }
];

const EDUCATION_OPTIONS = [
  { value: "pre_school", label: "Pre-school" },
  { value: "primary", label: "Primary School" },
  { value: "secondary", label: "Secondary School" },
  { value: "high_school", label: "High School" },
  { value: "college", label: "College" },
  { value: "university", label: "University" },
  { value: "not_applicable", label: "Not Applicable" }
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
  education: "",
  address: "",
  countryOfBirth: "",
  comingAlong: "no"
});

const ChildrenInputField = (props: IChildrenInputProps) => {
  const { inputValue, handleChange, readonly = false } = props;
  const [children, setChildren] = useState<IChild[]>([]);
  const [activeChild, setActiveChild] = useState<number | null>(null);

  useEffect(() => {
    if (inputValue) {
      try {
        const parsedValue = typeof inputValue === 'string'
          ? JSON.parse(inputValue)
          : inputValue;
        
        if (Array.isArray(parsedValue?.value)) {
          if (parsedValue.value.length === 0) {
            const initialChild = createEmptyChild(1);
            setChildren([initialChild]);
            setActiveChild(1);
          } else {
            setChildren(parsedValue.value);
            setActiveChild(parsedValue.value[0].id);
          }
        } else if (parsedValue && typeof parsedValue === 'object') {
          if (Array.isArray(parsedValue)) {
            if (parsedValue.length === 0) {
              const initialChild = createEmptyChild(1);
              setChildren([initialChild]);
              setActiveChild(1);
            } else {
              setChildren(parsedValue);
              setActiveChild(parsedValue[0].id);
            }
          } else {
            const initialChild = createEmptyChild(1);
            setChildren([initialChild]);
            setActiveChild(1);
          }
        } else {
          const initialChild = createEmptyChild(1);
          setChildren([initialChild]);
          setActiveChild(1);
        }
      } catch (e) {
        console.error("Failed to parse inputValue", e);
        const initialChild = createEmptyChild(1);
        setChildren([initialChild]);
        setActiveChild(1);
      }
    } else {
      const initialChild = createEmptyChild(1);
      setChildren([initialChild]);
      setActiveChild(1);
    }
  }, [inputValue]);

  const handleAddChild = (e: React.MouseEvent) => {
    // Prevent any default form submission behavior
    e.preventDefault();
    e.stopPropagation();
    
    const newId = children.length > 0 ? Math.max(...children.map(c => c.id)) + 1 : 1;
    const newChild = createEmptyChild(newId);
    const newChildren = [...children, newChild];
    
    // Update local state
    setChildren(newChildren);
    setActiveChild(newId);
    
    // Pass the updated data back to the parent component
    // Make sure we're using the correct format expected by the parent
    if (typeof inputValue === 'object' && inputValue !== null && 'value' in inputValue) {
      // If inputValue is already in {value: [...]} format
      handleChange({ value: newChildren }, true);
    } else {
      // If inputValue is expected to be the array directly
      handleChange(newChildren, true);
    }
    
    console.log("Added new child:", newChild);
    console.log("Updated children array:", newChildren);
  };

  const handleRemoveChild = (id: number) => {
    const newChildren = children.filter(child => child.id !== id);
    if (newChildren.length === 0) {
      const initialChild = createEmptyChild(1);
      setChildren([initialChild]);
      setActiveChild(1);
      handleChange({ value: [initialChild] }, true);
    } else {
      setChildren(newChildren);
      setActiveChild(newChildren[0].id);
      handleChange({ value: newChildren }, true);
    }
  };

  const handleFieldChange = (
    id: number,
    field: keyof IChild,
    value: string
  ) => {
    const newChildren = children.map(child => {
      if (child.id === id) {
        return {
          ...child,
          [field]: value
        };
      }
      return child;
    });
    setChildren(newChildren);
    handleChange({ value: newChildren });
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

      {/* Child tabs */}
      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        {children.map((child) => (
          <button
            key={child.id}
            type="button"
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeChild === child.id 
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

      {/* Active child form */}
      {activeChildData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              value={activeChildData.name}
              onChange={(e) => handleFieldChange(activeChildData.id, "name", e.target.value)}
              placeholder="Full name"
              disabled={readonly}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date of Birth</label>
            <Input
              type="date"
              value={activeChildData.dateOfBirth}
              onChange={(e) => handleFieldChange(activeChildData.id, "dateOfBirth", e.target.value)}
              disabled={readonly}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Relationship</label>
            <Select
              value={activeChildData.relationship}
              onValueChange={(value) => handleFieldChange(activeChildData.id, "relationship", value)}
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
            <label className="text-sm font-medium">Education</label>
            <Select
              value={activeChildData.education}
              onValueChange={(value) => handleFieldChange(activeChildData.id, "education", value)}
              disabled={readonly}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select education" />
              </SelectTrigger>
              <SelectContent>
                {EDUCATION_OPTIONS.map((option) => (
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
              onChange={(e) => handleFieldChange(activeChildData.id, "address", e.target.value)}
              placeholder="Current address"
              disabled={readonly}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Country of Birth</label>
            <Select
              value={activeChildData.countryOfBirth}
              onValueChange={(value) => handleFieldChange(activeChildData.id, "countryOfBirth", value)}
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
              onValueChange={(value) => handleFieldChange(activeChildData.id, "comingAlong", value)}
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
        </div>
      )}

      {/* Remove button */}
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
