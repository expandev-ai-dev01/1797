import { Check } from 'lucide-react';
import type { VehicleFeaturesProps } from './types';

/**
 * @component VehicleFeatures
 * @summary Displays the vehicle's standard and optional features, categorized.
 * @internal Used by CarDetailPage
 */
export function VehicleFeatures({ features }: VehicleFeaturesProps) {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Itens e Opcionais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((category) => (
          <div key={category.category}>
            <h3 className="text-lg font-semibold mb-3">{category.category}</h3>
            <ul className="space-y-2">
              {category.items.map((item) => (
                <li key={item} className="flex items-center text-sm">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
