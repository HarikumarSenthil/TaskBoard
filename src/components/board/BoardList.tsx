import React from 'react';
import BoardCard from './BoardCard';
import type { Board } from '../../store/types';

interface Props {
  boards: Board[];
}

const BoardList: React.FC<Props> = ({ boards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {boards.map(board => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
};

export default BoardList;
