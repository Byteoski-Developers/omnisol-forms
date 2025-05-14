import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TextAreaProps {
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  error?: string;
  name?: string;
  defaultValue?: string;
  helpText?: string;
  description?: string;
  disabled?: boolean;
  setErrorSubmission?: (value: boolean) => void;
  rows?: number;
  cols?: number;
  className?: string;
  readonly?: boolean;
}

export default function TextArea(props: TextAreaProps) {
  const {
    id,
    label,
    onChange,
    placeholder,
    maxLength = 500,
    minLength = 10,
    required,
    error,
    name,
    defaultValue = "",
    helpText,
    description,
    className,
    disabled = false,
    setErrorSubmission = () => {},
    rows = 3,
    cols = 20,
    readonly,
  } = props;

  const [input, setInput] = useState<string>(defaultValue);
  const [err, setErr] = useState<string>("");

  const handleErr = () => {
    if (err.length > 0) {
      setErrorSubmission(true);
    } else setErrorSubmission(false);
  };

  useEffect(() => {
    setInput(defaultValue);
  }, [defaultValue]);

  const warningError = "You are close to exceeding the character limit";

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInput(newValue);

    if (newValue.length >= maxLength) {
      setErr(`Maximum ${maxLength} characters allowed`);
    } else if (newValue.length >= maxLength - 10) {
      setErr(warningError);
    } else {
      setErr("");
    }

    handleErr();
    onChange(newValue);
  };

  return (
    <div className={cn(className)}>
      <div className="space-y-1">
        <label htmlFor={id} className="text-sm text-slate-900 font-bold">
          {label}
        </label>
        <textarea
          maxLength={maxLength}
          minLength={minLength}
          value={typeof defaultValue === "string" ? defaultValue : ""}
          onChange={handleChange}
          name={name}
          id={id}
          placeholder={placeholder}
          aria-describedby={id}
          required={required}
          disabled={disabled}
          rows={rows}
          cols={cols}
          className={`block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 ${readonly ? "" : "focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-teal-500"}`}
          readOnly={readonly}
        />
        <div className="pointer-events-none  text-gray-400 justify-end top-14 flex items-center pr-2 text-xs">
          {input?.length}/{maxLength}
        </div>
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      <p className="mt-2 text-xs text-gray-600" id={id}>
        {helpText}
      </p>
      {err && (
        <div className="flex space-x-2 items-center">
          <AlertCircle
            className={`h-5 w-5 text-red-500 ${
              err === warningError ? "hidden" : "flex"
            }`}
          />
          <AlertCircle
            className={`h-5 w-5 text-yellow-500 ${
              err === warningError ? "flex" : "hidden"
            }`}
          />
          <p
            className={`text-sm ${
              err === warningError
                ? "text-semantic-warning"
                : "text-semantic-error"
            }`}
            id={id}
          >
            {err}
          </p>
        </div>
      )}
    </div>
  );
}
