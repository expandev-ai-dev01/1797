import { Link } from 'react-router-dom';
import { Calendar, Gauge, GitCommitHorizontal } from 'lucide-react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/core/components/ui/card';
import { formatCurrency, formatKilometers } from '@/core/utils/formatters';
import type { CarCardProps } from './types';

/**
 * @component CarCard
 * @summary Displays a single vehicle's information in a card format.
 * @domain car
 * @type ui-component
 * @category display
 */
export function CarCard({ car }: CarCardProps) {
  return (
    <Link to={`/cars/${car.id}`} className="block h-full">
      <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        <CardHeader className="p-0">
          <img
            src={car.imageUrl || 'https://via.placeholder.com/300x169'}
            alt={`${car.brand} ${car.model}`}
            className="aspect-[16/9] w-full object-cover"
            loading="lazy"
          />
        </CardHeader>
        <CardContent className="flex flex-1 flex-col p-4">
          <CardTitle className="text-lg font-bold">
            {car.brand} {car.model}
          </CardTitle>
          <div className="mt-4 flex flex-1 flex-col justify-between">
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Ano: {car.year}</span>
              </div>
              {car.mileage != null && (
                <div className="flex items-center">
                  <Gauge className="mr-2 h-4 w-4" />
                  <span>{formatKilometers(car.mileage)}</span>
                </div>
              )}
              {car.transmission && (
                <div className="flex items-center">
                  <GitCommitHorizontal className="mr-2 h-4 w-4" />
                  <span>{car.transmission}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-xl font-semibold text-primary">{formatCurrency(car.price)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
