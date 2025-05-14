import { Fragment, useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import { Tab } from "@headlessui/react";
import { Relative, RelativeSubclass } from "./types";
import RelativeDetail from "@/components/form/RelativeDetail";

interface IRelativesTabsProps {
  onChange: (e: any, save?: boolean) => void;
  value: string;
  relativeSubclass: RelativeSubclass;
}

export default function RelativesTabs(props: IRelativesTabsProps) {
  const { value, onChange, relativeSubclass } = props;
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [relativesData, setRelativesData] = useState<Relative[]>([]);

  useEffect(() => {
    try {
      const defaultData: any = value;
      console.log("DEFAULT DAT----<>", defaultData);
      if (defaultData?.length > 0) {
        const relatives = defaultData?.map((relative: any) => {
          console.log("Ethe condition ----<>", relative?.["id"]);
          if (relative?.["id"]) {
            return relative;
          }
        });
        setRelativesData(relatives);
      } else {
        setRelativesData([
          {
            id: relativesData.length + 1,
            // relativeToVisit: "",
            relationWithRelative: "",
            nameOfRelative: "",
            residenceOfRelative: "",
            immigrationStatusOfRelative: "",
            contactNumberOfRelative: "",
            emailOfRelative: "",
          },
        ]);
      }
    } catch (e) {
      console.log("e", e);
      setRelativesData([
        {
          id: relativesData.length + 1,
          //   relativeToVisit: "",
          relationWithRelative: "",
          nameOfRelative: "",
          residenceOfRelative: "",
          immigrationStatusOfRelative: "",
          contactNumberOfRelative: "",
          emailOfRelative: "",
        },
      ]);
    }
  }, []);

  function handleChange(updateRelative: Relative) {
    const newData = relativesData.map((Relative) => {
      if (updateRelative.id === Relative.id) {
        return { ...updateRelative };
      } else {
        return Relative;
      }
    });

    setRelativesData(newData);
    console.log("New Data ---<>", newData);
    onChange(newData);
  }

  function handleRelativeAdd() {
    const newData = [
      ...relativesData,
      {
        id: relativesData.length + 1,
        // relativeToVisit: "",
        relationWithRelative: "",
        nameOfRelative: "",
        residenceOfRelative: "",
        immigrationStatusOfRelative: "",
        contactNumberOfRelative: "",
        emailOfRelative: "",
      },
    ];

    setRelativesData(newData);
    onChange(newData, true);
  }

  console.log("relativesData ---<>", relativesData);
  return (
    <div className="dark:text-gray-100 bg-white md:pl-6 relative mt-6">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex items-center space-x-1 text-sm md:space-x-2">
          {relativesData.map((r) => (
            <Tab as={Fragment} key={r.id}>
              {({ selected }) => (
                <button
                  className={`flex items-center space-x-2 rounded-lg border px-3 py-2.5 font-medium transition focus:outline-none focus:ring focus:ring-teal-500 focus:ring-opacity-25 active:border-teal-100 dark:active:border-teal-500 dark:active:border-opacity-25 md:px-5 ${
                    selected
                      ? "border-teal-50 bg-teal-50 text-teal-600 dark:border-transparent dark:bg-teal-500 dark:bg-opacity-20 dark:text-teal-100"
                      : "border-transparent text-gray-600 hover:bg-teal-50 hover:text-teal-600 dark:text-gray-300 dark:hover:bg-teal-500 dark:hover:bg-opacity-20 dark:hover:text-teal-100"
                  }`}
                >
                  #{r.id}{" "}
                  <span className="ml-1 truncate max-w-8">
                    {r.nameOfRelative}
                  </span>
                </button>
              )}
            </Tab>
          ))}

          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                onClick={handleRelativeAdd}
                className={`flex items-center space-x-2 rounded-lg border px-3 py-2.5 font-medium transition focus:outline-none focus:ring focus:ring-teal-500 focus:ring-opacity-25 active:border-teal-100 dark:active:border-teal-500 dark:active:border-opacity-25 md:px-5 ${
                  selected
                    ? "border-teal-50 bg-teal-50 text-teal-600 dark:border-transparent dark:bg-teal-500 dark:bg-opacity-20 dark:text-teal-100"
                    : "border-transparent text-gray-600 hover:bg-teal-50 hover:text-teal-600 dark:text-gray-300 dark:hover:bg-teal-500 dark:hover:bg-opacity-20 dark:hover:text-teal-100"
                }`}
              >
                <UserPlus className="w-4 h-4 mr-2" /> Add New
              </button>
            )}
          </Tab>
        </Tab.List>

        <Tab.Panels>
          {relativesData.map((r) => (
            <Tab.Panel key={r.id}>
              <RelativeDetail
                relative={r}
                handleChange={handleChange}
                relativeSubclass={relativeSubclass}
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
