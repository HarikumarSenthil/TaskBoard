import React, { useState } from 'react';
import { MoreVertical, Pencil, Trash2, PlusCircle } from 'lucide-react';
import Button from '../common/Button';

interface Props {
  title: string;
  onAddTask: () => void;
  onEditColumn: () => void;
  onDeleteColumn: () => void;
}

const ColumnHeader: React.FC<Props> = ({ title, onAddTask, onEditColumn, onDeleteColumn }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  return (
    <div className="flex justify-between items-start relative">
      <h3 className="font-bold text-md text-black">{title}</h3>

      <div className="flex gap-2 items-center">
        <Button
          onClick={onAddTask}
          className="flex items-center gap-1 text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all"
        >
          <PlusCircle size={14} />
          Add
        </Button>

        <a className="p-1 hover:bg-gray-100 rounded cursor-pointer" onClick={toggleMenu}>
          <MoreVertical size={18} />
        </a>

        {showMenu && (
          <div className=" cursor-pointer absolute right-0 top-8 w-32 bg-white border border-gray-200 rounded-md shadow-md z-10">
            <a
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
              onClick={() => {
                setShowMenu(false);
                onEditColumn();
              }}
            >
              <Pencil size={16} /> Edit
            </a>
            <a
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
              onClick={() => {
                setShowMenu(false);
                onDeleteColumn();
              }}
            >
              <Trash2 size={16} /> Delete
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColumnHeader;
