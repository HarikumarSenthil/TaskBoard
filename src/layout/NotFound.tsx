import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center bg-gradient-to-br from-slate-50 to-white">
      <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4 animate-bounce" />
      <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-2">Page Not Found</h1>
      <p className="text-gray-600 text-lg max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="!text-white mt-6 inline-block bg-blue-600 px-6 py-2 rounded-lg shadow"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
