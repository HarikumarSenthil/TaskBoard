import { create } from 'zustand';
import type { Board, ColumnType, Task } from './types';

type Store = {
  boards: Board[];
  columns: ColumnType[];
  tasks: Task[];
  addBoard: (board: Board) => void;
  addColumn: (column: ColumnType) => void;
  addTask: (task: Task) => void;
};

export const useBoardStore = create<Store>((set) => ({
  boards: [],
  columns: [],
  tasks: [],
  addBoard: (board) => set((state) => ({ boards: [...state.boards, board] })),
  addColumn: (column) => set((state) => ({ columns: [...state.columns, column] })),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
}));
