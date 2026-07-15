import { Outlet, useLocation } from 'react-router-dom';
import { LeftNavigation } from '../components/LeftNavigation';
import { TopHeader } from '../components/TopHeader';

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const pageTitle = location.pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'dashboard';

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-100">
      <LeftNavigation />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopHeader title={pageTitle} />

        <main className="flex-1 overflow-auto bg-neutral-950 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};