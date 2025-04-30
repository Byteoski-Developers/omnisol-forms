'use client';

import { useState } from 'react';
import { Country } from '@/types/form';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface CountrySelectorProps {
  countries: Country[];
  onSelect: (country: Country) => void;
}

export function CountrySelector({ countries, onSelect }: CountrySelectorProps) {
  const [search, setSearch] = useState('');

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Search countries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCountries.map((country) => (
          <Card
            key={country.code}
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelect(country)}
          >
            <div className="flex items-center space-x-3">
              <img
                src={country.flag}
                alt={`${country.name} flag`}
                className="w-8 h-8 rounded-sm object-cover"
              />
              <span className="font-medium">{country.name}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}