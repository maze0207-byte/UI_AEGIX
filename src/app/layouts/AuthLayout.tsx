import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-neutral-900 items-center justify-center">
      <Outlet />
    </div>
  );
};