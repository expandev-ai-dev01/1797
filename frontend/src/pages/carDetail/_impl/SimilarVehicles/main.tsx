import { CarCard } from '@/domain/car/components/CarCard';
import type { SimilarVehiclesProps } from './types';

/**
 * @component SimilarVehicles
 * @summary Displays a section with vehicles similar to the one being viewed.
 * @internal Used by CarDetailPage
 */
export function SimilarVehicles({ cars }: SimilarVehiclesProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Veículos Similares</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
