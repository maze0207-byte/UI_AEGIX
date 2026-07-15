/**
 * AEGIX Login Form Component
 * Production-ready login form for enterprise authentication
 */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { loginSchema, type LoginFormData } from '../validation/loginSchema';
import { useAuth } from '../hooks/useAuth';

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch {
      // Error is handled by the store
    }
  };

  return (
    <div className="w-full max-w-sm">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="/logo.png"
          alt="AEGIX"
          className="h-12 w-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-neutral-100">AEGIX</h1>
        <p className="text-sm text-neutral-400 mt-1">
          Enterprise Asset Protection Platform
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-danger-500/10 border border-danger-500/20 rounded-sm">
          <p className="text-sm font-semibold text-danger-500">{error.title}</p>
          <p className="text-xs text-neutral-300 mt-1">{error.description}</p>
          {error.recoveryAction && (
            <p className="text-xs text-neutral-400 mt-2">{error.recoveryAction}</p>
          )}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Username/Email Field */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-neutral-300 mb-1">
            Username or Email
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username or email"
            disabled={isLoading}
            className={`
              w-full px-3 py-2 text-sm bg-neutral-800 border rounded-sm text-neutral-100 
              placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 
              focus:ring-offset-2 focus:ring-offset-neutral-900 disabled:opacity-50
              ${errors.username ? 'border-danger-500' : 'border-neutral-700'}
            `}
            aria-invalid={errors.username ? 'true' : 'false'}
            aria-describedby={errors.username ? 'username-error' : undefined}
            {...register('username')}
          />
          {errors.username && (
            <p id="username-error" className="text-xs text-danger-500 mt-1" role="alert">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              disabled={isLoading}
              className={`
                w-full px-3 py-2 pr-10 text-sm bg-neutral-800 border rounded-sm text-neutral-100 
                placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 
                focus:ring-offset-2 focus:ring-offset-neutral-900 disabled:opacity-50
                ${errors.password ? 'border-danger-500' : 'border-neutral-700'}
              `}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-100"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" className="text-xs text-danger-500 mt-1" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center">
          <input
            id="rememberMe"
            type="checkbox"
            disabled={isLoading}
            className="w-4 h-4 bg-neutral-800 border border-neutral-700 rounded-sm text-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
            {...register('rememberMe')}
          />
          <label htmlFor="rememberMe" className="ml-2 text-sm text-neutral-300">
            Remember Me
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-500 border border-primary-500 rounded-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <span className="text-neutral-100">Signing In...</span>
          ) : (
            <>
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </>
          )}
        </button>

        {/* Forgot Password Placeholder */}
        <div className="text-center">
          <button
            type="button"
            className="text-sm text-primary-500 hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded-sm"
            disabled={isLoading}
          >
            Forgot Password?
          </button>
        </div>
      </form>

      {/* Version and Copyright */}
      <div className="mt-8 pt-6 border-t border-neutral-800">
        <p className="text-xs text-neutral-500 text-center">
          Version 1.0.0
        </p>
        <p className="text-xs text-neutral-500 text-center mt-1">
          &copy; 2024 AEGIX. All rights reserved.
        </p>
      </div>
    </div>
  );
};