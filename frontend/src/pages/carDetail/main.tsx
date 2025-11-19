import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';

import { useCarDetail } from '@/domain/car/hooks/useCarDetail';
import { Button } from '@/core/components/ui/button';
import { Skeleton } from '@/core/components/ui/skeleton';
import { ContactForm } from '@/domain/contact/components';

import { VehicleGallery } from './_impl/VehicleGallery';
import { VehicleHeader } from './_impl/VehicleHeader';
import { VehicleSpecs } from './_impl/VehicleSpecs';
import { VehicleFeatures } from './_impl/VehicleFeatures';
import { SimilarVehicles } from './_impl/SimilarVehicles';

/**
 * @page CarDetailPage
 * @summary Displays detailed information about a specific vehicle.
 * @domain car
 * @type detail-page
 * @category public
 * @routing
 * - Path: /cars/:id
 * - Params: { id: string }
 */
export function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { car, isLoading, isError } = useCarDetail(id);

  if (isLoading) {
    return <CarDetailSkeleton />;
  }

  if (isError || !car) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Veículo não encontrado</h2>
        <p className="text-muted-foreground mb-6">
          O veículo que você está procurando não existe ou foi removido.
        </p>
        <Button asChild>
          <Link to="/cars">Voltar para o catálogo</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {car.brand} {car.model} {car.year} | Catálogo de Carros
        </title>
        <meta name="description" content={`Detalhes sobre o ${car.brand} ${car.model}.`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <Link
          to="/cars"
          className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para o catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VehicleGallery photos={car.photos} carTitle={`${car.brand} ${car.model}`} />
          </div>
          <div className="lg:col-span-1">
            <VehicleHeader car={car} />
          </div>
        </div>

        <div className="mt-12">
          <VehicleSpecs specifications={car.specifications} year={car.year} />
        </div>

        <div className="mt-12">
          <VehicleFeatures features={car.features} />
        </div>

        {car.similarCars && car.similarCars.length > 0 && (
          <div className="mt-12">
            <SimilarVehicles cars={car.similarCars} />
          </div>
        )}

        <div id="contact-form" className="mt-12 scroll-mt-20">
          <ContactForm carId={car.id} carModelTitle={`${car.brand} ${car.model} (${car.year})`} />
        </div>
      </div>
    </>
  );
}

function CarDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-6 w-48 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="w-full aspect-video rounded-lg" />
          <div className="grid grid-cols-5 gap-2">
            <Skeleton className="w-full aspect-video rounded" />
            <Skeleton className="w-full aspect-video rounded" />
            <Skeleton className="w-full aspect-video rounded" />
            <Skeleton className="w-full aspect-video rounded" />
            <Skeleton className="w-full aspect-video rounded" />
          </div>
        </div>
        <div className="lg:col-span-1 space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-6 w-1/4" />
          <div className="pt-4 space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Skeleton className="h-8 w-1/4 mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-6 w-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
