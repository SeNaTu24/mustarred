import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function MailchimpNewsletter() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData();
    formData.append('EMAIL', email);
    formData.append('FNAME', firstName);
    formData.append('tags', '12386815');

    try {
      await fetch(
        'https://mustarred.us12.list-manage.com/subscribe/post?u=cdd12424c1d674fa391e8e63e&id=22107e23a3&f_id=00f4e7e0f0',
        {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        }
      );
      
      setStatus('success');
      setEmail('');
      setFirstName('');
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
      setStatus('error');
    } finally {
      // Ensure loading state is cleared
      if (status === 'loading') {
        setTimeout(() => setStatus('idle'), 100);
      }
    }
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