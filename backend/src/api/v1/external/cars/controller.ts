import { Request, Response, NextFunction } from 'express';
import * as carService from '@/services/car/carService';
import { successResponse } from '@/utils/apiResponse';
import { ListCarsParams } from '@/services/car/carTypes';

/**
 * @summary Handles the request to list cars with filtering, sorting, and pagination.
 */
export const listCarsHandler = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // The validation middleware has already parsed, coerced, and placed the values in req.query.
    const params = req.query as unknown as ListCarsParams;

    const result = carService.listCars(params);

    const metadata = {
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages,
    };

    res.status(200).json(successResponse(result.cars, metadata));
  } catch (error) {
    next(error);
  }
};

/**
 * @summary Handles the request to get available filter options for cars.
 */
export const getFiltersHandler = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const filterOptions = carService.getFilterOptions();
    res.status(200).json(successResponse(filterOptions));
  } catch (error) {
    next(error);
  }
};

/**
 * @summary Handles the request to get a single car's details by its ID.
 */
export const getCarByIdHandler = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { id } = req.params;
    const car = carService.getCarById(id);

    if (!car) {
      const error: any = new Error('Car not found');
      error.status = 404;
      return next(error);
    }

    const similarCars = carService.getSimilarCars(car);

    const responseData = {
      ...car,
      similarCars,
    };

    res.status(200).json(successResponse(responseData));
  } catch (error) {
    next(error);
  }
};
