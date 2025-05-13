"use client";
import React, { ReactNode } from "react";

// Define the types needed for the country transformations
export interface SelectWithSearchOption {
  title: string;
  value: string;
  [key: string]: any;
}

/**
 * Transforms a country value for display in the select input
 */
export const transformCountryValue = (value: SelectWithSearchOption): ReactNode => {
  return value.title || "Select a country";
};

/**
 * Transforms country options for display in the dropdown list
 */
export const transformCountryOptions = (
  value: SelectWithSearchOption,
  selectedValue?: SelectWithSearchOption
): ReactNode => {
  const isSelected = selectedValue?.value === value.value;
  
  return (
    <>
      <span className={isSelected ? "font-semibold" : "font-normal"}>
        {value.title}
      </span>
      {isSelected && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-teal-600">
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
    </>
  );
};
