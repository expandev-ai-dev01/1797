import {
  Calendar,
  Gauge,
  Fuel,
  GitCommitHorizontal,
  Cog,
  Paintbrush,
  DoorOpen,
  Car,
  Hash,
} from 'lucide-react';
import { formatKilometers } from '@/core/utils/formatters';
import type { VehicleSpecsProps } from './types';

/**
 * @component VehicleSpecs
 * @summary Displays the technical specifications of the vehicle.
 * @internal Used by CarDetailPage
 */
export function VehicleSpecs({ specifications, year }: VehicleSpecsProps) {
  const specs = [
    {
      icon: Calendar,
      label: 'Ano',
      value: `${specifications.yearManufacture}/${year}`,
    },
    { icon: Gauge, label: 'Quilometragem', value: formatKilometers(specifications.mileage) },
    { icon: Fuel, label: 'Combustível', value: specifications.fuel },
    { icon: GitCommitHorizontal, label: 'Câmbio', value: specifications.transmission },
    {
      icon: Cog,
      label: 'Motor',
      value: `${specifications.engineSize} (${specifications.enginePower})`,
    },
    { icon: Paintbrush, label: 'Cor', value: specifications.color },
    { icon: DoorOpen, label: 'Portas', value: specifications.doors },
    { icon: Car, label: 'Carroceria', value: specifications.bodyStyle },
    { icon: Hash, label: 'Final da placa', value: specifications.plateEnd },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Especificações Técnicas</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
        {specs.map((spec) => (
          <div key={spec.label} className="flex items-start">
            <spec.icon className="w-5 h-5 mr-3 mt-1 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">{spec.label}</p>
              <p className="font-semibold">{spec.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
