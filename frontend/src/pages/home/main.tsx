import { Helmet } from 'react-helmet-async';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home | Catálogo de Carros</title>
      </Helmet>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to the Car Catalog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          This is the base structure. Start building your features!
        </p>
      </div>
    </>
  );
}
