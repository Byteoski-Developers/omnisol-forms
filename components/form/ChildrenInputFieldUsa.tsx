import React, { useEffect, useState } from "react";
import { UserPlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IChildrenInputUSAProps {
  handleChange: (val: any, save?: boolean) => void;
  inputValue: string | any;
  readonly?: boolean;
}

interface IChildUSA {
  id: number;
  name: string;
  relationship: string;
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

const COMING_ALONG_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" }
];

const createEmptyChild = (id: number): IChildUSA => ({
  id,
  name: "",
  relationship: "",
  comingAlong: "no",
  visaStatus: ""
});

const ChildrenInputFieldUSA = (props: IChildrenInputUSAProps) => {
  const { inputValue, handleChange, readonly = false } = props;
  const [children, setChildren] = useState<IChildUSA[]>([]);
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
            if (activeChild === null || !parsedValue.value.some((child: IChildUSA) => child.id === activeChild)) {
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
              if (activeChild === null || !parsedValue.some((child: IChildUSA) => child.id === activeChild)) {
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
    field: keyof IChildUSA,
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
        <div>
          <h3 className="text-lg font-medium">Children Information</h3>
          {/* <p className="text-sm text-gray-600 mt-1">
            Only for children traveling along (co-travelers)
          </p> */}
        </div>
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
            className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              value={activeChildData.name}
              onChange={(e) => handleFieldChange(activeChildData.id, "name", e.target.value)}
              placeholder="Enter child's full name"
              disabled={readonly}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Relationship <span className="text-red-500">*</span>
            </label>
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
            <label className="text-sm font-medium">
              Coming Along? <span className="text-red-500">*</span>
            </label>
            <Select
              value={activeChildData.comingAlong}
              onValueChange={(value) => handleFieldChange(activeChildData.id, "comingAlong", value)}
              disabled={readonly}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
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

      {activeChildData && activeChildData.comingAlong === "yes" && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Is the child applying along or already possesses a valid visa? <span className="text-red-500">*</span>
            </label>
            <Select
              value={activeChildData.visaStatus || ""}
              onValueChange={(value) =>
                handleFieldChange(activeChildData.id, "visaStatus", value)
              }
              disabled={readonly}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select visa status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applying_along">Applying Along</SelectItem>
                <SelectItem value="has_visa">Already Has Valid Visa</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
            Remove Child
          </Button>
        </div>
      )}

      {/* <div className="mt-4 p-3 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> For USA visa applications, only basic information (name, relationship, and travel status) 
          is required for children. Only children who are "Coming Along" need to be included as co-travelers. 
          Additional details like address, date of birth, activities, etc. are not required.
        </p>
      </div> */}
    </div>
  );
};

export default ChildrenInputFieldUSA;