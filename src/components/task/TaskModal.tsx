import React from 'react';
import Modal from '../common/Modal';
import type { Task } from '../../store/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

const TaskModal: React.FC<Props> = ({ isOpen, onClose, task }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl px-6 py-6 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 space-y-4">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          {task.title}
        </h2>

        {/* Description */}
        <p className="text-gray-700 whitespace-pre-line">{task.description}</p>

        {/* Details */}
        <div className="space-y-2 text-sm sm:text-base">
          <p>
            <span className="font-semibold text-gray-600">Created by:</span>{' '}
            <span className="text-gray-800">{task.createdBy}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-600">Assigned to:</span>{' '}
            <span className="text-gray-800">{task.assignedTo}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-600">Priority:</span>{' '}
            <span
              className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold text-white ${
                task.priority === 'high'
                  ? 'bg-red-500'
                  : task.priority === 'medium'
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
            >
              {task.priority}
            </span>
          </p>
          <p>
            <span className="font-semibold text-gray-600">Due Date:</span>{' '}
            <span className="text-gray-800">{task.dueDate}</span>
          </p>
        </div>

        {/* Close Button */}
        <div className="pt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;
