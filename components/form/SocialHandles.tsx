import { useEffect, useState } from "react";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

interface ISocialHandleProps {
  handleChange: (val: any) => void;
  inputValue: string;
  readonly?: boolean;
}

export default function SocialHandles({ handleChange, inputValue, readonly = false }: ISocialHandleProps) {
  // Initialize state with empty strings
  const [socialData, setSocialData] = useState({
    twitter: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: ""
  });

  // Initialize from props
  useEffect(() => {
    try {
      if (inputValue) {
        const parsedValue = typeof inputValue === 'string' ? JSON.parse(inputValue) : inputValue;
        setSocialData(prev => ({
          ...prev,
          ...(parsedValue.twitter && { twitter: parsedValue.twitter }),
          ...(parsedValue.facebook && { facebook: parsedValue.facebook }),
          ...(parsedValue.instagram && { instagram: parsedValue.instagram }),
          ...(parsedValue.linkedin && { linkedin: parsedValue.linkedin }),
          ...(parsedValue.youtube && { youtube: parsedValue.youtube })
        }));
      }
    } catch (e) {
      console.error("Error parsing social handles:", e);
    }
  }, [inputValue]);

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    const updatedData = {
      ...socialData,
      [field]: value
    };
    setSocialData(updatedData);
    handleChange(updatedData);
  };

  // Render social media input field
  const renderSocialInput = ({
    id,
    icon: Icon,
    label,
    placeholder
  }: {
    id: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    placeholder: string;
  }) => (
    <div className="mb-4">
      <label htmlFor={id} className="text-sm p-2 font-bold flex gap-2 items-center">
        <Icon className="w-5 h-5 text-teal-700" />
        {label}
      </label>
      <input
        className="rounded-lg border border-gray-200 text-sm block w-full p-2 leading-6 placeholder-gray-500 focus:border-teal-500 focus:ring focus:ring-teal-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-teal-500"
        id={id}
        type="text"
        placeholder={placeholder}
        value={socialData[id as keyof typeof socialData] || ''}
        onChange={(e) => handleInputChange(id, e.target.value)}
        disabled={readonly}
      />
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-lg">
      {renderSocialInput({
        id: "twitter",
        icon: Twitter,
        label: "Twitter",
        placeholder: "Enter your Twitter username"
      })}

      {renderSocialInput({
        id: "instagram",
        icon: Instagram,
        label: "Instagram",
        placeholder: "Enter your Instagram username"
      })}

      {renderSocialInput({
        id: "facebook",
        icon: Facebook,
        label: "Facebook",
        placeholder: "Enter your Facebook username or profile URL"
      })}

      {renderSocialInput({
        id: "linkedin",
        icon: Linkedin,
        label: "LinkedIn",
        placeholder: "Enter your LinkedIn profile URL"
      })}

      {renderSocialInput({
        id: "youtube",
        icon: Youtube,
        label: "YouTube",
        placeholder: "Enter your YouTube channel URL or username"
      })}
    </div>
  );
}
