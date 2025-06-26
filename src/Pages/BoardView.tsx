import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import CreateBoardModal from '../components/board/CreateBoardModal';
import BoardList from '../components/board/BoardList';
import Button from '../components/common/Button';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';
import type { Board } from '../store/types';

const BoardView: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 

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
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
            Boards
          </h2>
      

        <label className="block text-sm font-extrabold text-gray-700 mb-1">
          Search Boards
          <div className="relative mt-1 max-w-md w-full">
            <span className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <Search className="w-6 h-6 text-gray-500" />
            </span>
            <input
              type="text"
              placeholder="Search boards"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-5 py-3 text-gray-800 border rounded-md w-[400px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </label>


        </div>

        <Button onClick={() => setModalOpen(true)}>+ New Board</Button>
      </div>

      {/* Board List */}
      {boards.length > 0 ? (
        <BoardList boards={boards} searchTerm={searchTerm} /> 
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
