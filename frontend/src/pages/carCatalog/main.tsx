import { Helmet } from 'react-helmet-async';
import { useCarList } from '@/domain/car/hooks/useCarList';
import { CarFilters } from './_impl/CarFilters';
import { CarGrid } from './_impl/CarGrid';
import { CatalogHeader } from './_impl/CatalogHeader';
import { Pagination } from './_impl/Pagination';

/**
 * @page CarCatalogPage
 * @summary Displays the vehicle catalog with filtering, sorting, and pagination.
 * @domain car
 * @type list-page
 * @category public
 * @routing
 * - Path: /cars
 */
export function CarCatalogPage() {
  const { result, filterOptions, isLoading, isError, isFiltersLoading, currentParams, setters } =
    useCarList();

  return (
    <>
      <Helmet>
        <title>Catálogo de Veículos | Catálogo de Carros</title>
        <meta name="description" content="Explore nosso catálogo de veículos." />
      </Helmet>
      <div className="flex flex-col lg:flex-row">
        <CarFilters
          options={filterOptions?.data}
          params={currentParams}
          setters={setters}
          isLoading={isFiltersLoading || isLoading}
        />
        <div className="w-full lg:w-3/4">
          <CatalogHeader
            total={result?.metadata.total}
            sort={currentParams.sort}
            setSort={setters.setSort}
          />
          <CarGrid
            result={result}
            isLoading={isLoading}
            isError={isError}
            limit={currentParams.limit}
          />
          <Pagination metadata={result?.metadata} setPage={setters.setPage} />
        </div>
      </div>
    </>
  );
}
