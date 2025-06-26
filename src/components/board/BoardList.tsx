import React from 'react';
import BoardCard from './BoardCard';
import type { Board } from '../../store/types';
import { FileQuestion } from 'lucide-react';

interface Props {
  boards: Board[];
  searchTerm: string;
}

const BoardList: React.FC<Props> = ({ boards, searchTerm }) => {
  const filteredBoards = boards.filter((board) =>
    board.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredBoards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] w-full text-gray-500 text-sm col-span-full">
        <FileQuestion className="w-10 h-10 mb-2 text-gray-400" />
        <p className="text-center">No boards found for "{searchTerm}"</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredBoards.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
};

export default BoardList;
