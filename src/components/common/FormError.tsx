// src/components/common/FormError.tsx

import React from 'react';

interface FormErrorProps {
  message?: string;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;
  return <p className="text-xs text-red-600 mt-1 font-extrabold">{message}</p>;
};

export default FormError;
