'use client';
import React from 'react';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import SiblingTabs from './SiblingTabs';

interface SiblingsInputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (id: string, value: any) => void;
  error?: string;
  required?: boolean;
  readonly?: boolean;
}

export const SiblingsInputField: React.FC<SiblingsInputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  readonly = false
}) => {
  const handleChange = (newValue: any, save?: boolean) => {
    onChange(id, newValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <SiblingTabs
        value={value || '[]'}
        onChange={handleChange}
        readonly={readonly}
      />
      {error && (
        <div className="flex items-center gap-2 text-destructive mt-2">
          <AlertCircle className="h-4 w-4" />
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default SiblingsInputField;
