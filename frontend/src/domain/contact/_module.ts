/**
 * @module contact
 * @summary Module manifest for the contact domain.
 * @domain functional
 * @version 1.0.0
 */
export const moduleManifest = {
  name: 'contact',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: ['ContactForm'],
  publicHooks: ['useContactForm'],
  publicServices: ['contactService'],
  dependencies: {
    internal: ['@/core/lib/api', '@/core/hooks/use-toast'],
    external: ['@tanstack/react-query', 'react'],
    domains: ['car'],
  },
  exports: {
    components: ['ContactForm'],
    hooks: ['useContactForm'],
    services: ['contactService'],
    types: ['ContactFormData'],
  },
} as const;
