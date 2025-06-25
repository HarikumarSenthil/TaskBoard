import React, { useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MoreVertical, Pencil, Trash2, View } from 'lucide-react';
import type { Task } from '../../store/types';

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onCardClick?: (task: Task) => void;
}

const TaskCard: React.FC<Props> = ({ task, onEdit, onDelete, onCardClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      id: task.id,
      columnId: task.columnId,
    },
  });

  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const priorityColor = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  }[task.priority];

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="focus:outline-none focus:ring-0 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100 w-72 h-40 flex flex-col justify-between"
      tabIndex={-1}
    >
      <div ref={setActivatorNodeRef} {...attributes} {...listeners} onClick={() => onCardClick?.(task)}>
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-bold text-gray-800 text-sm sm:text-base truncate w-56">
            {task.title}
          </h4>
          <span
            className={`text-xs px-2 py-0.5 rounded-full text-white capitalize ${priorityColor}`}
          >
            {task.priority}
          </span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mt-4">{task.description}</p>
      </div>

      <div className="relative" ref={dropdownRef}>
        <a
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu((prev) => !prev);
          }}
          className="text-gray-500 hover:text-gray-700 focus:outline-none absolute top-10 right-2 z-50"
          aria-label="Options"
        >
          <MoreVertical size={16} />
        </a>

        {showMenu && (
          <div
            className="absolute right-0 mt-6 w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                onEdit(task);
                setShowMenu(false);
              }}
            >
              <Pencil size={14} /> Edit
            </a>
            <a
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              onClick={() => {
                onDelete(task.id);
                setShowMenu(false);
              }}
            >
              <Trash2 size={14} /> Delete
            </a>
            <a
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              onClick={() => {
                onDelete(task.id);
                setShowMenu(false);
              }}
            >
              <View size={14} /> View
            </a>


          </div>
        )}
      </div>

      <div className="mt-3 text-xs text-gray-500 space-y-1">
        <p className="truncate">
          <span className="font-medium text-gray-700">Assigned:</span>{' '}
          {task.assignedTo || 'None'}
        </p>
        <p className="truncate">
          <span className="font-medium text-gray-700">Due:</span>{' '}
          {task.dueDate || 'None'}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
