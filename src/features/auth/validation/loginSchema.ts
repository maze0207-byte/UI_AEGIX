/**
 * AEGIX Authentication Validation
 * Zod schemas for login form validation
 */

import { z } from 'zod';

// For development, allow shorter passwords
const isDevMode = import.meta.env.VITE_DEV_MODE === 'true';

// Login form validation schema
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Username or email is required')
    .max(255, 'Username must be less than 255 characters')
    .refine(
      (value) => {
        // Check if it's a valid email or username
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
        return emailRegex.test(value) || usernameRegex.test(value);
      },
      {
        message: 'Enter a valid email address or username',
      }
    ),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(isDevMode ? 1 : 8, 'Password must be at least 8 characters')
    .max(128, 'Password must be less than 128 characters'),
  rememberMe: z.boolean().optional().default(false),
});

// Type inference from schema
export type LoginFormData = z.infer<typeof loginSchema>;

// Validation error type
export interface ValidationError {
  field: string;
  message: string;
}

// Validate login form data
export const validateLoginForm = (data: unknown): { 
  success: boolean; 
  data?: LoginFormData; 
  errors?: ValidationError[] 
} => {
  const result = loginSchema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  const errors: ValidationError[] = result.error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }));
  
  return { success: false, errors };
};