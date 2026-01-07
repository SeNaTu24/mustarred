import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { trackPageView } from '@/lib/analytics';

/**
 * Hook to track page views in Google Analytics
 * Automatically sends page view events when the route changes
 */
export const usePageTracking = () => {
  const [location] = useLocation();

  useEffect(() => {
    trackPageView(location);
  }, [location]);
};