import React, { useEffect, useState } from "react";
import { UserPlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DateOfBirthField from "@/components/form/DateOfBirthField";
import { Label } from "@/components/ui/label";

interface ITurkeyChildrenInputProps {
  handleChange: (val: any, save?: boolean) => void;
  inputValue: string | any;
  readonly?: boolean;
}

interface ITurkeyChild {
  id: number;
  name: string;
  dateOfBirth: string;
}

const createEmptyChild = (id: number): ITurkeyChild => ({
  id,
  name: "",
  dateOfBirth: "",
});

const TurkeyChildrenInputField = (props: ITurkeyChildrenInputProps) => {
  const { inputValue, handleChange, readonly = false } = props;
  const [children, setChildren] = useState<ITurkeyChild[]>([]);
  const [activeChild, setActiveChild] = useState<number | null>(null);

  useEffect(() => {
    if (inputValue) {
      try {
        const parsedValue = typeof inputValue === 'string'
          ? JSON.parse(inputValue)
          : inputValue;

        if (Array.isArray(parsedValue?.value)) {
          if (parsedValue.value.length === 0) {
            const initialChild: ITurkeyChild = createEmptyChild(1);
            setChildren([initialChild]);
            setActiveChild(1);
          } else {
            setChildren(parsedValue.value);
            if (activeChild === null || !parsedValue.value.some((child: ITurkeyChild) => child.id === activeChild)) {
              setActiveChild(parsedValue.value[0].id);
            }
          }
        } else if (parsedValue && typeof parsedValue === 'object') {
          if (Array.isArray(parsedValue)) {
            if (parsedValue.length === 0) {
              const initialChild: ITurkeyChild = createEmptyChild(1);
              setChildren([initialChild]);
              setActiveChild(1);
            } else {
              setChildren(parsedValue);
              if (activeChild === null || !parsedValue.some((child: ITurkeyChild) => child.id === activeChild)) {
                setActiveChild(parsedValue[0].id);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error parsing children input value:', error);
        // Create initial child if there's an error parsing
        const initialChild: ITurkeyChild = createEmptyChild(1);
        setChildren([initialChild]);
        setActiveChild(1);
      }
    } else {
      // Create initial child if no input value
      const initialChild: ITurkeyChild = createEmptyChild(1);
      setChildren([initialChild]);
      setActiveChild(1);
    }
  }, [inputValue]);

  useEffect(() => {
    if (!inputValue) {
      const initialChild: ITurkeyChild = createEmptyChild(1);
      setChildren([initialChild]);
      setActiveChild(1);
    }
  }, []);

  const handleAddChild = () => {
    const newId = children.length > 0 ? Math.max(...children.map(c => c.id)) + 1 : 1;
    const newChild = createEmptyChild(newId);
    setChildren([...children, newChild]);
    setActiveChild(newId);
  };

  const handleRemoveChild = (id: number) => {
    if (children.length > 1) {
      const updatedChildren = children.filter(child => child.id !== id);
      setChildren(updatedChildren);
      setActiveChild(updatedChildren[0].id);
      handleChange(updatedChildren);
    }
  };

  const handleChildChange = (id: number, field: keyof ITurkeyChild, value: string) => {
    const updatedChildren = children.map(child => 
      child.id === id ? { ...child, [field]: value } : child
    );
    setChildren(updatedChildren);
    handleChange(updatedChildren);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Children Information</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddChild}
          disabled={readonly}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add Child
        </Button>
      </div>

      {children.map((child) => (
        <div key={child.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-base font-medium">Child {child.id}</h4>
            {children.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveChild(child.id)}
                disabled={readonly}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor={`name-${child.id}`}>Name</Label>
              <Input
                id={`name-${child.id}`}
                value={child.name}
                onChange={(e) => handleChildChange(child.id, 'name', e.target.value)}
                disabled={readonly}
                placeholder="Enter child's name"
              />
            </div>

            <div>
              <Label htmlFor={`dateOfBirth-${child.id}`}>Date of Birth</Label>
              <DateOfBirthField
                field={{
                  id: `dateOfBirth-${child.id}`,
                  label: 'Date of Birth',
                  required: true
                }}
                value={child.dateOfBirth}
                onChange={(date) => handleChildChange(child.id, 'dateOfBirth', date)}
                disabled={readonly}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TurkeyChildrenInputField;
