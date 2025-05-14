'use client';
import React from 'react';
import { FormField } from '@/types/form';
import CustomFieldRenderer from './CustomFieldRenderer';

interface FormFieldWrapperProps {
  field: FormField;
  value: any;
  onChange: (id: string, value: any) => void;
  error?: string;
  readonly?: boolean;
}

/**
 * FormFieldWrapper is a component that wraps the default form field renderer
 * and the custom field renderer. It checks if the field type is a custom type
 * and renders the appropriate component.
 */
export const FormFieldWrapper: React.FC<FormFieldWrapperProps> = (props) => {
  const { field } = props;
  
  // Check if the field type is a custom type that needs special rendering
  const customTypes = ['siblingsInput', 'parentsInput', 'countriesInput'];
  
  if (customTypes.includes(field.type)) {
    return <CustomFieldRenderer {...props} />;
  }
  
  // If not a custom type, return null to let the default renderer handle it
  return null;
};

export default FormFieldWrapper;
