import React from 'react';
import Button from '../common/Button';

interface Props {
  title: string;
  onAddTask: () => void;
}

const ColumnHeader: React.FC<Props> = ({ title, onAddTask }) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="font-bold text-md text-black">{title}</h3>
      <Button onClick={onAddTask} className="text-sm px-2 py-1">+ Task</Button>
    </div>
  );
};

export default ColumnHeader;