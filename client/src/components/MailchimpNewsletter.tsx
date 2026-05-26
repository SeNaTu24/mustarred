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

    try {
      const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          fields: { name: firstName },
        }),
      });

      if (response.ok || response.status === 200 || response.status === 201) {
        setStatus('success');
        setEmail('');
        setFirstName('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 rounded-lg bg-card">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">
        Get Exclusive Insights to Stay Ahead
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
        Stay ahead of the curve with the latest compliance insights, regulatory updates, and expert guidance delivered to your inbox.
      </p>

      {status === 'success' ? (
        <div className="text-center py-3 sm:py-4">
          <p className="text-sm sm:text-base text-green-600 font-semibold">
            ✅ Thank you for subscribing! You're all set.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full text-sm sm:text-base"
          />
          <Input
            type="email"
            placeholder="Email Address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full text-sm sm:text-base"
          />
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
        Join 10K+ business professionals who stay compliant and ahead of the curve
      </p>
    </div>
  );
}
