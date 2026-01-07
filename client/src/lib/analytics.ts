// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Common events
export const trackButtonClick = (buttonName: string) => {
  trackEvent('click', {
    event_category: 'engagement',
    event_label: buttonName
  });
};

export const trackFormSubmit = (formName: string) => {
  trackEvent('form_submit', {
    event_category: 'conversion',
    event_label: formName
  });
};

export const trackDownload = (fileName: string) => {
  trackEvent('file_download', {
    event_category: 'engagement',
    event_label: fileName
  });
};

export const trackPageView = (path: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-RQ3J9MKB9E', {
      page_path: path
    });
  }
};