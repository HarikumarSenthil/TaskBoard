import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../../store/types';

interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
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
      {...listeners}
      {...attributes}
      style={style}
      className="focus:outline-none focus:ring-0 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100 w-72 h-40 flex flex-col justify-between"
      tabIndex={-1}
    >
      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-bold text-gray-800 text-sm sm:text-base truncate">
            {task.title}
          </h4>
          <span
            className={`text-xs px-2 py-0.5 rounded-full text-white capitalize ${priorityColor}`}
          >
            {task.priority}
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
      </div>

      {/* Footer */}
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
