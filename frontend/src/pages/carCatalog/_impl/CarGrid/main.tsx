import { CarCard } from '@/domain/car/components/CarCard';
import { Skeleton } from '@/core/components/ui/skeleton';
import type { CarGridProps } from './types';

/**
 * @component CarGrid
 * @summary Displays a grid of car cards, loading skeletons, or messages.
 * @internal Used by CarCatalogPage
 */
export function CarGrid({ result, isLoading, isError, limit }: CarGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: limit }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="h-[169px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-destructive">
        Ocorreu um erro ao carregar os veículos. Por favor, tente novamente.
      </div>
    );
  }

  if (!result || result.data.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        Não encontramos veículos com os filtros selecionados. Tente remover alguns filtros ou
        alterar os critérios de busca para ampliar os resultados.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {result.data.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
