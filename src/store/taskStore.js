import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export function createTask({ title, size = 0, energy = 0 }) {
  const now = new Date().toISOString();
  return { id: uuidv4(), title, status: 'New', size, energy, createdAt: now, updatedAt: now };
}

const useTaskStore = create(
  persist(
    (set) => ({
      taskLists: [],
      addTaskList: (name) =>
        set(s => ({ taskLists: [...s.taskLists, { id: uuidv4(), name, tasks: [] }] })),
      addTaskToList: (listId, taskProps) =>
        set(s => ({
          taskLists: s.taskLists.map(l =>
            l.id !== listId ? l : { ...l, tasks: [...l.tasks, createTask(taskProps)] }
          )
        })),
      removeTaskFromList: (listId, taskId) =>
        set(s => ({
          taskLists: s.taskLists.map(l =>
            l.id !== listId ? l : { ...l, tasks: l.tasks.filter(t => t.id !== taskId) }
          )
        })),
      updateTaskStatus: (listId, taskId, status) =>
        set(s => ({
          taskLists: s.taskLists.map(l =>
            l.id !== listId ? l : {
              ...l,
              tasks: l.tasks.map(t =>
                t.id !== taskId ? t : { ...t, status, updatedAt: new Date().toISOString() }
              )
            }
          )
        })),
    }),
    { name: 'task-store', storage: createJSONStorage(() => localStorage) }
  )
);

export default useTaskStore;
