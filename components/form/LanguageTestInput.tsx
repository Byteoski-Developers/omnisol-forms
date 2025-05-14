import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const languageTests = [
  "IELTS",
  "CELPIP",
  "PTE",
  "TOEFL",
  "Others",
  "Did not appear yet",
];

const ieltsScores = ["Listening", "Reading", "Writing", "Speaking", "Overall"];
const celpipScores = ["Listening", "Reading", "Writing", "Speaking"];
const pteScores = ["Listening", "Reading", "Writing", "Speaking", "Overall"];
const toeflScores = ["Listening", "Reading", "Writing", "Speaking", "Total"];

interface ILanguageTestProps {
  handleChange: (val: any, save?: boolean) => void;
  inputValue: string | any;
  readonly?: boolean;
}

interface ILanguageTestDetail {
  testType: string;
  otherTestName?: string;
  scores: { [key: string]: string };
}

const emptyLanguageTest: ILanguageTestDetail = {
  testType: "",
  scores: {},
};

const LanguageTestInput = (props: ILanguageTestProps) => {
  const [languageTest, setLanguageTest] =
    useState<ILanguageTestDetail>(emptyLanguageTest);
  const { inputValue, handleChange, readonly = false } = props;

  const handleTestTypeChange = (value: string) => {
    // Prevent form submission when changing test type
    const newLanguageTest = {
      ...languageTest,
      testType: value,
      scores: {},
      otherTestName: "",
    };
    setLanguageTest(newLanguageTest);
    handleChange({ value: newLanguageTest }, true);
  };

  const handleScoreChange = (field: string, value: string) => {
    const newScores = { ...languageTest.scores, [field]: value };
    const newLanguageTest = { ...languageTest, scores: newScores };
    setLanguageTest(newLanguageTest);
    handleChange({ value: newLanguageTest }, true);
  };

  const handleOtherTestNameChange = (value: string) => {
    const newLanguageTest = { ...languageTest, otherTestName: value };
    setLanguageTest(newLanguageTest);
    handleChange({ value: newLanguageTest }, true);
  };

  useEffect(() => {
    if (inputValue) {
      try {
        let parsedValue;
        if (typeof inputValue === 'string') {
          try {
            parsedValue = JSON.parse(inputValue);
          } catch (e) {
            parsedValue = inputValue;
          }
        } else {
          parsedValue = inputValue;
        }
        
        // If the value is in {value: ...} format, extract the inner value
        if (parsedValue && typeof parsedValue === 'object' && 'value' in parsedValue) {
          parsedValue = parsedValue.value;
        }
        
        setLanguageTest(parsedValue || emptyLanguageTest);
      } catch (e) {
        setLanguageTest(emptyLanguageTest);
        console.error("Failed to parse inputValue", e);
      }
    } else {
      setLanguageTest(emptyLanguageTest);
    }
  }, [inputValue]);

  const renderScoreInputs = () => {
    let scoreFields;
    switch (languageTest.testType) {
      case "IELTS":
        scoreFields = ieltsScores;
        break;
      case "CELPIP":
        scoreFields = celpipScores;
        break;
      case "PTE":
        scoreFields = pteScores;
        break;
      case "TOEFL":
        scoreFields = toeflScores;
        break;
      case "Others":
        scoreFields = ["Score"];
        break;
      default:
        return null;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {scoreFields.map((field) => (
          <div key={field} className="space-y-2">
            <Label htmlFor={field} className="text-sm font-medium">
              {field}
            </Label>
            <Input
              id={field}
              type="text"
              value={languageTest.scores[field] || ""}
              onChange={(e) => handleScoreChange(field, e.target.value)}
              placeholder={`Enter ${field.toLowerCase()} score`}
              disabled={readonly}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4 border rounded-md p-4">
      <div className="space-y-2">
        <Label htmlFor="testType" className="text-sm font-medium">
          Which language test have you taken?
        </Label>
        <Select
          value={languageTest.testType}
          onValueChange={(value) => handleTestTypeChange(value)}
          disabled={readonly}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a test" />
          </SelectTrigger>
          <SelectContent>
            {languageTests.map((test) => (
              <SelectItem key={test} value={test}>
                {test}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {languageTest.testType === "Others" && (
        <div className="space-y-2">
          <Label htmlFor="otherTestName" className="text-sm font-medium">
            Please specify the test name:
          </Label>
          <Input
            id="otherTestName"
            type="text"
            value={languageTest.otherTestName || ""}
            onChange={(e) => handleOtherTestNameChange(e.target.value)}
            placeholder="Enter the test name"
            disabled={readonly}
          />
        </div>
      )}
      
      {languageTest.testType &&
        languageTest.testType !== "Did not appear yet" &&
        renderScoreInputs()}
    </div>
  );
};

export default LanguageTestInput;
