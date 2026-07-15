import { Link } from 'react-router-dom';
import { ShieldX } from 'lucide-react';

export const AccessDeniedPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 py-16 text-neutral-100">
      <div className="w-full max-w-lg rounded-sm border border-neutral-800 bg-neutral-900 p-8 shadow-sm">
        <div className="flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-danger-500/15 text-danger-400">
            <ShieldX className="h-6 w-6" />
          </div>
        </div>
        <p className="mt-4 text-center text-sm font-semibold uppercase tracking-[0.24em] text-danger-400">403</p>
        <h1 className="mt-3 text-center text-3xl font-semibold">Access Denied</h1>
        <p className="mt-3 text-center text-sm leading-6 text-neutral-400">
          You do not have the required permissions to access this page. Please contact your administrator if you believe this is an error.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center rounded-sm bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};