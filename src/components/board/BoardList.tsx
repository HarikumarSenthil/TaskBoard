import React from 'react';
import BoardCard from './BoardCard';
import type { Board } from '../../store/types';

interface Props {
  boards: Board[];
  searchTerm: string; 
}

const BoardList: React.FC<Props> = ({ boards, searchTerm }) => {
  const filteredBoards = boards.filter(board =>
    board.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredBoards.map(board => (
        <BoardCard key={board.id} board={board} />
      ))}

      {filteredBoards.length === 0 && (
        <p className="col-span-full text-center text-gray-500">
          No boards found for "{searchTerm}"
        </p>
      )}
    </div>
  );
};

export default BoardList;
