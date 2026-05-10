declare module 'mfeDashboard/*';
declare module 'mfeAnalytics/*';

// Generic remote container types (optional helpers)
declare interface Window {
  mfeDashboard?: any;
  mfeAnalytics?: any;
  __MFE_CONFIG__?: Record<string, string>;
}
