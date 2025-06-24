import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

const CreateColumnModal: React.FC<Props> = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) return;
    onCreate(name);
    setName('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='bg-white p-4 rounded-2xl'>
      <h2 className="text-xl font-bold mb-4 text-black">Create New Column</h2>
      <input
        type="text"
        placeholder="Column Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full mb-4 p-2 border rounded text-black"
      />
      <Button onClick={handleSubmit}>Create</Button>
      </div>
    </Modal>
  );
};

export default CreateColumnModal;