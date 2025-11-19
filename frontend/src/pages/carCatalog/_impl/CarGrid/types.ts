import type { PaginatedResponse, Car } from '@/domain/car/types';

export interface CarGridProps {
  result: PaginatedResponse<Car> | undefined;
  isLoading: boolean;
  isError: boolean;
  limit: number;
}
