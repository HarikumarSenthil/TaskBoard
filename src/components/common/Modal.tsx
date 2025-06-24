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
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-20 bg-opacity-50 flex items-center justify-center z-50">
      <div className="p-6 md:min-w-[500px] min-w-full">
        <a
          onClick={onClose}
          className="absolute top-9 right-5 cursor-pointer text-gray-600 hover:text-red-500"
        >
          <X className="w-5 h-5" />
        </a>
        {children}
      </div>
    </div>
  );
};

export default Modal;