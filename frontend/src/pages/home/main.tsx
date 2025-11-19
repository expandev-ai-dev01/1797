import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/core/components/ui/button';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home | Catálogo de Carros</title>
      </Helmet>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to the Car Catalog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore our amazing collection of vehicles.
        </p>
        <Button asChild className="mt-8">
          <Link to="/cars">View Catalog</Link>
        </Button>
      </div>
    </>
  );
}
