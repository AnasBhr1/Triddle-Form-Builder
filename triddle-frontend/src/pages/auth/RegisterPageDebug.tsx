import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from '../../hooks/useAuth';
import { Button, Input } from '../../components/ui';
import axios from 'axios';
import { RegisterData } from '../../types'; // Import the existing RegisterData type

// Define the registration form schema
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

// The interface below is just for the direct API test; we'll import the real one for the form

const RegisterPageDebug: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useRegister();
  const [debugInfo, setDebugInfo] = useState<string>('Debug information will appear here...');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setDebugInfo('Starting registration process...');
    
    try {
      // Split the name into firstName and lastName for API compatibility
      const nameParts = data.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      setDebugInfo(prev => prev + '\nAttempting to register with hook...');
      setDebugInfo(prev => prev + `\nSplitting name "${data.name}" into firstName="${firstName}" and lastName="${lastName}"`);
      
      await registerUser({
        firstName,
        lastName,
        email: data.email,
        password: data.password,
      });
      setDebugInfo(prev => prev + '\nRegistration successful! Redirecting...');
      navigate('/dashboard');
    } catch (error: any) {
      setDebugInfo(prev => prev + '\nError from hook: ' + (error.message || 'Unknown error'));
      setError('root', {
        type: 'manual',
        message: error.message || 'Registration failed. Please try again.',
      });
    }
  };

  const testDirectApi = async () => {
    setDebugInfo('Testing direct API registration...');
    
    try {
      // Get values from form fields
      const firstName = document.getElementById('debug-firstName') as HTMLInputElement;
      const lastName = document.getElementById('debug-lastName') as HTMLInputElement;
      const email = document.getElementById('debug-email') as HTMLInputElement;
      const password = document.getElementById('debug-password') as HTMLInputElement;
      
      const userData: RegisterData = {
        firstName: firstName?.value || 'Test',
        lastName: lastName?.value || 'User',
        email: email?.value || 'test@example.com',
        password: password?.value || 'Password123',
      };
      
      setDebugInfo(prev => prev + `\nSending data: ${JSON.stringify(userData, null, 2)}`);
      
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      
      setDebugInfo(prev => prev + '\nRegistration successful!');
      setDebugInfo(prev => prev + `\nResponse status: ${response.status}`);
      setDebugInfo(prev => prev + `\nResponse data: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error: any) {
      setDebugInfo(prev => prev + '\nRegistration failed!');
      
      if (error.response) {
        // The request was made and the server responded with a status code
        setDebugInfo(prev => prev + `\nStatus: ${error.response.status}`);
        setDebugInfo(prev => prev + `\nData: ${JSON.stringify(error.response.data, null, 2)}`);
        setDebugInfo(prev => prev + `\nHeaders: ${JSON.stringify(error.response.headers, null, 2)}`);
        
        // Extract validation errors if they exist
        if (error.response.data && error.response.data.errors) {
          setDebugInfo(prev => prev + '\n\nValidation Errors:');
          Object.entries(error.response.data.errors).forEach(([field, message]) => {
            setDebugInfo(prev => prev + `\n- ${field}: ${message}`);
          });
        }
      } else if (error.request) {
        // The request was made but no response was received
        setDebugInfo(prev => prev + '\nNo response received from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        setDebugInfo(prev => prev + `\nError: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account (Debug)
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in to existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <Input
                id="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Full Name"
                {...register('name')}
                error={errors.name?.message}
              />
            </div>
            <div className="mb-4">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                {...register('email')}
                error={errors.email?.message}
              />
            </div>
            <div className="mb-4">
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Password"
                {...register('password')}
                error={errors.password?.message}
              />
            </div>
            <div>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Confirm Password"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />
            </div>
          </div>

          {errors.root && (
            <div className="text-red-500 text-sm mt-2">{errors.root.message}</div>
          )}

          <div className="text-sm">
            <p className="text-gray-600">
              By registering, you agree to our{' '}
              <Link to="/terms" className="font-medium text-indigo-600 hover:text-indigo-500">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="font-medium text-indigo-600 hover:text-indigo-500">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              fullWidth
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Create Account
            </Button>
            
            <Button
              type="button"
              variant="secondary"
              onClick={testDirectApi}
            >
              Test API
            </Button>
          </div>
        </form>
        
        <div className="mt-4">
          <h3 className="font-medium text-gray-900">Debug API Test</h3>
          <div className="mt-2 space-y-3 bg-gray-100 p-4 rounded-md">
            <div>
              <label className="block text-sm text-gray-700">First Name:</label>
              <input 
                id="debug-firstName" 
                className="w-full p-2 border rounded mt-1" 
                defaultValue="Test" 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Last Name:</label>
              <input 
                id="debug-lastName" 
                className="w-full p-2 border rounded mt-1" 
                defaultValue="User" 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Email:</label>
              <input 
                id="debug-email" 
                className="w-full p-2 border rounded mt-1" 
                defaultValue="test@example.com" 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Password:</label>
              <input 
                id="debug-password" 
                className="w-full p-2 border rounded mt-1" 
                defaultValue="Password123" 
                type="text" 
              />
            </div>
            <button
              onClick={testDirectApi}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Test Direct Registration
            </button>
          </div>
          <h3 className="mt-4 font-medium text-gray-900">Debug Information</h3>
          <pre className="mt-2 p-4 bg-gray-100 rounded-md text-xs whitespace-pre-wrap overflow-auto max-h-64">
            {debugInfo}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default RegisterPageDebug;