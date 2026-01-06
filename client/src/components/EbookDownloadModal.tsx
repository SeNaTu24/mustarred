import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Download } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/lib/emailjs-config';

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

    try {
      // Send email notification via EmailJS
      const emailMessage = `
New GAID PDF Download from Blog Page

Name: ${formData.name}
Email: ${formData.email}
Profession: ${formData.profession}
Newsletter Subscription: ${formData.newsletter ? 'Yes' : 'No'}
Resource: GAID 2025 Guidelines
Time: ${new Date().toLocaleString()}
      `.trim();

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATES.CONTACT_FORM,
        {
          to_email: 'info@mustarred.com',
          from_name: formData.name,
          from_email: formData.email,
          subject: '🎯 New GAID PDF Download (Blog)',
          message: emailMessage
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      // If user wants newsletter, add them to Mailchimp
      if (formData.newsletter) {
        try {
          const mailchimpData = new FormData();
          mailchimpData.append('EMAIL', formData.email);
          mailchimpData.append('FNAME', formData.name);
          mailchimpData.append('tags', '12386815'); // PDF download tag
          
          await fetch(
            'https://mustarred.us12.list-manage.com/subscribe/post?u=cdd12424c1d674fa391e8e63e&id=22107e23a3&f_id=00f4e7e0f0',
            {
              method: 'POST',
              body: mailchimpData,
              mode: 'no-cors'
            }
          );
        } catch (mailchimpError) {
          console.log('Mailchimp subscription failed:', mailchimpError);
        }
      }

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
      alert('Failed to send notification. Please try again or contact us directly.');
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