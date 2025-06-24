import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
}

const CreateBoardModal: React.FC<Props> = ({ isOpen, onClose, onCreate }) => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) return;
    onCreate(name, description);
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='bg-white'>
      <h2 className="text-xl font-bold mb-4">Create New Board</h2>
      <input
        type="text"
        placeholder="Board Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full mb-2 p-2 border rounded bg-gray-600"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full mb-4 p-2 border rounded bg-gray-600"
      />
      <Button onClick={handleSubmit}>Create</Button>
      </div>
    </Modal>
  );
};

export default CreateBoardModal;
