import { builder, Builder } from '@builder.io/react';

// Your Builder.io Public API Key
const BUILDER_API_KEY = 'e816f56c92f3416da995c3ac63a4f9de';

// Initialize Builder with your API key
builder.init(BUILDER_API_KEY);

// Set default targeting attributes
builder.setUserAttributes({
  urlPath: window.location.pathname,
  host: window.location.host,
  device: navigator.userAgent.indexOf('Mobile') !== -1 ? 'mobile' : 'desktop'
});

// Helper function to check if we're in editing mode
export const isEditing = () => {
  return Boolean(
    new URLSearchParams(window.location.search).get('builder.preview') === 'true' ||
    new URLSearchParams(window.location.search).get('builder.frameEditing') === 'true'
  );
};

// Helper to generate URLs for Builder.io preview
export const getBuilderSearchParams = (path) => {
  return `?builder.preview=${isEditing()}&builder.frameEditing=true&builder.overrideUrl=${encodeURIComponent(
    path
  )}`;
};

// Configure Builder.io options
Builder.isStatic = true; // Important for static site generation if you use it later

export { builder, Builder };
