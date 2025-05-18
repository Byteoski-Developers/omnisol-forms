'use client';

import { useState, useEffect } from 'react';
import { CountrySelector } from '@/components/dashboard/CountrySelector';
import { StepForm } from '@/components/form/StepForm';
import { formRegistry } from '@/lib/form-registry';
import { Country } from '@/types/form';
import { setCookie } from '@/lib/cookies';
import { SAMPLE_COUNTRIES } from '@/constants/countries';
import { useParams, useRouter } from 'next/navigation';
import authRequest from '@/api/authRequest';

// Define interfaces based on the provided schema
interface CaseQuestionAnswerOutput {
  id: number;
  case_id: number;
  question: string;
  answer: string;
  label:string;
  created_at: string;
  updated_at: string;
  
}

interface CaseOutput {
  id: number;
  title: string;
  case_type: string;
  case_status: string;
  assigned_staff: string | null;
  staff_contact_detail: string | null;
  omni_email: string | null;
  omni_mail_password: string | null;
  client_email: string | null;
  client_phone_number: string | null;
  user: string;
  purpose: string | null;
  form_completed: boolean | null;
  first_name: string | null;
  last_name: string | null;
  created_on: string | null;
  v2_country_code?:string;
}

interface CaseQAOutput {
  case_id: number;
  questions: CaseQuestionAnswerOutput[];
  case: CaseOutput;
}

export default function Dashboard() {
  const params = useParams();
  const router = useRouter();
  const caseId = params?.caseId as string;
  
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [caseData, setCaseData] = useState<CaseQAOutput | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  console.log("SelectedCountry ---<>", selectedCountry);
  useEffect(() => {
    // Fetch case data when component mounts
    if (caseId) {
      fetchCaseData();
    }
    
    // Parse URL parameters
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const countryCode = urlParams.get('country');
      
      // If token exists, save it as a cookie
      if (token) {
        setCookie('Token', token, 30); // Store token for 30 days
        console.log('Token saved to cookie:', token);
        
        // Clean URL by removing token parameter
        if (window.history && window.history.replaceState) {
          const newUrl = window.location.pathname + 
            (countryCode ? `?country=${countryCode}` : '') +
            window.location.hash;
          window.history.replaceState({}, document.title, newUrl);
        }
      }
      
      // If country code exists, find and select the country
      if (countryCode) {
        const country = SAMPLE_COUNTRIES.find(c => c.code === countryCode.toUpperCase());
        if (country) {
          handleCountrySelect(country);
        }
      }
    }
  }, [caseId]);

  const fetchCaseData = async () => {
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';
      const response = await authRequest({
        method: 'GET',
        url: `${baseUrl}/api/form-manager-v2/case-qa/${caseId}`
      });
      
      const caseQAData: CaseQAOutput = response.data;
      setCaseData(caseQAData);
      // Convert questions and answers to formData format
      const initialFormData: Record<string, any> = {};
      caseQAData.questions.forEach(qa => {
        initialFormData[qa.question] = qa.answer;
      });
      
      setFormData(initialFormData);
      
      // Look for a country_code question in the case data
      const countryCode = caseQAData.case.v2_country_code;
      
      if (countryCode) {
        // If we have a country_code question, use its answer
        const country = SAMPLE_COUNTRIES.find(c => c.code.toUpperCase() === countryCode?.toUpperCase());
        if (country) {
          // Just set the country without calling the API again
          setSelectedCountry(country);
          const forms = formRegistry.getFormsForCountry(country.code);
          if (forms.length > 0) {
            setSelectedForm(forms[0]);
          }
        }
      } else if (caseQAData.case.case_type) {
        // Fallback to using case_type if no country_code question is found
        const country = SAMPLE_COUNTRIES.find(c => c.code === caseQAData.case.case_type.toUpperCase());
        if (country) {
          // Just set the country without calling the API again
          setSelectedCountry(country);
          const forms = formRegistry.getFormsForCountry(country.code);
          if (forms.length > 0) {
            setSelectedForm(forms[0]);
          }
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching case data:', error);
      setError('Failed to fetch case data. Please try again later.');
      setLoading(false);
    }
  };

  const handleCountrySelect = async (country: Country) => {
    setSelectedCountry(country);
    const forms = formRegistry.getFormsForCountry(country.code);
    if (forms.length > 0) {
      setSelectedForm(forms[0]);
    }
    
    // Save the selected country code to the backend
    if (caseId) {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';
        
        // Call the country-code endpoint
        await authRequest({
          method: 'POST',
          url: `${baseUrl}/api/case-manager/case/country-code`,
          params: {
            case_id: caseId,
            country_code: country.code
          }
        });
        
        console.log(`Country ${country.name} (${country.code}) saved for case ${caseId}`);
      } catch (error) {
        console.error('Error saving country code:', error);
      }
    }
  };

  const handleFormSubmit = async (data: Record<string, any>) => {
    // Handle form submission
    console.log('Form submitted:', data);
    
    try {
      // Update the case status
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';
      await authRequest({
        method: 'POST',
        url: `${baseUrl}/api/case-manager/case/submit-form`,
        params: {
            case_id: caseId
        }
      });
      
      // Show success message
      alert('Form submitted successfully! Redirecting to dashboard...');
      
      // Get the main frontend URL from environment variable
      const mainFrontendUrl = process.env.NEXT_PUBLIC_MAIN_FE || 'http://127.0.0.1:3000/';
      
      // Since we're redirecting to an external URL (the main frontend),
      // we need to use window.location.href rather than the Next.js router
      window.location.href = `${mainFrontendUrl}dashboard/cases/detail/${caseId}`;
    } catch (error) {
      console.error('Error updating case status:', error);
      alert('Form submitted but failed to update case status.');
    }
  };

  console.log("selectedCountry ---<>",selectedCountry)
  console.log("selectedForm ---<>",selectedForm)
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2">Loading case data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">
        {caseData?.case.title || 'Visa Application Dashboard'}
      </h1>
      
      {caseData?.case && (
        <div className="bg-blue-50 p-4 rounded-md mb-6">
          <h2 className="font-semibold text-lg mb-2">Case Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p><span className="font-medium">Case ID:</span> {caseData.case.id}</p>
            <p><span className="font-medium">Status:</span> {caseData.case.case_status}</p>
            {caseData.case.first_name && (
              <p><span className="font-medium">Name:</span> {caseData.case.first_name} {caseData.case.last_name}</p>
            )}
            {caseData.case.client_email && (
              <p><span className="font-medium">Email:</span> {caseData.case.client_email}</p>
            )}
          </div>
        </div>
      )}
      
      {!selectedCountry ? (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Select Destination Country</h2>
          <CountrySelector
            countries={SAMPLE_COUNTRIES}
            onSelect={handleCountrySelect}
          />
        </div>
      ) : selectedForm ? (
        <div className="max-w-3xl mx-auto">
          <StepForm
            form={selectedForm}
            onSubmit={handleFormSubmit}
            initialData={formData}
          />
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">
            No visa application forms available for {selectedCountry.name}
          </p>
        </div>
      )}
    </div>
  );
}