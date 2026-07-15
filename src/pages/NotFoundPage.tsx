import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 py-16 text-neutral-100">
      <div className="w-full max-w-lg rounded-sm border border-neutral-800 bg-neutral-900 p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-400">404</p>
        <h1 className="mt-3 text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm leading-6 text-neutral-400">
          The route you requested does not exist in the current AEGIX workspace. Return to the dashboard to continue managing your environment.
        </p>
        <div className="mt-6">
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