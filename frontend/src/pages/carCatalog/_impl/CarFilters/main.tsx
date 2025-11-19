import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
import { CarFiltersProps } from './types';

/**
 * @component CarFilters
 * @summary Sidebar component for filtering the car catalog.
 * @internal Used by CarCatalogPage
 */
export function CarFilters({ options, params, setters, isLoading }: CarFiltersProps) {
  const handleClear = () => {
    // A more complete clear would be needed if setters.clearFilters is not available
    setters.setBrands([]);
    setters.setModels([]);
    setters.setYearMin(null);
    setters.setYearMax(null);
    setters.setPriceMin(null);
    setters.setPriceMax(null);
    setters.setTransmissions([]);
    setters.setPage(1);
  };

  return (
    <aside className="w-full lg:w-1/4 lg:pr-8">
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Filtros</h3>
        <div className="mt-4 space-y-6">
          {/* Brand Filter */}
          <div>
            <Label htmlFor="brand-select">Marca</Label>
            <Select
              value={params.brands?.[0] || ''}
              onValueChange={(value: string) => setters.setBrands(value ? [value] : [])}
              disabled={isLoading || !options?.brands}
            >
              <SelectTrigger id="brand-select">
                <SelectValue placeholder="Todas as marcas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas as marcas</SelectItem>
                {options?.brands?.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Model Filter */}
          <div>
            <Label htmlFor="model-select">Modelo</Label>
            <Select
              value={params.models?.[0] || ''}
              onValueChange={(value: string) => setters.setModels(value ? [value] : [])}
              disabled={isLoading || !options?.models}
            >
              <SelectTrigger id="model-select">
                <SelectValue placeholder="Todos os modelos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os modelos</SelectItem>
                {options?.models?.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year Filter */}
          <div className="space-y-2">
            <Label>Ano</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={params.yearMin || ''}
                onChange={(e) => setters.setYearMin(e.target.value)}
                disabled={isLoading}
              />
              <span>-</span>
              <Input
                type="number"
                placeholder="Max"
                value={params.yearMax || ''}
                onChange={(e) => setters.setYearMax(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Price Filter */}
          <div className="space-y-2">
            <Label>Preço</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={params.priceMin || ''}
                onChange={(e) => setters.setPriceMin(e.target.value)}
                disabled={isLoading}
              />
              <span>-</span>
              <Input
                type="number"
                placeholder="Max"
                value={params.priceMax || ''}
                onChange={(e) => setters.setPriceMax(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <Button onClick={handleClear} variant="outline" className="w-full">
            Limpar Filtros
          </Button>
        </div>
      </div>
    </aside>
  );
}
