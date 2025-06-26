import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import type { Board } from '../../store/types';

interface Props {
  board: Board;
}

const BoardCard: React.FC<Props> = ({ board }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group relative bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-lg hover:from-blue-50 hover:to-indigo-100 hover:border-blue-200 cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
      onClick={() => navigate(`/board/${board.id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
          <Layers className="w-5 h-5" />
        </div>
        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-800 transition-colors">
          {board.name}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
          {board.description}
        </p>
      </div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/5 group-hover:to-indigo-600/5 transition-all duration-300" />
    </div>
  );
};

export default BoardCard;