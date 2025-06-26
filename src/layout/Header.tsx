// src/layout/Header.tsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { LogOut, User } from 'lucide-react'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const token = Cookies.get('jwtToken')
  const [showProfile, setShowProfile] = useState(false)

  const handleLogout = () => {
    Cookies.remove('jwtToken')
    setShowProfile(false)
    navigate('/login')
  }

  return (
    <header className="bg-gradient-to-r from-blue-50 via-white to-purple-50 shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <p className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Task Board
        </p>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="relative group px-3 py-2 text-gray-700 font-medium transition-all duration-300 hover:text-blue-600"
          >
            Boards
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
          </Link>

          {token && (
            <div className="relative cursor-pointer">
              <a
                onClick={() => setShowProfile(prev => !prev)}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-800 font-medium hover:text-blue-600 focus:outline-none"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </a>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10 cursor-pointer">
                  <p
                    onClick={handleLogout}
                    className="w-full bg-gray-200 rounded-md flex items-center gap-2 px-4 py-2 text-sm text-red-600"
                  >
                    <LogOut className="w-4 h-4 text-red-600" />
                    Logout
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
