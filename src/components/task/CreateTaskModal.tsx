import React, { useState } from 'react';
import { useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { Calendar } from 'lucide-react';
import FormError from '../common/FormError';


interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (taskData: Omit<Task, 'id' | 'columnId' | 'order'>) => void;
  task?: Task | null;
}


type Task = {
  title: string;
  description: string;
  createdBy: string;
  assignedTo: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
};

const CreateTaskModal: React.FC<Props> = ({ isOpen, onClose, onCreate, task }) => {
  const [form, setForm] = useState<Task>({
    title: '',
    description: '',
    createdBy: '',
    assignedTo: '',
    priority: 'medium',
    dueDate: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Task, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof Task, string>> = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.createdBy.trim()) newErrors.createdBy = 'Creator name is required';
    if (!form.assignedTo.trim()) newErrors.assignedTo = 'Assignee is required';
    if (!form.dueDate.trim()) newErrors.dueDate = 'Due date is required';
    return newErrors;
  };
  useEffect(() => {
  if (task) {
    setForm({
      title: task.title || '',
      description: task.description || '',
      createdBy: task.createdBy || '',
      assignedTo: task.assignedTo || '',
      priority: task.priority || 'medium',
      dueDate: task.dueDate || ''
    });
  } else {
    // Reset form when task is null (i.e., creating new task)
    setForm({
      title: '',
      description: '',
      createdBy: '',
      assignedTo: '',
      priority: 'medium',
      dueDate: ''
    });
  }
}, [task]);


  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onCreate(form);

    setForm({
      title: '',
      description: '',
      createdBy: '',
      assignedTo: '',
      priority: 'medium',
      dueDate: ''
    });
    setErrors({});
    onClose();
  };

 return (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl bg-white px-6 py-8 space-y-5 overflow-auto max-h-[90vh] backdrop-blur-md bg-opacity-90">
    <h2 className="text-3xl text-black sm:text-4xl font-extrabold text-center mb-4">
      {task ? 'Edit Task' : 'Create Task'}
    </h2>
      {[
        { name: 'title', label: 'Title', type: 'text', placeholder: 'Enter task title' },
        { name: 'createdBy', label: 'Created by', type: 'text', placeholder: 'Name of creator' },
      ].map(field => (
        <label key={field.name} className="block">
          <span className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</span>
          <input
            name={field.name}
            value={(form as any)[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            type={field.type}
            className={`w-full px-4 py-2 text-black border ${
              errors[field.name as keyof Task] ? 'border-red-500' : 'border-gray-300'
            } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          />
          <FormError message={errors[field.name as keyof Task]} />
        </label>
      ))}


      {/* Assigned To */}
<label className="block">
  <span className="block text-sm font-semibold text-gray-700 mb-1">Assigned To</span>
  <select
    name="assignedTo"
    value={form.assignedTo}
    onChange={handleChange}
    className={`w-full px-4 py-2 border text-black ${
      errors.assignedTo ? 'border-red-500' : 'border-gray-300'
    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
  >
    <option value="">Select a user</option>
    {['Harikumar', 'Jayakumar', 'Suresh', 'Vikash', 'Vimal', 'Suriya', 'Ramkrishnan'].map(user => (
      <option key={user} value={user}>
        {user}
      </option>
    ))}
  </select>
  <FormError message={errors.assignedTo} />
</label>


      {/* Description */}
      <label className="block">
        <span className="block text-sm font-semibold text-gray-700 mb-1">Description</span>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Add task description"
          rows={4}
          className={`w-full px-4 py-2 text-black border ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
        />
        <FormError message={errors.description} />
      </label>

      {/* Priority */}
      <label className="block">
        <span className="block text-sm font-semibold text-gray-700 mb-1">Priority</span>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </label>

      {/* Due Date */}
      <div className="relative cursor-pointer">
          <span className="block text-sm font-semibold text-gray-700 mb-1">Due Date</span>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className={`w-full px-4 py-2 text-black border ${
            errors.dueDate ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
          <Calendar className='cursor-pointer mt-5' />
        </div>
        <FormError message={errors.dueDate} />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-200 rounded-lg hover:bg-gray-300 transition-all"
        >
          Cancel
        </button>
        <Button onClick={handleSubmit}>
        {task ? 'Save Changes' : 'Create Task'}
      </Button>
      </div>
    </div>
  </Modal>
);

};

export default CreateTaskModal;
