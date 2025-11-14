import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function MailchimpNewsletter() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Create a hidden form and submit it to bypass CORS issues
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://mustarred.us12.list-manage.com/subscribe/post?u=cdd12424c1d674fa391e8e63e&id=22107e23a3&f_id=00f4e7e0f0';
    form.target = '_blank';

    const emailInput = document.createElement('input');
    emailInput.type = 'hidden';
    emailInput.name = 'EMAIL';
    emailInput.value = email;
    form.appendChild(emailInput);

    const fnameInput = document.createElement('input');
    fnameInput.type = 'hidden';
    fnameInput.name = 'FNAME';
    fnameInput.value = firstName;
    form.appendChild(fnameInput);

    const tagsInput = document.createElement('input');
    tagsInput.type = 'hidden';
    tagsInput.name = 'tags';
    tagsInput.value = '12386815';
    form.appendChild(tagsInput);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    setStatus('success');
    setEmail('');
    setFirstName('');
  };

  return (
    <div className="p-8 rounded-lg bg-card">
      <h3 className="text-2xl font-bold mb-4">
        Get Exclusive Insights to Stay Ahead
      </h3>
      <p className="text-muted-foreground mb-6">
        Stay ahead of the curve with the latest compliance
        insights, regulatory updates, and expert guidance
        delivered to your inbox.
      </p>

      {status === 'success' ? (
        <div className="text-center py-4">
          <p className="text-green-600 font-semibold">
            ✅ Successfully subscribed! Check your email for confirmation.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email Address *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            disabled={status === 'loading' || !email}
            className="w-full"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </Button>
          {status === 'error' && (
            <p className="text-red-600 text-sm">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}

      <p className="text-xs text-muted-foreground mt-4">
        Join 10K+ business professionals who stay compliant
        and ahead of the curve
      </p>
    </div>
  );
}