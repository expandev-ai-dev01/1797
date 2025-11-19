/**
 * @module car
 * @summary Module manifest for the car domain.
 * @domain functional
 * @version 1.0.0
 */
export const moduleManifest = {
  name: 'car',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: ['CarCard'],
  publicHooks: ['useCarList'],
  publicServices: ['carService'],
  dependencies: {
    internal: ['@/core/lib/api', '@/core/hooks/useQueryString'],
    external: ['@tanstack/react-query'],
    domains: [],
  },
  exports: {
    components: ['CarCard'],
    hooks: ['useCarList'],
    services: ['carService'],
    types: ['Car', 'ListCarsParams', 'CarFiltersOptions'],
  },
} as const;
