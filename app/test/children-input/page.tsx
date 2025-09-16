'use client';

import { useState } from 'react';
import ChildrenInputField from '@/components/form/ChildrenInputField';

export default function TestChildrenInput() {
  const [formData, setFormData] = useState({});

  const handleChange = (value: any) => {
    console.log('Form data changed:', value);
    setFormData(value);

    
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Test Children Input Field</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Children Information</h2>
        <ChildrenInputField 
          inputValue={[]} 
          handleChange={handleChange} 
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Form Data</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  );
}
