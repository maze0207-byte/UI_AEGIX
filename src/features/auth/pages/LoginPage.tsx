/**
 * AEGIX Login Page
 * Premium enterprise login page
 */

import { LoginForm } from '../components/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 p-4">
      <LoginForm />
    </div>
  );
};