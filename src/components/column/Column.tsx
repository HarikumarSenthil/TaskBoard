import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from '../task/TaskCard';
import ColumnHeader from './ColumnHeader';
import TaskModal from '../task/TaskModal';
import type { Task, ColumnType } from '../../store/types';

interface Props {
  column: ColumnType;
  tasks: Task[];
  onAddTask: () => void;
  onMoveTask: (taskId: string, targetColumnId: string) => void;
}

const Column: React.FC<Props> = ({ column, tasks, onAddTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const handleCardClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-100 p-4 rounded w-72 min-w-[280px] transition-colors ${
        isOver ? 'border-2 border-blue-400 bg-blue-50' : 'border-2 border-transparent'
      }`}
    >
      <ColumnHeader title={column.name} onAddTask={onAddTask} />

      {/* SortableContext enables reordering inside this column */}
      <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        <div className="mt-4 space-y-3">
          {tasks.map(task => (
            <div key={task.id} onClick={() => handleCardClick(task)}>
              <TaskCard task={task} />
            </div>
          ))}
        </div>
      </SortableContext>

      {selectedTask && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default Column;
