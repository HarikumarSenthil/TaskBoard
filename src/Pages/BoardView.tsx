import React, { useState, useEffect } from 'react';
import CreateBoardModal from '../components/board/CreateBoardModal';
import BoardList from '../components/board/BoardList';
import Button from '../components/common/Button';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';
import type { Board } from '../store/types';

const BoardView: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const storedBoards = loadFromLocalStorage<Board[]>('boards');
    if (storedBoards) {
      setBoards(storedBoards);
    }
  }, []);

  const handleCreateBoard = (name: string, description: string) => {
    const newBoard: Board = {
      id: Date.now().toString(),
      name,
      description,
    };
    const updatedBoards = [...boards, newBoard];
    setBoards(updatedBoards);
    saveToLocalStorage('boards', updatedBoards);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
          Boards
        </h2>
        <Button onClick={() => setModalOpen(true)}>+ New Board</Button>
      </div>

      {/* Board List */}
      {boards.length > 0 ? (
        <BoardList boards={boards} />
      ) : (
        <p className="text-gray-500 text-sm italic">No boards created yet. Start by adding one!</p>
      )}

      {/* Modal */}
      <CreateBoardModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateBoard}
      />
    </div>
  );
};

export default BoardView;
