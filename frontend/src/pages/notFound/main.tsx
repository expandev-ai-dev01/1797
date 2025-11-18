import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <h1 className="text-9xl font-bold">404</h1>
        <p className="mt-4 text-2xl text-muted-foreground">Page Not Found</p>
        <Link to="/" className="mt-8 text-primary hover:underline">
          Go back to Home
        </Link>
      </div>
    </>
  );
}
