import { useQuery } from '@tanstack/react-query';
import { carService } from '../../services';

/**
 * @hook useCarDetail
 * @summary Manages the state and data fetching for the car detail page.
 * @domain car
 * @type domain-hook
 * @category data
 */
export const useCarDetail = (carId: string | undefined) => {
  const carDetailQuery = useQuery({
    queryKey: ['car', carId],
    queryFn: () => carService.getCarById(carId!),
    enabled: !!carId, // Only run the query if carId is defined
  });

  return {
    result: carDetailQuery.data,
    car: carDetailQuery.data?.data,
    isLoading: carDetailQuery.isLoading,
    isError: carDetailQuery.isError,
    error: carDetailQuery.error,
  };
};
