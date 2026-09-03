/**
 * Google Analytics 4 (GA4) Event & Pageview Engine
 * ZetaVex Tech Solutions
 */

export const GA_MEASUREMENT_ID = 
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 
  process.env.NEXT_PUBLIC_GA_ID || 
  '';

// Track Page Views on dynamic client-side SPA route changes
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag && GA_MEASUREMENT_ID) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

type GTagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
};

// Track Custom Conversions & User Interactions (Form submissions, WhatsApp clicks, etc.)
export const trackEvent = ({ action, category, label, value, ...rest }: GTagEvent) => {
  if (typeof window !== 'undefined' && (window as any).gtag && GA_MEASUREMENT_ID) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...rest,
    });
  }
};
