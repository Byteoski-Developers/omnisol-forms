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
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3">
      <div className="flex items-center mb-2">
        <FileText className="h-4 w-4 mr-2 text-blue-600" />
        <h3 className="text-sm font-medium text-blue-600">Required Documents</h3>
      </div>
      
      <div 
        className="space-y-3 max-h-[70vh] overflow-y-auto"
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
            <ul className="space-y-2">
              {defaultDocuments.map(doc => (
                <li key={doc.id} className="flex items-start">
                  <div className="mr-2 mt-0.5 flex-shrink-0 text-green-500">
                    <CheckCircle className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-medium">{doc.name}</span>
                    <p className="text-xs text-gray-500">{doc.description}</p>
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
            <div key={fieldId} className="mt-3">
              <h4 className="text-xs font-medium text-gray-700 uppercase mb-2">
                {fieldName.toUpperCase()}
              </h4>
              <ul className="space-y-2">
                {docs.map(doc => {
                  const isRequired = requiredDocuments.has(doc.id);
                  if (!isRequired) return null;

                  return (
                    <li key={doc.id} className="flex items-start">
                      <div className="mr-2 mt-0.5 flex-shrink-0 text-green-500">
                        <CheckCircle className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className="text-xs font-medium">{doc.name}</span>
                        <p className="text-xs text-gray-500">{doc.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        {requiredDocuments.size === 0 && (
          <p className="text-xs text-gray-500">No documents required based on your current form responses.</p>
        )}
      </div>
    </div>
  );
};

export default DocumentPreviewPanel;
