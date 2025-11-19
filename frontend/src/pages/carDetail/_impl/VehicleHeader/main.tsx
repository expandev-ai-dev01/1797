import { Button } from '@/core/components/ui/button';
import { Badge } from '@/core/components/ui/badge';
import { formatCurrency } from '@/core/utils/formatters';
import type { VehicleHeaderProps } from './types';

/**
 * @component VehicleHeader
 * @summary Displays the main information of the vehicle like title, price, and status.
 * @internal Used by CarDetailPage
 */
export function VehicleHeader({ car }: VehicleHeaderProps) {
  const getStatusVariant = () => {
    switch (car.status) {
      case 'Disponível':
        return 'default';
      case 'Reservado':
        return 'secondary';
      case 'Vendido':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm sticky top-6">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl lg:text-3xl font-bold">
          {car.brand} {car.model}
        </h1>
        <Badge variant={getStatusVariant()}>{car.status}</Badge>
      </div>
      <p className="text-lg text-muted-foreground mt-1">{car.year}</p>
      <p className="text-3xl font-bold text-primary mt-4">{formatCurrency(car.price)}</p>

      <div className="mt-6 space-y-3">
        <Button asChild size="lg" className="w-full">
          <a href="#contact-form">Tenho Interesse</a>
        </Button>
        <Button size="lg" variant="outline" className="w-full">
          Simular Financiamento
        </Button>
      </div>
    </div>
  );
}
