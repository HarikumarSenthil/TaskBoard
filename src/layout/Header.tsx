import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-50 via-white to-purple-50 shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo with gradient text */}
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
      Task Board
    </p>


        {/* Navigation */}
        <nav>
          <Link
            to="/"
            className="relative group px-3 py-2 text-gray-700 font-medium transition-all duration-300 hover:text-blue-600"
          >
            Boards
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;