'use client';

import { useState, useEffect, useCallback } from 'react';
import { Upload, AlertCircle, FileText, Check, X, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Document, VisaForm } from '@/types/form';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';

interface DocumentUploadProps {
  form: VisaForm;
  purposeOfVisit: string;
  onUploadComplete?: (documentId: string, extractedData: Record<string, any>) => void;
  onError?: (hasErrors: boolean) => void;
}

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  extractedData?: Record<string, any>;
  errorMessage?: string;
}

export function DocumentUpload({ form, purposeOfVisit, onUploadComplete, onError }: DocumentUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // Filter documents based on purpose of visit
  const filteredDocuments = form.documents.filter(doc => {
    // If purposeOfVisit is not set yet, show all required documents
    if (!purposeOfVisit) {
      return doc.required;
    }
    
    // If no conditions, show for all purposes
    if (!doc.conditions || doc.conditions.length === 0) {
      return doc.required; // Only show required documents with no conditions by default
    }
    
    // Check if any condition matches the current purpose of visit
    return doc.conditions.some(condition => 
      condition.questionId === 'purposeOfVisit' && condition.value === purposeOfVisit
    );
  });
  
  // If no documents are filtered based on purpose, show all required documents
  const documentsToShow = filteredDocuments.length > 0 ? 
    filteredDocuments : 
    form.documents.filter(doc => doc.required);

  // Validate file type and size
  const validateFile = (file: File): string | null => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const maxSizeInBytes = 4 * 1024 * 1024; // 4MB
    
    if (!allowedTypes.includes(file.type)) {
      return 'File must be PDF, JPG, or PNG format';
    }
    
    if (file.size > maxSizeInBytes) {
      return 'File size must be less than 4MB';
    }
    
    return null;
  };

  // Extract text from uploaded file using OCR (simulated)
  const extractTextFromFile = async (file: File, documentType: string): Promise<Record<string, any>> => {
    // In a real implementation, this would call an OCR service
    // For now, we'll simulate the extraction with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulated extracted data based on document type
        const extractedData: Record<string, any> = {};
        
        if (documentType.includes('passport')) {
          extractedData.passportNumber = 'AB123456';
          extractedData.fullName = 'John Doe';
          extractedData.dateOfBirth = '1990-01-01';
          extractedData.expiryDate = '2030-01-01';
        } else if (documentType.includes('letter')) {
          extractedData.issueDate = '2023-01-01';
          extractedData.issuerName = 'Company XYZ';
        }
        
        resolve(extractedData);
      }, 1500); // Simulate processing time
    });
  };

  // Handle file upload
  const handleFileUpload = async (documentId: string, file: File, documentName: string) => {
    // Validate file
    const error = validateFile(file);
    if (error) {
      setValidationErrors(prev => ({ ...prev, [documentId]: error }));
      return;
    }
    
    // Clear previous error if any
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[documentId];
      return newErrors;
    });
    
    // Create upload entry with initial progress
    setUploadedFiles(prev => ({
      ...prev,
      [documentId]: {
        id: documentId,
        file,
        progress: 0,
        status: 'uploading'
      }
    }));
    
    // Simulate upload progress
    const simulateProgress = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        
        setUploadedFiles(prev => ({
          ...prev,
          [documentId]: {
            ...prev[documentId],
            progress: Math.min(progress, 90) // Cap at 90% until extraction is done
          }
        }));
        
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 300);
      
      return interval;
    };
    
    const progressInterval = simulateProgress();
    
    try {
      // Extract text from file using OCR
      const extractedData = await extractTextFromFile(file, documentName);
      
      // Clear progress interval
      clearInterval(progressInterval);
      
      // Update file status to success with extracted data
      setUploadedFiles(prev => ({
        ...prev,
        [documentId]: {
          ...prev[documentId],
          progress: 100,
          status: 'success',
          extractedData
        }
      }));
      
      // Notify parent component
      onUploadComplete?.(documentId, extractedData);
    } catch (error) {
      // Clear progress interval
      clearInterval(progressInterval);
      
      // Update file status to error
      setUploadedFiles(prev => ({
        ...prev,
        [documentId]: {
          ...prev[documentId],
          progress: 100,
          status: 'error',
          errorMessage: 'Failed to process file'
        }
      }));
    }
  };

  // Remove uploaded file
  const handleRemoveFile = (documentId: string) => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[documentId];
      return newFiles;
    });
  };

  // Check for errors and notify parent component
  useEffect(() => {
    const hasErrors = Object.keys(validationErrors).length > 0 || 
                     Object.values(uploadedFiles).some(file => file.status === 'error');
    
    onError?.(hasErrors);
  }, [validationErrors, uploadedFiles, onError]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Required Documents</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Please upload the following documents. Accepted formats: PDF, JPG, PNG (max 4MB each)
      </p>
      
      {documentsToShow.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          No documents required for the selected visa purpose.
        </div>
      ) : (
        <div className="grid gap-4">
          {documentsToShow.map((document) => (
            <Card key={document.id} className={cn(
              "overflow-hidden",
              document.required && !uploadedFiles[document.id] && "border-amber-500"
            )}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{document.name}</h4>
                      {document.required && (
                        <Badge variant="outline" className="text-amber-500 border-amber-500">
                          Required
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {document.description}
                    </p>
                    
                    {/* Display extracted data if available */}
                    {uploadedFiles[document.id]?.extractedData && (
                      <div className="mt-2 p-2 bg-muted rounded-md">
                        <p className="text-xs font-medium mb-1">Extracted Information:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(uploadedFiles[document.id].extractedData || {}).map(([key, value]) => (
                            <div key={key} className="text-xs">
                              <span className="font-medium">{key}: </span>
                              <span>{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="w-full md:w-64 flex-shrink-0">
                    {!uploadedFiles[document.id] ? (
                      <div className="space-y-2">
                        <Label htmlFor={`file-${document.id}`} className="sr-only">
                          Upload {document.name}
                        </Label>
                        <Input
                          id={`file-${document.id}`}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(document.id, file, document.name);
                            }
                          }}
                          className={validationErrors[document.id] ? "border-destructive" : ""}
                        />
                        {validationErrors[document.id] && (
                          <div className="flex items-center gap-2 text-destructive text-xs">
                            <AlertCircle className="h-3 w-3" />
                            <p>{validationErrors[document.id]}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {uploadedFiles[document.id].status === 'uploading' ? (
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                          ) : uploadedFiles[document.id].status === 'success' ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-destructive" />
                          )}
                          <span className="text-sm truncate flex-1">
                            {uploadedFiles[document.id].file.name}
                          </span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => handleRemoveFile(document.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Remove file</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        
                        {uploadedFiles[document.id].status === 'uploading' && (
                          <div className="space-y-1">
                            <Progress value={uploadedFiles[document.id].progress} className="h-1" />
                            <p className="text-xs text-muted-foreground">
                              {uploadedFiles[document.id].progress < 90 
                                ? 'Uploading...' 
                                : 'Processing document...'}
                            </p>
                          </div>
                        )}
                        
                        {uploadedFiles[document.id].status === 'error' && (
                          <p className="text-xs text-destructive">
                            {uploadedFiles[document.id].errorMessage || 'Error uploading file'}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
