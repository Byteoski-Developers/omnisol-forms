import React, { useEffect, useState } from "react";
import { UserPlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { COUNTRIES } from "@/lib/countries/constants/countries";
import { DatePicker } from "@/components/ui/date-picker";

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
  visaStatus?: string;
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
  visaStatus: ""
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
            if (activeChild === null || !parsedValue.value.some((child: IChild) => child.id === activeChild)) {
              setActiveChild(parsedValue.value[0].id);
            }
          }
        } else if (parsedValue && typeof parsedValue === 'object') {
          if (Array.isArray(parsedValue)) {
            if (parsedValue.length === 0) {
              const initialChild = createEmptyChild(1);
              setChildren([initialChild]);
              setActiveChild(1);
            } else {
              setChildren(parsedValue);
              if (activeChild === null || !parsedValue.some((child: IChild) => child.id === activeChild)) {
                setActiveChild(parsedValue[0].id);
              }
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
  }, [inputValue, activeChild]);

  const handleAddChild = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newId = children.length > 0 ? Math.max(...children.map(c => c.id)) + 1 : 1;
    const newChild = createEmptyChild(newId);
    const newChildren = [...children, newChild];

    setChildren(newChildren);
    setActiveChild(newId);

    if (typeof inputValue === 'object' && inputValue !== null && 'value' in inputValue) {
      handleChange({ value: newChildren }, true);
    } else {
      handleChange(newChildren, true);
    }
  };

  const handleRemoveChild = (id: number) => {
    const newChildren = children.filter(child => child.id !== id);
    if (newChildren.length === 0) {
      const initialChild = createEmptyChild(1);
      setChildren([initialChild]);
      setActiveChild(1);
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
            <DatePicker
              value={activeChildData.dateOfBirth ? new Date(activeChildData.dateOfBirth) : undefined}
              onChange={(date) => handleFieldChange(activeChildData.id, "dateOfBirth", date ? date.toISOString().split('T')[0] : '')}
              disabled={readonly}
              disableFutureDates={true}
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
            <label className="text-sm font-medium">Activities</label>
            <Select
              value={activeChildData.activity}
              onValueChange={(value) => handleFieldChange(activeChildData.id, "activity", value)}
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

          {activeChildData.comingAlong === "yes" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Is the child applying along or already possesses a valid visa?
              </label>
              <Select
                value={activeChildData.visaStatus || ""}
                onValueChange={(value) =>
                  handleFieldChange(activeChildData.id, "visaStatus", value)
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
          )}
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
