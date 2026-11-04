import { useId, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trackFormSubmit } from '@/lib/analytics';
import './MailchimpNewsletter.css';

export default function MailchimpNewsletter() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const firstNameId = useId();
  const emailId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    trackFormSubmit('Newsletter Signup');

    try {
      const response = await fetch(
        'https://mustarred.us12.list-manage.com/subscribe/post',
        {
          method: 'POST',
          body: new URLSearchParams({
            u: 'cdd12424c1d674fa391e8e63e',
            id: '22107e23a3',
            FNAME: firstName,
            EMAIL: email,
          }),
          mode: 'no-cors',
        },
      );

      if (response.ok || response.type === 'opaque') {
        setStatus('success');
        setFirstName('');
        setEmail('');
      } else {
        console.error('Newsletter signup failed:', response.status);
        setStatus('error');
      }
    } catch (error) {
      console.error('Newsletter signup request failed:', error);
      setStatus('error');
    }
  };

  return (
    <div className="newsletter-signup-card">
      <p className="newsletter-signup-description">
        Stay ahead of the curve with the latest compliance insights, regulatory
        updates, and expert guidance delivered to your inbox.
      </p>
      {status === 'success' ? (
        <div role="status" className="newsletter-signup-message">
          <p>Thanks for subscribing! Check your inbox for a confirmation email.</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="newsletter-signup-form"
          autoComplete="off"
          aria-label="Subscribe to email updates"
        >
          <label htmlFor={firstNameId} className="sr-only">
            First name
          </label>
          <Input
            id={firstNameId}
            type="text"
            name="FNAME"
            placeholder="Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            autoComplete="given-name"
            className="newsletter-signup-input"
          />
          <label htmlFor={emailId} className="sr-only">
            Email address
          </label>
          <Input
            id={emailId}
            type="email"
            name="EMAIL"
            placeholder="Email Address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
            className="newsletter-signup-input"
          />
          <Button
            type="submit"
            disabled={status === 'loading' || !email}
            className="newsletter-signup-button"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </Button>
          {status === 'error' && (
            <p role="alert" className="newsletter-signup-error">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}
      <p className="newsletter-signup-proof">
        Join 10K+ business professionals who stay compliant and ahead of the
        curve
      </p>
    </div>
  );
}
