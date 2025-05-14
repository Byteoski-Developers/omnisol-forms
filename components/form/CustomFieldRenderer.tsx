'use client';
import React from 'react';
import { FormField } from '@/types/form';
import SiblingsInputField from './SiblingsInputField';
import ParentsInputField from './ParentsInputField';
import CountriesInputField from './CountriesInputField';

interface CustomFieldRendererProps {
  field: FormField;
  value: any;
  onChange: (id: string, value: any) => void;
  error?: string;
  readonly?: boolean;
}

export const CustomFieldRenderer: React.FC<CustomFieldRendererProps> = ({
  field,
  value,
  onChange,
  error,
  readonly = false
}) => {
  // Handle different custom field types
  switch (field.type) {
    case 'siblingsInput':
      return (
        <SiblingsInputField
          id={field.id}
          label={field.label}
          value={value}
          onChange={onChange}
          error={error}
          required={field.required}
          readonly={readonly}
        />
      );
    
    case 'parentsInput':
      return (
        <ParentsInputField
          id={field.id}
          label={field.label}
          value={value}
          onChange={onChange}
          error={error}
          required={field.required}
          readonly={readonly}
        />
      );
      
    case 'countriesInput':
      return (
        <CountriesInputField
          id={field.id}
          label={field.label}
          value={value}
          onChange={onChange}
          error={error}
          required={field.required}
          readonly={readonly}
        />
      );
    
    // Add other custom field types here as needed
    
    default:
      // Return null for field types that should be handled by the default renderer
      return null;
  }
};

export default CustomFieldRenderer;
