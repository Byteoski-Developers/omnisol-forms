import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectMenuProps {
  options: Option[];
  selected: Option | undefined;
  setSelected: (option: Option) => void;
  placeholder: string;
  label: string;
  disabled?: boolean;
}

const SelectMenu: React.FC<SelectMenuProps> = ({
  options,
  selected,
  setSelected,
  placeholder,
  label,
  disabled = false,
}) => {
  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        className="border border-gray-200 rounded-md p-2 w-full bg-white"
        value={selected?.value || ""}
        onChange={(e) => {
          const option = options.find((opt) => opt.value === e.target.value);
          if (option) {
            setSelected(option);
          }
        }}
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectMenu;
