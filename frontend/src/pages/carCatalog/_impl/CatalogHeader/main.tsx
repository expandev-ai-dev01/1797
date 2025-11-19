import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
import type { CatalogHeaderProps } from './types';

const sortOptions = [
  { value: 'relevance', label: 'Relevância' },
  { value: 'price-asc', label: 'Preço (menor para maior)' },
  { value: 'price-desc', label: 'Preço (maior para menor)' },
  { value: 'year-desc', label: 'Ano (mais recente)' },
  { value: 'year-asc', label: 'Ano (mais antigo)' },
  { value: 'model-asc', label: 'Modelo (A-Z)' },
  { value: 'model-desc', label: 'Modelo (Z-A)' },
];

/**
 * @component CatalogHeader
 * @summary Displays the results count and sorting options for the catalog.
 * @internal Used by CarCatalogPage
 */
export function CatalogHeader({ total, sort, setSort }: CatalogHeaderProps) {
  return (
    <div className="mb-6 flex flex-col items-baseline justify-between gap-4 sm:flex-row sm:items-center">
      <p className="text-sm text-muted-foreground">{total ?? 0} veículos encontrados</p>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Ordenar por:</span>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
