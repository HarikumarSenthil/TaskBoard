import React, { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import FormError from '../common/FormError';
import type { ColumnType } from '../../store/types'; // Make sure this import matches your structure

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
  column?: ColumnType | null;
}

const CreateColumnModal: React.FC<Props> = ({ isOpen, onClose, onCreate, column }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Prefill name when editing
  useEffect(() => {
    if (isOpen && column) {
      setName(column.name);
    } else if (isOpen) {
      setName('');
    }
  }, [isOpen, column]);

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Column name is required');
      return;
    }

    setError('');
    onCreate(name.trim());
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white p-6 w-full max-w-md mx-auto rounded-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {column ? 'Edit Column' : 'Create New Column'}
        </h2>

        <div className="mb-6">
          <label htmlFor="column-name" className="block text-sm font-medium text-gray-700 mb-1">
            Column Name <span className="text-red-500">*</span>
          </label>
          <input
            id="column-name"
            type="text"
            placeholder="Enter column name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            className={`w-full px-3 py-2 border ${
              error ? 'border-red-500' : 'border-gray-300'
            } rounded-md text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <FormError message={error} />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSubmit}>{column ? 'Update' : 'Create'}</Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateColumnModal;
