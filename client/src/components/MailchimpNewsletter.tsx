import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trackFormSubmit } from '@/lib/analytics';

export default function MailchimpNewsletter() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setStatus('loading');
    trackFormSubmit('Newsletter Signup');

    // Create hidden iframe for form submission
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.name = 'mailchimp-iframe';
    document.body.appendChild(iframe);

    // Create form
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://mustarred.us12.list-manage.com/subscribe/post';
    form.target = 'mailchimp-iframe';
    
    const fields = [
      { name: 'u', value: 'cdd12424c1d674fa391e8e63e' },
      { name: 'id', value: '22107e23a3' },
      { name: 'EMAIL', value: email },
      { name: 'FNAME', value: firstName }
    ];
    
    fields.forEach(field => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = field.name;
      input.value = field.value;
      form.appendChild(input);
    });
    
    document.body.appendChild(form);
    form.submit();
    
    // Clean up and show success
    setTimeout(() => {
      document.body.removeChild(form);
      document.body.removeChild(iframe);
      setStatus('success');
      setEmail('');
      setFirstName('');
    }, 1000);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 rounded-lg bg-card">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">
        Get Exclusive Insights to Stay Ahead
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
        Stay ahead of the curve with the latest compliance
        insights, regulatory updates, and expert guidance
        delivered to your inbox.
      </p>

      {status === 'success' ? (
        <div className="text-center py-3 sm:py-4">
          <p className="text-sm sm:text-base text-green-600 font-semibold">
            ✅ Successfully subscribed! Check your email for confirmation.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <Input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full text-sm sm:text-base"
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email Address *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-sm sm:text-base"
            />
          </div>
          <Button
            type="submit"
            disabled={status === 'loading' || !email}
            className="w-full text-sm sm:text-base py-2 sm:py-3"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </Button>
          {status === 'error' && (
            <p className="text-red-600 text-xs sm:text-sm">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}

      <p className="text-xs text-muted-foreground mt-3 sm:mt-4">
        Join 10K+ business professionals who stay compliant
        and ahead of the curve
      </p>
    </div>
  );
}