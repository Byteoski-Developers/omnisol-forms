import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { COUNTRIES } from "@/lib/countries/constants/countries";
import DateField from "./datefield";

interface IMilitaryService {
  id: number;
  unitName: string;
  position: string;
  rank: string;
  startDate: string;
  endDate: string;
  location: string;
  country: string;
  currentlyServing: boolean;
}

interface IMilitaryHistoryProps {
  onChange: (val: any, save?: boolean) => void;
  value: string | any;
  readonly?: boolean;
}

const emptyMilitaryService: IMilitaryService = {
  id: 1,
  unitName: "",
  position: "",
  rank: "",
  startDate: "",
  endDate: "",
  location: "",
  country: "",
  currentlyServing: false
};

export default function MilitaryHistory(props: IMilitaryHistoryProps) {
  const { value, onChange, readonly } = props;
  const [serviceList, setServiceList] = useState<IMilitaryService[]>([]);
  
  // Initialize with empty service if none exists
  useEffect(() => {
    if (value) {
      try {
        const parsedValue = JSON.parse(value);
        if (Array.isArray(parsedValue) && parsedValue.length > 0) {
          setServiceList(parsedValue);
        } else {
          setServiceList([{ ...emptyMilitaryService }]);
        }
      } catch (e) {
        setServiceList([{ ...emptyMilitaryService }]);
      }
    } else {
      setServiceList([{ ...emptyMilitaryService }]);
    }
  }, [value]);

  const handleFieldChange = (index: number, field: keyof IMilitaryService, value: any) => {
    const newServiceList = [...serviceList];
    newServiceList[index] = {
      ...newServiceList[index],
      [field]: value
    };
    
    // If currently serving is set to true, clear end date
    if (field === 'currentlyServing' && value === true) {
      newServiceList[index].endDate = '';
    }
    
    setServiceList(newServiceList);
    onChange(JSON.stringify(newServiceList), true);
  };

  const addService = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default form submission behavior
    e.preventDefault();
    e.stopPropagation();
    
    const newId = serviceList.length > 0 
      ? Math.max(...serviceList.map(service => service.id)) + 1 
      : 1;
    
    const newServiceList = [
      ...serviceList,
      { ...emptyMilitaryService, id: newId }
    ];
    
    setServiceList(newServiceList);
    onChange(JSON.stringify(newServiceList), true);
  };

  const removeService = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default form submission behavior
    e.preventDefault();
    e.stopPropagation();
    
    const newServiceList = serviceList.filter(service => service.id !== id);
    
    if (newServiceList.length === 0) {
      const resetList = [{ ...emptyMilitaryService, id: 1 }];
      setServiceList(resetList);
      onChange(JSON.stringify(resetList), true);
    } else {
      setServiceList(newServiceList);
      onChange(JSON.stringify(newServiceList), true);
    }
  };

  return (
    <div className="dark:text-gray-100 bg-white relative">
      <div className="flex justify-between items-center border-b p-2">
        <h4 className="font-bold text-sm">Military/Police History</h4>
        {!readonly && (
          <div>
            <Button onClick={addService} variant="outline" size="sm" type="button">
              <Plus className="w-4 h-4 mr-2" /> Add Service
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4 p-2">
        {serviceList.map((service, index) => (
          <div key={service.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="font-medium">Service #{index + 1}</h5>
              {!readonly && serviceList.length > 1 && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={(e) => removeService(service.id, e)}
                  type="button"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Remove
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Unit Name</label>
                <Input
                  value={service.unitName}
                  onChange={(e) => handleFieldChange(index, 'unitName', e.target.value)}
                  disabled={readonly}
                  className="border-primary focus:border-primary"
                  placeholder="Enter unit name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Position</label>
                <Input
                  value={service.position}
                  onChange={(e) => handleFieldChange(index, 'position', e.target.value)}
                  disabled={readonly}
                  className="border-primary focus:border-primary"
                  placeholder="Enter position"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Rank</label>
                <Input
                  value={service.rank}
                  onChange={(e) => handleFieldChange(index, 'rank', e.target.value)}
                  disabled={readonly}
                  className="border-primary focus:border-primary"
                  placeholder="Enter rank"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  value={service.location}
                  onChange={(e) => handleFieldChange(index, 'location', e.target.value)}
                  disabled={readonly}
                  className="border-primary focus:border-primary"
                  placeholder="Enter location"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Select
                  value={service.country}
                  onValueChange={(value) => handleFieldChange(index, 'country', value)}
                  disabled={readonly}
                >
                  <SelectTrigger className="border-primary focus:border-primary">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Currently Serving</label>
                <Select
                  value={service.currentlyServing ? "yes" : "no"}
                  onValueChange={(value) => handleFieldChange(index, 'currentlyServing', value === "yes")}
                  disabled={readonly}
                >
                  <SelectTrigger className="border-primary focus:border-primary">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <DateField
                  field={{
                    id: `service-start-${service.id}`,
                    label: "Start Date",
                    required: false
                  }}
                  formData={{ [`service-start-${service.id}`]: service.startDate ? new Date(service.startDate).toISOString() : "" }}
                  handleFieldChange={(_, value) => handleFieldChange(index, 'startDate', value)}
                  disableFutureDates={false}
                />
              </div>

              {!service.currentlyServing && (
                <div className="space-y-2">
                  <DateField
                    field={{
                      id: `service-end-${service.id}`,
                      label: "End Date",
                      required: false
                    }}
                    formData={{ [`service-end-${service.id}`]: service.endDate ? new Date(service.endDate).toISOString() : "" }}
                    handleFieldChange={(_, value) => handleFieldChange(index, 'endDate', value)}
                    disableFutureDates={true}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
