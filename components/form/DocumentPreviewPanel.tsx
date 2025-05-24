import React from 'react';
import { Document } from '@/types/form';
import { FileText, CheckCircle } from 'lucide-react';

interface DocumentPreviewPanelProps {
  documents: Document[];
  requiredDocuments: Set<string>;
}

const DocumentPreviewPanel: React.FC<DocumentPreviewPanelProps> = ({ 
  documents, 
  requiredDocuments 
}) => {
  // Group documents by their related fields (questionId)
  const groupedDocuments: Record<string, Document[]> = {};
  
  // Add default documents to a special group
  const defaultDocuments: Document[] = [];
  
  documents.forEach(doc => {
    if (doc.type === 'default') {
      defaultDocuments.push(doc);
    } else if (doc.conditions && doc.conditions.length > 0) {
      // Group by the first condition's questionId
      const questionId = doc.conditions[0].questionId;
      if (!groupedDocuments[questionId]) {
        groupedDocuments[questionId] = [];
      }
      groupedDocuments[questionId].push(doc);
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 p-4">
      <div className="flex items-center mb-3">
        <FileText className="h-5 w-5 mr-2 text-blue-600" />
        <h3 className="text-sm font-semibold text-blue-600">Required Documents</h3>
      </div>
      
      <div 
        className="space-y-4 max-h-[70vh] overflow-y-auto pr-1"
        style={{ 
          scrollbarWidth: 'thin',
          scrollbarColor: '#E5E7EB transparent'
        }}
      >
        {/* Default documents (always required) */}
        {defaultDocuments.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-gray-700 uppercase mb-2">
              GENERAL REQUIREMENTS
            </h4>
            <ul className="space-y-3">
              {defaultDocuments.map(doc => (
                <li key={doc.id} className="flex items-start">
                  <div className="mr-2 mt-0.5 flex-shrink-0 text-green-500">
                    <div className="rounded-full border border-green-500 p-0.5">
                      <CheckCircle className="h-3 w-3" />
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-black font-medium block">{doc.name}</span>
                    <p className="text-xs text-gray-600 mt-0.5">{doc.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Conditional documents grouped by field */}
        {Object.entries(groupedDocuments).map(([fieldId, docs]) => {
          // Only show groups that have at least one required document
          const hasRequiredDocs = docs.some(doc => requiredDocuments.has(doc.id));
          if (!hasRequiredDocs) return null;

          // Get a readable field name from the fieldId
          const fieldName = fieldId
            .replace(/([A-Z])/g, ' $1') // Add space before capital letters
            .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
            .replace(/([a-z])([A-Z])/g, '$1 $2'); // Add space between camelCase

          return (
            <div key={fieldId} className="mt-4">
              <h4 className="text-xs font-medium text-gray-700 uppercase mb-2">
                {fieldName.toUpperCase()}
              </h4>
              <ul className="space-y-3">
                {docs.map(doc => {
                  const isRequired = requiredDocuments.has(doc.id);
                  if (!isRequired) return null;

                  return (
                    <li key={doc.id} className="flex items-start">
                      <div className="mr-2 mt-0.5 flex-shrink-0 text-green-500">
                        <div className="rounded-full border border-green-500 p-0.5">
                          <CheckCircle className="h-3 w-3" />
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-blue-600 font-medium block">{doc.name}</span>
                        <p className="text-xs text-gray-600 mt-0.5">{doc.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        {requiredDocuments.size === 0 && (
          <p className="text-xs text-gray-600">No documents required based on your current form responses.</p>
        )}
      </div>
    </div>
  );
};

export default DocumentPreviewPanel;
