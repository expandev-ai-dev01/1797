import { Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      {/* Header can go here */}
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      {/* Footer can go here */}
    </div>
  );
}
