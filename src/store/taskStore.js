import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

function reorder(arr, fromId, toId) {
  const fromIdx = arr.findIndex(x => x.id === fromId);
  const toIdx = arr.findIndex(x => x.id === toId);
  if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return null;
  const result = [...arr];
  const [moved] = result.splice(fromIdx, 1);
  result.splice(toIdx, 0, moved);
  return result;
}

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
      deleteTaskList: (listId) =>
        set(s => ({ taskLists: s.taskLists.filter(l => l.id !== listId) })),
      reorderTasksInList: (listId, fromId, toId) =>
        set(s => ({
          taskLists: s.taskLists.map(l => {
            if (l.id !== listId) return l;
            const tasks = reorder(l.tasks, fromId, toId);
            return tasks ? { ...l, tasks } : l;
          })
        })),
      reorderTaskLists: (fromId, toId) =>
        set(s => {
          const taskLists = reorder(s.taskLists, fromId, toId);
          return taskLists ? { taskLists } : s;
        }),
    }),
    { name: 'task-store', storage: createJSONStorage(() => localStorage) }
  )
);

export default useTaskStore;
