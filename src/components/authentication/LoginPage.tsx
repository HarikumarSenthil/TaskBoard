// src/pages/LoginPage.tsx
import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import FormError from '../common/FormError'
import { Eye, EyeOff } from 'lucide-react'
import LoadingSpinner from '../common/LoadingSpinner'

interface LoginFormInputs {
  email: string
  password: string
}

interface LoginResponse {
  token: string
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true)
    try {
      const response = await axios.post<LoginResponse>(
        'https://authentication-1-56tm.onrender.com/api/auth/login',
        data
      )
      const token = response.data.token
      Cookies.set('jwtToken', token, { expires: 7 })

      toast.success('Login successful! Redirecting...', {
        duration: 2000,
        position: 'top-center',
      })

      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'Invalid credentials'
      setError('email', { message: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Welcome Back! Sign in to manage your tasks
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-gray-600 mb-1 font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            } text-black`}

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

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-gray-600 mb-1 font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={`w-full px-4 py-2 pr-10 border text-black bg-gray-100 rounded-md focus:outline-none focus:ring-2 ${
                  errors.password ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'
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
                onClick={togglePasswordVisibility}
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
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-medium`}
          >
            Sign In
            {loading && <LoadingSpinner />}
          </button>
        </form>

        {/* Redirect to Register */}
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don’t have an account? </span>
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
