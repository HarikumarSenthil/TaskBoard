import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Board } from '../../store/types';

interface Props {
  board: Board;
}

const BoardCard: React.FC<Props> = ({ board }) => {
  const navigate = useNavigate();

  return (
    <div
      className="border p-4 rounded-lg shadow bg-blue-300 hover:bg-blue-400 cursor-pointer"
      onClick={() => navigate(`/board/${board.id}`)}
    >
      <h3 className="text-lg font-semibold">{board.name}</h3>
      <p className="text-sm text-gray-600">{board.description}</p>
    </div>
  );
};

export default BoardCard;
