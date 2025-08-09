// Augment the global Window interface so TS recognizes AwsWafIntegration
declare global {
  interface Window {
    AwsWafIntegration?: {
      // getToken returns a Promise that resolves to a string.
      getToken: () => Promise<string>;
    };
  }
}

// You must export something or convert this file into a module.
export {};
