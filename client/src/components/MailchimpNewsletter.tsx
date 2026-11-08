import { useId, useState } from 'react';
import { trackFormSubmit } from '@/lib/analytics';
import './MailchimpNewsletter.css';

interface MailchimpNewsletterProps {
  variant?: "default" | "footer";
}

export default function MailchimpNewsletter({ variant = "default" }: MailchimpNewsletterProps) {
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
            FNAME: firstName || '',
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

  if (variant === "footer") {
    return (
      <div className="newsletter-signup-card newsletter-signup-card--footer">
        <p className="newsletter-signup-description">
          Get practical insights on compliance, regulation, and business growth in Africa.
        </p>
        {status === 'success' ? (
          <div role="status" className="newsletter-signup-message">
            <p>Thanks for subscribing! Check your inbox for a confirmation email.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="newsletter-signup-form newsletter-signup-form--compact"
            autoComplete="off"
            aria-label="Subscribe to email updates"
          >
            <label htmlFor={emailId} className="sr-only">
              Email address
            </label>
            <div className="newsletter-signup-pill">
              <input
                id={emailId}
                type="email"
                name="EMAIL"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="newsletter-signup-pill__input"
              />
              <button
                type="submit"
                disabled={status === 'loading' || !email}
                className="newsletter-signup-pill__submit"
                aria-label="Subscribe to newsletter"
              >
                {status === 'loading' ? (
                  <span className="newsletter-signup-pill__spinner" aria-hidden="true" />
                ) : (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
            {status === 'error' && (
              <p role="alert" className="newsletter-signup-error">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}
      </div>
    );
  }

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
          <input
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
          <input
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
          <button
            type="submit"
            disabled={status === 'loading' || !email}
            className="newsletter-signup-button"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
          {status === 'error' && (
            <p role="alert" className="newsletter-signup-error">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}
      <p className="newsletter-signup-proof">
        Get practical compliance insights and regulatory updates delivered to your inbox.
      </p>
    </div>
  );
}
