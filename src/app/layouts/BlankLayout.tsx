import { Outlet } from 'react-router-dom';

export const BlankLayout: React.FC = () => {
  return (
    <div className="h-screen bg-neutral-900 text-neutral-100">
      <Outlet />
    </div>
  );
};