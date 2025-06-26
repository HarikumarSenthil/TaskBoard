import React from 'react';
import { X } from 'lucide-react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-20 flex items-center justify-center z-50">
      <div className="relative p-6 md:min-w-[500px] min-w-full bg-white rounded-lg">
        <a
          onClick={onClose}
          className="absolute top-2 right-2 cursor-pointer text-gray-600 hover:text-red-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </a>
        {children}
      </div>
    </div>
  );
};

export default Modal;
