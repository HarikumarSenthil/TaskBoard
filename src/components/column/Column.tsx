import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from '../task/TaskCard';
import ColumnHeader from './ColumnHeader';
import TaskModal from '../task/TaskModal';
import type { Task, ColumnType } from '../../store/types';
import { Filter, User, ArrowDownWideNarrow } from 'lucide-react';

interface Props {
  column: ColumnType;
  tasks: Task[];
  onAddTask: () => void;
  onMoveTask: (taskId: string, targetColumnId: string) => void;
}

const Column: React.FC<Props> = ({ column, tasks, onAddTask }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filterPriority, setFilterPriority] = useState<string>('');
  const [filterAssignee, setFilterAssignee] = useState<string>('');
  const [sortBy, setSortBy] = useState<'priority' | 'dueDate' | ''>('');

  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const handleCardClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = (taskId: string) => {
    // Replace with actual logic or callback from props
    console.log('Delete task:', taskId);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const filteredSortedTasks = tasks
    .filter(task => {
      if (filterPriority && task.priority !== filterPriority) return false;
      if (filterAssignee && !task.assignedTo?.toLowerCase().includes(filterAssignee.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityMap: Record<string, number> = { high: 1, medium: 2, low: 3 };
        return priorityMap[a.priority] - priorityMap[b.priority];
      }
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime();
      }
      return 0;
    });

  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-100 p-4 rounded w-72 min-w-[280px] transition-colors ${
        isOver ? 'border-2 border-blue-400 bg-blue-50' : 'border-2 border-transparent'
      }`}
    >
      <ColumnHeader title={column.name} onAddTask={onAddTask} />

      {/* Filters */}
      <div className="flex flex-col gap-2 mb-3 mt-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              className="text-sm border text-black border-gray-300 px-3 py-1.5 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-black" />
            <input
              type="text"
              placeholder="Search by assignee"
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="text-sm border text-black border-gray-300 px-3 py-1.5 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <ArrowDownWideNarrow className="w-4 h-4 text-gray-600" />
            <select
              className="text-sm text-black border border-gray-300 px-3 py-1.5 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'priority' | 'dueDate' | '')}
            >
              <option value="">No Sorting</option>
              <option value="priority">Sort by Priority</option>
              <option value="dueDate">Sort by Due Date</option>
            </select>
          </div>
        </div>
      </div>

      <SortableContext items={filteredSortedTasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        <div className="mt-4 space-y-3 overflow-visible">
          {filteredSortedTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onCardClick={() => handleCardClick(task)}
            />
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
