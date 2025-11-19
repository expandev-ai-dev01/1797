import { cars as carDetailsData } from './carData';
import { Car, CarDetail, ListCarsParams, PaginatedCarList, FilterOptions } from './carTypes';

// Helper to map detailed car data to the simpler Car type for lists
const mapToCarListItem = (detail: CarDetail): Car => ({
  id: detail.id,
  model: detail.specifications.model,
  brand: detail.specifications.brand,
  year: detail.specifications.yearModel,
  price: detail.price,
  imageUrl: detail.principalImageUrl,
  mileage: detail.specifications.mileage,
  transmission: detail.specifications.transmission,
});

export const listCars = (params: ListCarsParams): PaginatedCarList => {
  let filteredCars: CarDetail[] = [...carDetailsData];

  // Filtering
  if (params.brand && params.brand.length > 0) {
    filteredCars = filteredCars.filter((car) => params.brand!.includes(car.specifications.brand));
  }
  if (params.model && params.model.length > 0) {
    filteredCars = filteredCars.filter((car) => params.model!.includes(car.specifications.model));
  }
  if (params.yearMin) {
    filteredCars = filteredCars.filter((car) => car.specifications.yearModel >= params.yearMin!);
  }
  if (params.yearMax) {
    filteredCars = filteredCars.filter((car) => car.specifications.yearModel <= params.yearMax!);
  }
  if (params.priceMin) {
    filteredCars = filteredCars.filter((car) => car.price >= params.priceMin!);
  }
  if (params.priceMax) {
    filteredCars = filteredCars.filter((car) => car.price <= params.priceMax!);
  }
  if (params.transmission && params.transmission.length > 0) {
    filteredCars = filteredCars.filter((car) =>
      params.transmission!.includes(car.specifications.transmission)
    );
  }

  // Sorting
  const { sortBy = 'relevance', sortOrder = 'asc' } = params;
  if (sortBy !== 'relevance') {
    filteredCars.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'year':
          comparison = a.specifications.yearModel - b.specifications.yearModel;
          // For year, descending is 'newer', ascending is 'older'
          return sortOrder === 'desc' ? comparison * -1 : comparison;
        case 'model':
          comparison = a.specifications.model.localeCompare(b.specifications.model);
          break;
      }
      return sortOrder === 'desc' ? comparison * -1 : comparison;
    });
  }

  // Pagination
  const page = params.page || 1;
  const limit = params.limit || 12;
  const total = filteredCars.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;

  const paginatedCarDetails = filteredCars.slice(offset, offset + limit);

  return {
    cars: paginatedCarDetails.map(mapToCarListItem),
    total,
    page,
    limit,
    totalPages,
  };
};

export const getFilterOptions = (): FilterOptions => {
  const brands = [...new Set(carDetailsData.map((car) => car.specifications.brand))].sort();
  const models = [...new Set(carDetailsData.map((car) => car.specifications.model))].sort();
  const transmissions = [
    ...new Set(carDetailsData.map((car) => car.specifications.transmission)),
  ].sort() as FilterOptions['transmissions'];

  const years = carDetailsData.map((car) => car.specifications.yearModel);
  const prices = carDetailsData.map((car) => car.price);

  const yearRange = {
    min: years.length > 0 ? Math.min(...years) : 0,
    max: years.length > 0 ? Math.max(...years) : 0,
  };

  const priceRange = {
    min: prices.length > 0 ? Math.min(...prices) : 0,
    max: prices.length > 0 ? Math.max(...prices) : 0,
  };

  return {
    brands,
    models,
    transmissions,
    yearRange,
    priceRange,
  };
};

/**
 * @summary Retrieves the full details for a single car by its ID.
 * @param id The ID of the car to retrieve.
 * @returns The car details object or undefined if not found.
 */
export const getCarById = (id: string): CarDetail | undefined => {
  return carDetailsData.find((car) => car.id === id);
};

/**
 * @summary Finds vehicles similar to the one provided.
 * @param currentCar The car to find similar ones for.
 * @returns An array of similar cars (list item format).
 */
export const getSimilarCars = (currentCar: CarDetail): Car[] => {
  const priceTolerance = 0.15; // 15% price difference
  const minPrice = currentCar.price * (1 - priceTolerance);
  const maxPrice = currentCar.price * (1 + priceTolerance);

  const similar = carDetailsData
    .filter((car) => {
      // Exclude the car itself and sold cars
      if (car.id === currentCar.id || car.status === 'Vendido') {
        return false;
      }
      // Prioritize same brand and similar price
      if (
        car.specifications.brand === currentCar.specifications.brand &&
        car.price >= minPrice &&
        car.price <= maxPrice
      ) {
        return true;
      }
      // Fallback to same body type and similar price
      if (
        car.specifications.bodyType === currentCar.specifications.bodyType &&
        car.price >= minPrice &&
        car.price <= maxPrice
      ) {
        return true;
      }
      return false;
    })
    .slice(0, 6) // Max 6 similar cars
    .map(mapToCarListItem);

  return similar;
};
