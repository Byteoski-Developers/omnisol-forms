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
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

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

  const handleResetCase = async () => {
    if (!caseId) return;
    
    try {
      setIsResetting(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';
      
      await authRequest({
        method: 'POST',
        url: `${baseUrl}/api/case-manager/case/reset`,
        params: {
          case_id: caseId
        }
      });
      
      // Reset local state
      setSelectedCountry(null);
      setSelectedForm(null);
      setFormData({});
      setShowResetModal(false);
      
      // Refetch case data to get the updated state
      await fetchCaseData();
      
      alert('Case has been reset successfully!');
    } catch (error) {
      console.error('Error resetting case:', error);
      alert('Failed to reset case. Please try again.');
    } finally {
      setIsResetting(false);
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

  // Reset Warning Modal Component
  const ResetWarningModal = () => {
    if (!showResetModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">Reset Case</h3>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              Are you sure you want to reset this case? This action will:
            </p>
            <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
              <li>Clear all form data and responses</li>
              <li>Reset the case status</li>
              <li>Remove country selection</li>
            </ul>
            <p className="mt-2 text-sm font-medium text-red-600">
              This action cannot be undone.
            </p>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setShowResetModal(false)}
              disabled={isResetting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400"
              onClick={handleResetCase}
              disabled={isResetting}
            >
              {isResetting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Resetting...
                </>
              ) : (
                'Reset Case'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {caseData?.case.title || 'Visa Application Dashboard'}
        </h1>
        
        {/* Reset Button - Show when country is selected or form data exists */}
        {(selectedCountry || Object.keys(formData).length > 0) && (
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={() => setShowResetModal(true)}
          >
            Reset Case
          </button>
        )}
      </div>
      
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
      
      {/* Reset Warning Modal */}
      <ResetWarningModal />
    </div>
  );
}