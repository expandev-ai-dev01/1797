import type { CarFiltersOptions } from '@/domain/car/types';

export interface CarFiltersProps {
  options: CarFiltersOptions | undefined;
  params: {
    brands: string[];
    models: string[];
    yearMin: string | null;
    yearMax: string | null;
    priceMin: string | null;
    priceMax: string | null;
    transmissions: string[];
  };
  setters: {
    setBrands: (values: string[]) => void;
    setModels: (values: string[]) => void;
    setYearMin: (value: string | null) => void;
    setYearMax: (value: string | null) => void;
    setPriceMin: (value: string | null) => void;
    setPriceMax: (value: string | null) => void;
    setTransmissions: (values: string[]) => void;
    setPage: (page: number) => void;
  };
  isLoading: boolean;
}
