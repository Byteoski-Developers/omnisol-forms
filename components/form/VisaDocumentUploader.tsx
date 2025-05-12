'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VisaForm } from '@/types/form';
import { DocumentUpload } from './DocumentUpload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface VisaDocumentUploaderProps {
  form: VisaForm;
  purposeOfVisit: string;
  onComplete?: (extractedData: Record<string, any>) => void;
  onError?: (hasErrors: boolean) => void;
}

export function VisaDocumentUploader({ 
  form, 
  purposeOfVisit, 
  onComplete, 
  onError 
}: VisaDocumentUploaderProps) {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, any>>({});
  const [extractedData, setExtractedData] = useState<Record<string, any>>({});
  const [hasErrors, setHasErrors] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Get document categories based on the form steps
  const documentCategories = form.steps
    .filter(step => step.showDocuments)
    .map(step => ({
      id: step.group,
      title: step.title
    }));

  // Handle document upload completion
  const handleUploadComplete = (documentId: string, data: Record<string, any>) => {
    // Store uploaded document
    setUploadedDocuments(prev => ({
      ...prev,
      [documentId]: true
    }));

    // Merge extracted data
    setExtractedData(prev => ({
      ...prev,
      ...data
    }));
  };

  // Handle document upload errors
  const handleUploadError = (hasUploadErrors: boolean) => {
    setHasErrors(hasUploadErrors);
    onError?.(hasUploadErrors);
  };

  // Check if all required documents are uploaded
  useEffect(() => {
    const requiredDocuments = form.documents.filter(doc => {
      // If no conditions, check if it's required
      if (!doc.conditions || doc.conditions.length === 0) {
        return doc.required;
      }
      
      // Check if any condition matches the current purpose of visit
      return doc.conditions.some(condition => 
        condition.questionId === 'purposeOfVisit' && 
        condition.value === purposeOfVisit && 
        doc.required
      );
    });

    const allRequiredUploaded = requiredDocuments.every(doc => 
      uploadedDocuments[doc.id]
    );

    setIsComplete(allRequiredUploaded && !hasErrors);

    // Notify parent component when all required documents are uploaded
    if (allRequiredUploaded && !hasErrors) {
      onComplete?.(extractedData);
    }
  }, [uploadedDocuments, hasErrors, form.documents, purposeOfVisit, extractedData, onComplete]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Upload</CardTitle>
        <CardDescription>
          Upload the required documents for your visa application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="upload">Upload Documents</TabsTrigger>
            <TabsTrigger value="review" disabled={!isComplete}>Review & Confirm</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-6">
            <DocumentUpload 
              form={form} 
              purposeOfVisit={purposeOfVisit} 
              onUploadComplete={handleUploadComplete}
              onError={handleUploadError}
            />
            
            {hasErrors && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  There are issues with your document uploads. Please resolve them before continuing.
                </AlertDescription>
              </Alert>
            )}
            
            {isComplete && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">All Required Documents Uploaded</AlertTitle>
                <AlertDescription className="text-green-700">
                  All required documents have been successfully uploaded and processed.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="flex justify-end">
              <Button 
                onClick={() => setActiveTab('review')} 
                disabled={!isComplete}
              >
                Review Documents
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="review" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Document Summary</h3>
              
              <div className="grid gap-4">
                {form.documents
                  .filter(doc => uploadedDocuments[doc.id])
                  .map(doc => (
                    <Card key={doc.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {doc.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
              
              {Object.keys(extractedData).length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Extracted Information</h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(extractedData).map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <p className="text-sm font-medium capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            <p className="text-sm">{value}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab('upload')}
                >
                  Back to Upload
                </Button>
                <Button onClick={() => onComplete?.(extractedData)}>
                  Confirm & Continue
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
