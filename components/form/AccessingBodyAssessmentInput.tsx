import React, { useEffect, useState } from "react";
import SelectMenu from "../../select";
import { EquivalencyChoices } from "./constants";

interface IAccessingBodyAssessmentProps {
  handleChange: (val: any) => void;
  inputValue: string;
  readonly?: boolean;
}

interface IAccessingBodyAssessment {
  name: string;
  referenceNumber: string;
  assessmentDate: string;
  equivalency: string;
}

const emptyAssessment: IAccessingBodyAssessment = {
  name: "",
  referenceNumber: "",
  assessmentDate: "",
  equivalency: "",
};

const AccessingBodyAssessmentInput = (props: IAccessingBodyAssessmentProps) => {
  const [assessmentDetail, setAssessmentDetail] =
    useState<IAccessingBodyAssessment>(emptyAssessment);
  const { inputValue, handleChange, readonly } = props;

  const handleFieldChange = (
    field: keyof IAccessingBodyAssessment,
    value: string,
  ) => {
    const newAssessmentDetail = { ...assessmentDetail, [field]: value };
    setAssessmentDetail(newAssessmentDetail);
    handleChange({ value: newAssessmentDetail });
  };

  useEffect(() => {
    if (inputValue) {
      try {
        const parsedInputValue: any = inputValue;
        setAssessmentDetail(parsedInputValue);
      } catch (e) {
        setAssessmentDetail(emptyAssessment);
        console.error("Failed to parse inputValue", e);
      }
    }
  }, [inputValue]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name of Accessing Body
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter the name of the accessing body"
          className="border border-gray-200 rounded-md p-2 w-full"
          value={assessmentDetail.name}
          onChange={(e) => handleFieldChange("name", e.target.value)}
          readOnly={readonly}
        />
      </div>
      <div>
        <label
          htmlFor="referenceNumber"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Reference Number
        </label>
        <input
          id="referenceNumber"
          type="text"
          placeholder="Enter the reference number"
          className="border border-gray-200 rounded-md p-2 w-full"
          value={assessmentDetail.referenceNumber}
          onChange={(e) => handleFieldChange("referenceNumber", e.target.value)}
          readOnly={readonly}
        />
      </div>
      <div>
        <label
          htmlFor="assessmentDate"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Date of Assessment
        </label>
        <input
          id="assessmentDate"
          type="date"
          className="border border-gray-200 rounded-md p-2 w-full"
          value={assessmentDetail.assessmentDate}
          onChange={(e) => handleFieldChange("assessmentDate", e.target.value)}
          readOnly={readonly}
        />
      </div>
      <div>
        <label
          htmlFor="equivalency"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Equivalency
        </label>
        <SelectMenu
          placeholder="Select Equivalency"
          options={EquivalencyChoices}
          label=""
          selected={EquivalencyChoices.find(
            (option) => option.label === assessmentDetail.equivalency,
          )}
          setSelected={(selectedOption) =>
            handleFieldChange("equivalency", selectedOption.label)
          }
          disabled={readonly}
        />
      </div>
    </div>
  );
};

export default AccessingBodyAssessmentInput;
