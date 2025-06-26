import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from '../task/TaskCard';
import ColumnHeader from './ColumnHeader';
import TaskModal from '../task/TaskModal';
import type { Task, ColumnType } from '../../store/types';
import { Filter, User, ArrowDownWideNarrow, ChevronDown ,FileQuestion } from 'lucide-react';

interface Props {
  column: ColumnType;
  tasks: Task[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;       
  onDeleteTask: (taskId: string) => void; 
}


const Column: React.FC<Props> = ({ column, tasks, onAddTask , onDeleteTask,onEditTask}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filterPriority, setFilterPriority] = useState<string>('');
  const [filterAssignee, setFilterAssignee] = useState<string>('');
  const [sortBy, setSortBy] = useState<'priority' | 'dueDate' | ''>('');
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const handleCardClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    onEditTask(task); 
    // setIsModalOpen(true);
  };

  const handleDelete = (taskId: string) => {
    onDeleteTask(taskId); 
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
      className={`bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200 p-5 rounded-xl w-72 min-w-[280px] shadow-sm transition-all duration-300 ${
        isOver ? 'border-2 border-blue-400 bg-gradient-to-b from-blue-50 to-blue-100 shadow-md scale-102' : ''
      }`}
    >
      <ColumnHeader title={column.name} onAddTask={onAddTask} />

      {/* Filter Toggle */}
      <a
        onClick={() => setFiltersExpanded(!filtersExpanded)}
        className="flex items-center justify-between w-full mt-4 p-2 rounded-lg bg-white/70 hover:bg-white/90 border border-slate-200 transition-all duration-200 group"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-black" />
          <span className="text-sm font-medium text-slate-700">Filters & Sort</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${filtersExpanded ? 'rotate-180' : ''}`} />
      </a>

      {/* Filters Panel */}
      {filtersExpanded && (
        <div className="mt-3 p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600">
              <Filter className="w-3 h-3 text-white" />
            </div>
            <select
              className="text-sm bg-white border border-slate-300 text-slate-700 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-md bg-gradient-to-r from-emerald-500 to-teal-600">
              <User className="w-3 h-3 text-white" />
            </div>
            <input
              type="text"
              placeholder="Search by assignee"
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="text-sm bg-white border border-slate-300 text-slate-700 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-md bg-gradient-to-r from-purple-500 to-violet-600">
              <ArrowDownWideNarrow className="w-3 h-3 text-white" />
            </div>
            <select
              className="text-sm bg-white border border-slate-300 text-slate-700 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'priority' | 'dueDate' | '')}
            >
              <option value="">No Sorting</option>
              <option value="priority">Sort by Priority</option>
              <option value="dueDate">Sort by Due Date</option>
            </select>
          </div>
        </div>
      )}

      <SortableContext items={filteredSortedTasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
  <div className="mt-4 space-y-3 overflow-visible">
    {filteredSortedTasks.length > 0 ? (
      filteredSortedTasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCardClick={() => handleCardClick(task)}
        />
      ))
    ) : (
      <div className="flex flex-col items-center justify-center text-gray-500 text-sm mt-6">
        <FileQuestion className="w-8 h-8 mb-2 text-gray-400" />
        <p>No tasks available</p>
      </div>
   )}
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