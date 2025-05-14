import { useState } from "react";
import { Relative, RelativeSubclass } from "./types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { COUNTRIES } from "@/lib/countries/constants/countries";
import { IMMIGRATION_STATUS_OPTIONS, RELATION_OPTIONS } from "@/lib/countries/constants/form-labels";

interface RelativeDetailProps {
  relative: Relative;
  handleChange: (relative: Relative) => void;
  relativeSubclass: RelativeSubclass;
}

export default function RelativeDetail({
  relative,
  handleChange,
  relativeSubclass,
}: RelativeDetailProps) {
  const [formData, setFormData] = useState<Relative>(relative);

  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    handleChange(updatedData);
  };

  return (
    <div className="space-y-4 mt-4 p-4 border rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Relation with relative */}
        <div className="space-y-2">
          <Label htmlFor={`relation-${relative.id}`}>Relation</Label>
          <Select
            value={formData.relationWithRelative || ""}
            onValueChange={(value) => handleInputChange("relationWithRelative", value)}
          >
            <SelectTrigger id={`relation-${relative.id}`}>
              <SelectValue placeholder="Select relation" />
            </SelectTrigger>
            <SelectContent>
              {RELATION_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Name of relative */}
        <div className="space-y-2">
          <Label htmlFor={`name-${relative.id}`}>Full Name</Label>
          <Input
            id={`name-${relative.id}`}
            value={formData.nameOfRelative || ""}
            onChange={(e) => handleInputChange("nameOfRelative", e.target.value)}
            placeholder="Enter full name"
          />
        </div>

        {/* Residence of relative */}
        <div className="space-y-2">
          <Label htmlFor={`residence-${relative.id}`}>Country of Residence</Label>
          <Select
            value={formData.residenceOfRelative || ""}
            onValueChange={(value) => handleInputChange("residenceOfRelative", value)}
          >
            <SelectTrigger id={`residence-${relative.id}`}>
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

        {/* Immigration status */}
        <div className="space-y-2">
          <Label htmlFor={`immigration-${relative.id}`}>Immigration Status</Label>
          <Select
            value={formData.immigrationStatusOfRelative || ""}
            onValueChange={(value) => handleInputChange("immigrationStatusOfRelative", value)}
          >
            <SelectTrigger id={`immigration-${relative.id}`}>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {IMMIGRATION_STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Contact number */}
        <div className="space-y-2">
          <Label htmlFor={`contact-${relative.id}`}>Contact Number</Label>
          <Input
            id={`contact-${relative.id}`}
            value={formData.contactNumberOfRelative || ""}
            onChange={(e) => handleInputChange("contactNumberOfRelative", e.target.value)}
            placeholder="Enter contact number"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor={`email-${relative.id}`}>Email</Label>
          <Input
            id={`email-${relative.id}`}
            type="email"
            value={formData.emailOfRelative || ""}
            onChange={(e) => handleInputChange("emailOfRelative", e.target.value)}
            placeholder="Enter email address"
          />
        </div>
      </div>
    </div>
  );
}
