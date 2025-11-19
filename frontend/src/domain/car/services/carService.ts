import { apiClient } from '@/core/lib/api';
import type {
  Car,
  CarDetail,
  ListCarsParams,
  CarFiltersOptions,
  PaginatedResponse,
} from '../types';

/**
 * @service carService
 * @summary Provides methods for car-related backend operations.
 * @domain car
 * @type rest-service
 */
export const carService = {
  /**
   * @endpoint GET /external/cars
   * @summary Fetches a paginated list of cars with filters and sorting.
   * @param {ListCarsParams} params - Filtering, sorting, and pagination parameters.
   * @returns {Promise<PaginatedResponse<Car>>} A paginated list of cars.
   */
  async listCars(params: ListCarsParams): Promise<PaginatedResponse<Car>> {
    // Convert array params to comma-separated strings for the API
    const queryParams = {
      ...params,
      brand: params.brand?.join(','),
      model: params.model?.join(','),
      transmission: params.transmission?.join(','),
    };

    // Remove undefined fields to keep URL clean
    Object.keys(queryParams).forEach(
      (key) =>
        queryParams[key as keyof typeof queryParams] === undefined &&
        delete queryParams[key as keyof typeof queryParams]
    );

    return apiClient.get('/external/cars', { params: queryParams });
  },

  /**
   * @endpoint GET /external/cars/filters
   * @summary Fetches available filter options for the car catalog.
   * @returns {Promise<{data: CarFiltersOptions}>} Available filter options.
   */
  async getFilterOptions(): Promise<{ data: CarFiltersOptions }> {
    return apiClient.get('/external/cars/filters');
  },

  /**
   * @endpoint GET /external/cars/{id}
   * @summary Fetches a single car's details by its ID.
   * @param {string} id - The ID of the car.
   * @returns {Promise<{data: CarDetail}>} The detailed car object.
   */
  async getCarById(id: string): Promise<{ data: CarDetail }> {
    return apiClient.get(`/external/cars/${id}`);
  },
};
