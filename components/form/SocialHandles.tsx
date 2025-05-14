import { useEffect, useState } from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

interface ISocialHandleProps {
  handleChange: (val: any) => void;
  inputValue: string;
  readonly?: boolean;
}

export default function SocialHandles(props: ISocialHandleProps) {
  const { handleChange, inputValue, readonly } = props;

  const [twitter, setTwitter] = useState<string>();
  const [facebook, setFacebook] = useState<string>();
  const [instagram, setInstagram] = useState<string>();

  useEffect(() => {
    try {
      console.log("input value --<>", inputValue);
      if (inputValue !== undefined && inputValue !== "") {
        const parsedValue: any = inputValue;
        setTwitter(parsedValue["twitter"]);
        setInstagram(parsedValue["instagram"]);
        setFacebook(parsedValue["facebook"]);
      }
    } catch (e) {
      console.log("Error ---<>", e);
    }
  }, []);

  function handleUpdate() {
    const result = {
      twitter: twitter,
      instagram: instagram,
      facebook: facebook,
    };

    handleChange({ value: result });
  }
  return (
    <div className="bg-white">
      <div className="">
        <div className="">
          <label
            htmlFor="twitter"
            className="text-sm p-2 font-bold  flex gap-2"
          >
            <Twitter className=" w-5 h-5 text-teal-700" /> {"Twitter"}
          </label>
          <input
            className="rounded-lg border border-gray-200 text-sm block w-full p-2 leading-6 placeholder-gray-500 focus:border-teal-500 focus:ring focus:ring-teal-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-teal-500"
            id={"twitter"}
            type="text"
            placeholder={`Enter your Twitter UserName`}
            value={twitter}
            onChange={(e) => {
              setTwitter(e.target.value);
              handleUpdate();
            }}
            disabled={readonly}
          />
          {/* </div> */}
        </div>

        <div className="">
          <label
            htmlFor="Instagram"
            className="text-sm font-bold   flex p-2 gap-2"
          >
            <Instagram className=" w-5 h-5 text-teal-700" /> {"Instagram"}
          </label>

          <input
            className="rounded-lg border border-gray-200 text-sm block w-full p-2 leading-6 placeholder-gray-500 focus:border-teal-500 focus:ring focus:ring-teal-500/50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-teal-500"
            id={"Instagram"}
            type="text"
            placeholder={`Enter your Instagram UserName`}
            value={instagram}
            onChange={(e) => {
              setInstagram(e.target.value);
              handleUpdate();
            }}
            disabled={readonly}
          />
        </div>

        <div className="">
          <label
            htmlFor="twitter"
            className="text-sm font-bold p-2  flex gap-2"
          >
            <Facebook className="w-5 h-5 text-teal-700" /> {"Facebook"}
          </label>

          <input
            className="rounded-lg border border-gray-200 text-sm block w-full p-2 leading-6 placeholder-gray-500 focus:border-teal-500 focus:ring focus:ring-teal-500/50  dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-teal-500"
            id={"Facebook"}
            type="text"
            placeholder={`Enter your Facebook UserName`}
            value={facebook}
            onChange={(e) => {
              setFacebook(e.target.value);
              handleUpdate();
            }}
            disabled={readonly}
          />
        </div>
      </div>
    </div>
  );
}
