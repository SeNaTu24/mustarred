import { useState } from 'react';
import { X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { complianceTools } from '@/data/resources';

interface ResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResourceRequest?: (resourceName: string) => void;
}

export default function ResourcesModal({ isOpen, onClose, onResourceRequest }: ResourcesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Free Resources</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-muted-foreground mt-2">
            Access our collection of compliance guides, templates, and tools
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complianceTools.map((tool, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-white hover:bg-gray-50"
                onClick={() => {
                  if (onResourceRequest) {
                    onResourceRequest(`Free Resource: ${tool.name}`);
                    onClose();
                  } else {
                    window.open(
                      `https://mail.google.com/mail/?view=cm&to=info@mustarred.com&su=Request: ${tool.name}`,
                      "_blank"
                    );
                  }
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{tool.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {tool.description}
                    </p>
                    <div className="flex items-center gap-1 text-blue-600 text-xs font-medium">
                      <FileText className="h-3 w-3" />
                      Request Resource
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}