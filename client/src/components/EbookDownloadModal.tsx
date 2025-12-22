import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Download } from 'lucide-react';

interface EbookDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EbookDownloadModal({ isOpen, onClose }: EbookDownloadModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: '',
    newsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Submit form data (you can integrate with your email service here)
    const formSubmitData = new FormData();
    formSubmitData.append('name', formData.name);
    formSubmitData.append('email', formData.email);
    formSubmitData.append('profession', formData.profession);
    formSubmitData.append('newsletter', formData.newsletter ? 'Yes' : 'No');
    formSubmitData.append('resource', 'GAID 2025 Guidelines');

    try {
      // Submit to FormSubmit or your preferred service
      await fetch('https://formsubmit.co/solusesi03@gmail.com', {
        method: 'POST',
        body: formSubmitData
      });

      // Trigger PDF download
      const link = document.createElement('a');
      link.href = '/assets/resources/Are You GAID-Ready 3.pdf';
      link.download = 'Are-You-GAID-Ready.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Close modal and reset form
      onClose();
      setFormData({ name: '', email: '', profession: '', newsletter: false });
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Are You GAID-Ready?
          </h2>
          <p className="text-lg font-semibold text-[#4b4ba3] mb-2">
            Essential GAID 2025 Guidelines for DPOS and SMES
          </p>
          <p className="text-sm text-gray-600">
            Fill out the form below to download your free compliance guide
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address (Official) *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="profession">Profession/Role *</Label>
            <Input
              id="profession"
              type="text"
              value={formData.profession}
              onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
              required
              className="mt-1"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) => setFormData({ ...formData, newsletter: !!checked })}
            />
            <Label htmlFor="newsletter" className="text-sm">
              Do you want to receive our newsletter?
            </Label>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#4b4ba3] hover:bg-[#a49fe7] mt-6"
          >
            {isSubmitting ? (
              'Processing...'
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download Guide
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}