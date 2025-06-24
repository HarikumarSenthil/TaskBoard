export type Board = {
  id: string;
  name: string;
  description: string;
};

export type ColumnType = {
  id: string;
  name: string;
  boardId: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  assignedTo: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  columnId: string;
  order: number;
};
