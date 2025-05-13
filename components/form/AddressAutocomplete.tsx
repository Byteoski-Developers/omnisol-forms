'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Address {
  streetNumber: string;
  streetName: string;
  apartment: string;
  poBox: string;
  city: string;
  province: string;
  postalCode: string;
  fullAddress: string;
}

interface AddressAutocompleteProps {
  onChange: (address: Address) => void;
  value?: Address;
  country?: string;
}

export function AddressAutocomplete({
  onChange,
  value = {
    streetNumber: '',
    streetName: '',
    apartment: '',
    poBox: '',
    city: '',
    province: '',
    postalCode: '',
    fullAddress: ''
  },
  country = 'Canada'
}: AddressAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address>(value);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  // Mock function to simulate address suggestions
  // In a real implementation, this would call a geocoding API
  const fetchAddressSuggestions = (input: string, country: string) => {
    // This is a mock function - in production, you would call a real API
    if (input.length < 3) return [];
    
    // Mock Canadian addresses for demonstration
    const mockAddresses = [
      '123 Maple Street, Toronto, ON M5V 2T6',
      '456 Oak Avenue, Vancouver, BC V6B 3P7',
      '789 Pine Road, Montreal, QC H2Y 1Z7',
      '101 Elm Boulevard, Calgary, AB T2P 1J9',
      '202 Cedar Lane, Ottawa, ON K1P 5G8'
    ];
    
    return mockAddresses.filter(address => 
      address.toLowerCase().includes(input.toLowerCase())
    );
  };

  // Parse address components from a full address string
  const parseAddress = (fullAddress: string): Address => {
    // This is a simplified parser - a real implementation would be more robust
    const parts = fullAddress.split(',').map(part => part.trim());
    
    let streetParts = parts[0].split(' ');
    const streetNumber = streetParts[0];
    const streetName = streetParts.slice(1).join(' ');
    
    let city = parts[1] || '';
    let provincePostal = parts[2] || '';
    let provinceParts = provincePostal.split(' ');
    let province = provinceParts[0] || '';
    let postalCode = provinceParts.slice(1).join(' ') || '';
    
    return {
      streetNumber,
      streetName,
      apartment: '',
      poBox: '',
      city,
      province,
      postalCode,
      fullAddress
    };
  };

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (query.length >= 3) {
      const results = fetchAddressSuggestions(query, country);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, country]);

  const handleSelectAddress = (address: string) => {
    const parsedAddress = parseAddress(address);
    setSelectedAddress(parsedAddress);
    setQuery(address);
    setShowSuggestions(false);
    onChange(parsedAddress);
  };

  const handleManualChange = (field: keyof Address, value: string) => {
    const updatedAddress = { ...selectedAddress, [field]: value };
    setSelectedAddress(updatedAddress);
    onChange(updatedAddress);
  };

  return (
    <div className="space-y-4">
      <div className="relative" ref={autocompleteRef}>
        <Label htmlFor="address-autocomplete">Start typing to find your address in the list</Label>
        <Input
          id="address-autocomplete"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your address"
          className="w-full"
        />
        
        {showSuggestions && (
          <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-auto">
            <ul className="py-1">
              {suggestions.map((suggestion, index) => (
                <li 
                  key={index} 
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectAddress(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>

      <div className="grid gap-4">
        <div>
          <Label htmlFor="street-number">Street number</Label>
          <Input
            id="street-number"
            value={selectedAddress.streetNumber}
            onChange={(e) => handleManualChange('streetNumber', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="street-name">Street name</Label>
          <Input
            id="street-name"
            value={selectedAddress.streetName}
            onChange={(e) => handleManualChange('streetName', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="apartment">Apartment or unit number</Label>
          <Input
            id="apartment"
            value={selectedAddress.apartment}
            onChange={(e) => handleManualChange('apartment', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="po-box">PO box</Label>
          <Input
            id="po-box"
            value={selectedAddress.poBox}
            onChange={(e) => handleManualChange('poBox', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="city">City or town</Label>
          <Input
            id="city"
            value={selectedAddress.city}
            onChange={(e) => handleManualChange('city', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="province">Province</Label>
          <Input
            id="province"
            value={selectedAddress.province}
            onChange={(e) => handleManualChange('province', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="postal-code">Postal code</Label>
          <Input
            id="postal-code"
            value={selectedAddress.postalCode}
            onChange={(e) => handleManualChange('postalCode', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
