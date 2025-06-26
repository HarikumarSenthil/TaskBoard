import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import FormError from '../common/FormError';
import { Eye, EyeOff } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

interface RegisterFormInputs {
  username: string;
  full_name: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormInputs>();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data: RegisterFormInputs) => {
    setLoading(true);
    try {
      await axios.post('https://authentication-1-56tm.onrender.com/api/auth/register', data);
      toast.success('Registration successful! Redirecting to login...', {
        duration: 3000,
        position: 'top-center',
      });

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Registration failed';
      setError('username', { message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          New Here? Create an account to manage your tasks
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-600 mb-1">Username</label>
            <input
              type="text"
              className={`w-full px-4 py-2 text-black bg-gray-100 rounded-lg focus:outline-none focus:ring-2 ${
                errors.username
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border border-gray-300 focus:ring-green-500'
              }`}
              {...register('username', {
                required: 'Username is required',
                minLength: { value: 3, message: 'Min 3 characters' },
              })}
            />
            <FormError message={errors.username?.message} />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              className={`w-full px-4 py-2 text-black bg-gray-100 rounded-lg focus:outline-none focus:ring-2 ${
                errors.full_name
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border border-gray-300 focus:ring-green-500'
              }`}
              {...register('full_name', {
                required: 'Full name is required',
              })}
            />
            <FormError message={errors.full_name?.message} />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              className={`w-full px-4 py-2 text-black bg-gray-100 rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border border-gray-300 focus:ring-green-500'
              }`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email format',
                },
              })}
            />
            <FormError message={errors.email?.message} />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`w-full px-4 py-2 pr-10 text-black bg-gray-100 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border border-gray-300 focus:ring-green-500'
                }`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              <span
                onClick={togglePassword}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            <FormError message={errors.password?.message} />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-6 rounded-lg flex justify-center items-center gap-2 ${
              loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            } text-white font-medium`}
          >
            Sign Up
            {loading && <LoadingSpinner />}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
