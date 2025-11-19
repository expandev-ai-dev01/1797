import { useQuery } from '@tanstack/react-query';
import { useQueryString } from '@/core/hooks/useQueryString';
import { carService } from '../../services';
import type { ListCarsParams } from '../../types';

const SORT_OPTIONS = {
  relevance: { sortBy: 'relevance', sortOrder: 'asc' },
  'price-asc': { sortBy: 'price', sortOrder: 'asc' },
  'price-desc': { sortBy: 'price', sortOrder: 'desc' },
  'year-desc': { sortBy: 'year', sortOrder: 'desc' },
  'year-asc': { sortBy: 'year', sortOrder: 'asc' },
  'model-asc': { sortBy: 'model', sortOrder: 'asc' },
  'model-desc': { sortBy: 'model', sortOrder: 'desc' },
} as const;

/**
 * @hook useCarList
 * @summary Manages the state and data fetching for the car catalog page.
 * @domain car
 * @type domain-hook
 * @category data
 */
export const useCarList = () => {
  const { searchParams, setParam, getParam, setArray, getArray } = useQueryString();

  // Filters
  const brands = getArray('brand');
  const models = getArray('model');
  const transmissions = getArray('transmission');
  const yearMin = getParam('yearMin');
  const yearMax = getParam('yearMax');
  const priceMin = getParam('priceMin');
  const priceMax = getParam('priceMax');

  // Sorting
  const sort = getParam('sort') || 'relevance';
  const { sortBy, sortOrder } =
    SORT_OPTIONS[sort as keyof typeof SORT_OPTIONS] || SORT_OPTIONS.relevance;

  // Pagination
  const page = parseInt(getParam('page') || '1', 10);
  const limit = parseInt(getParam('limit') || '12', 10);

  const params: ListCarsParams = {
    brand: brands.length > 0 ? brands : undefined,
    model: models.length > 0 ? models : undefined,
    transmission: transmissions.length > 0 ? transmissions : undefined,
    yearMin: yearMin ? Number(yearMin) : undefined,
    yearMax: yearMax ? Number(yearMax) : undefined,
    priceMin: priceMin ? Number(priceMin) : undefined,
    priceMax: priceMax ? Number(priceMax) : undefined,
    sortBy,
    sortOrder,
    page,
    limit,
  };

  const carsQuery = useQuery({
    queryKey: ['cars', params],
    queryFn: () => carService.listCars(params),
    placeholderData: (previousData) => previousData,
  });

  const filtersQuery = useQuery({
    queryKey: ['carFilters'],
    queryFn: carService.getFilterOptions,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return {
    // Data
    result: carsQuery.data,
    filterOptions: filtersQuery.data,

    // State
    isLoading: carsQuery.isLoading,
    isError: carsQuery.isError,
    isFetching: carsQuery.isFetching,
    isFiltersLoading: filtersQuery.isLoading,

    // Current Values
    currentParams: {
      brands,
      models,
      transmissions,
      yearMin,
      yearMax,
      priceMin,
      priceMax,
      sort,
      page,
      limit,
    },

    // Setters
    setters: {
      setBrands: (values: string[]) => setArray('brand', values),
      setModels: (values: string[]) => setArray('model', values),
      setTransmissions: (values: string[]) => setArray('transmission', values),
      setYearMin: (value: string | null) => setParam('yearMin', value),
      setYearMax: (value: string | null) => setParam('yearMax', value),
      setPriceMin: (value: string | null) => setParam('priceMin', value),
      setPriceMax: (value: string | null) => setParam('priceMax', value),
      setSort: (value: string) => setParam('sort', value),
      setPage: (value: number) => setParam('page', value),
      setLimit: (value: number) => {
        setParam('limit', value);
        setParam('page', 1); // Reset to page 1 when limit changes
      },
    },

    // Actions
    clearFilters: () => {
      const newParams = new URLSearchParams(searchParams);
      const keysToRemove = [
        'brand',
        'model',
        'transmission',
        'yearMin',
        'yearMax',
        'priceMin',
        'priceMax',
      ];
      keysToRemove.forEach((key) => newParams.delete(key));
      setParam('page', 1);
    },
  };
};
