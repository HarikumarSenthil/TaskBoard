import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import CreateColumnModal from '../components/column/CreateColumnModal';
import CreateTaskModal from '../components/task/CreateTaskModal';
import Column from '../components/column/Column';
import Button from '../components/common/Button';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';
import type { ColumnType, Task } from '../store/types';
import ConfirmDialog from '../components/common/ConfirmDialog';
const BoardDetail: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedColumnId, setSelectedColumnId] = useState<string>('');
  const [isColumnModalOpen, setColumnModalOpen] = useState(false);
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingColumn, setEditingColumn] = useState<ColumnType | null>(null);
  const [confirmColumnId, setConfirmColumnId] = useState<string | null>(null); // ✅ New

  useEffect(() => {
    const allColumns = loadFromLocalStorage<ColumnType[]>('columns') || [];
    const allTasks = loadFromLocalStorage<Task[]>('tasks') || [];

    setColumns(allColumns.filter((col) => col.boardId === boardId));
    setTasks(
      allTasks.filter((task) => {
        const column = allColumns.find((col) => col.id === task.columnId);
        return column?.boardId === boardId;
      })
    );
  }, [boardId]);

  const handleCreateColumn = (name: string) => {
    if (editingColumn) {
      const updatedColumns = columns.map((col) =>
        col.id === editingColumn.id ? { ...col, name } : col
      );

      const allColumns = loadFromLocalStorage<ColumnType[]>('columns') || [];
      const allUpdatedColumns = allColumns.map((col) =>
        col.id === editingColumn.id ? { ...col, name } : col
      );

      saveToLocalStorage('columns', allUpdatedColumns);
      setColumns(updatedColumns);
      setEditingColumn(null);
    } else {
      const newColumn: ColumnType = {
        id: Date.now().toString(),
        boardId: boardId || '',
        name,
      };

      const updatedColumns = [...columns, newColumn];
      const allColumns = loadFromLocalStorage<ColumnType[]>('columns') || [];
      saveToLocalStorage('columns', [...allColumns, newColumn]);

      setColumns(updatedColumns);
    }

    setColumnModalOpen(false);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'columnId' | 'order'>) => {
    if (editingTask) {
      const updatedTasks = tasks.map((t) => (t.id === editingTask.id ? { ...t, ...taskData } : t));
      saveToLocalStorage('tasks', updatedTasks);
      setTasks(updatedTasks);
      setEditingTask(null);
    } else {
      const columnTasks = tasks.filter((t) => t.columnId === selectedColumnId);
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        columnId: selectedColumnId,
        order: columnTasks.length,
      };

      const updatedTasks = [...tasks, newTask];
      const allTasks = loadFromLocalStorage<Task[]>('tasks') || [];
      saveToLocalStorage('tasks', [...allTasks, newTask]);
      setTasks(updatedTasks);
    }

    setTaskModalOpen(false);
  };

  const handleEditColumn = (columnId: string) => {
    const columnToEdit = columns.find((col) => col.id === columnId);
    if (columnToEdit) {
      setEditingColumn(columnToEdit);
      setColumnModalOpen(true);
    }
  };

  // ✅ Set up the confirmation instead of direct deletion
  const handleDeleteColumn = (columnId: string) => {
    setConfirmColumnId(columnId);
  };

  // ✅ Confirm dialog action
  const confirmDelete = () => {
    if (!confirmColumnId) return;

    const updatedColumns = columns.filter((col) => col.id !== confirmColumnId);
    const updatedTasks = tasks.filter((task) => task.columnId !== confirmColumnId);

    const allColumns = loadFromLocalStorage<ColumnType[]>('columns') || [];
    const allTasks = loadFromLocalStorage<Task[]>('tasks') || [];

    const allUpdatedColumns = allColumns.filter((col) => col.id !== confirmColumnId);
    const allUpdatedTasks = allTasks.filter((task) => task.columnId !== confirmColumnId);

    saveToLocalStorage('columns', allUpdatedColumns);
    saveToLocalStorage('tasks', allUpdatedTasks);

    setColumns(updatedColumns);
    setTasks(updatedTasks);
    setConfirmColumnId(null);
  };

  const cancelDelete = () => {
    setConfirmColumnId(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    const overTask = tasks.find((t) => t.id === over.id);

    const activeColumnId = activeTask?.columnId;
    const overColumnId = overTask?.columnId || columns.find((col) => col.id === over.id)?.id;

    if (!activeTask || !activeColumnId || !overColumnId) return;

    if (activeColumnId === overColumnId) {
      const columnTasks = tasks
        .filter((t) => t.columnId === activeColumnId)
        .sort((a, b) => a.order - b.order);

      const oldIndex = columnTasks.findIndex((t) => t.id === active.id);
      const newIndex = columnTasks.findIndex((t) => t.id === over.id);

      const reorderedTasks = arrayMove(columnTasks, oldIndex, newIndex);

      const updatedTasks = tasks.map((task) => {
        const reordered = reorderedTasks.find((t) => t.id === task.id);
        return reordered ? { ...reordered, order: reorderedTasks.indexOf(reordered) } : task;
      });

      saveToLocalStorage('tasks', updatedTasks);
      setTasks(updatedTasks);
    } else {
      const targetTasks = tasks
        .filter((t) => t.columnId === overColumnId)
        .sort((a, b) => a.order - b.order);

      const updatedTasks = tasks.map((task) => {
        if (task.id === active.id) {
          return {
            ...task,
            columnId: overColumnId,
            order: targetTasks.length,
          };
        }
        return task;
      });

      saveToLocalStorage('tasks', updatedTasks);
      setTasks(updatedTasks);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Board Details
        </h2>
        <Button onClick={() => setColumnModalOpen(true)}>+ Add Column</Button>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => {
            const columnTasks = tasks
              .filter((task) => task.columnId === column.id)
              .sort((a, b) => a.order - b.order);

            return (
              <SortableContext
                key={column.id}
                items={columnTasks.map((task) => task.id)}
                strategy={verticalListSortingStrategy}
              >
                <Column
                  column={column}
                  tasks={columnTasks}
                  onAddTask={() => {
                    setSelectedColumnId(column.id);
                    setEditingTask(null);
                    setTaskModalOpen(true);
                  }}
                  onEditTask={(task) => {
                    setSelectedColumnId(task.columnId);
                    setEditingTask(task);
                    setTaskModalOpen(true);
                  }}
                  onDeleteTask={(taskId) => {
                    const updated = tasks.filter((task) => task.id !== taskId);
                    setTasks(updated);
                    saveToLocalStorage('tasks', updated);
                  }}
                  onEditColumn={() => handleEditColumn(column.id)}
                  onDeleteColumn={() => handleDeleteColumn(column.id)}
                />
              </SortableContext>
            );
          })}
        </div>
      </DndContext>

      <CreateColumnModal
        isOpen={isColumnModalOpen}
        onClose={() => {
          setColumnModalOpen(false);
          setEditingColumn(null);
        }}
        onCreate={handleCreateColumn}
        column={editingColumn}
      />

      <CreateTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setTaskModalOpen(false);
          setEditingTask(null);
        }}
        onCreate={handleSaveTask}
        task={editingTask}
      />

      {confirmColumnId && (
        <ConfirmDialog
          message="Are you sure you want to delete this column?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default BoardDetail;
