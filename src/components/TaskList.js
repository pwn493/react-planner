import { memo, useState } from 'react';
import { DebugRenders } from '@pwn493/react-debug-renders';
import useTaskStore from '../store/taskStore';
import useDebugStore from '../store/debugStore';
import Task from './Task';
import Modal from './Modal';
import CreateTask from './CreateTask';

function TaskList({ list }) {
  const addTaskToList = useTaskStore(s => s.addTaskToList);
  const debugRenders = useDebugStore(s => s.debugRenders);
  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);

  function handleAddTask(task) {
    addTaskToList(list.id, { title: task.title, size: task.size, energy: task.energy });
    setCreateTaskModalOpen(false);
  }

  return (
    <div className="task-list">
      <h2>{list.name}</h2>
      <DebugRenders enabled={debugRenders} />
      {list.tasks.map(task => (
        <Task key={task.id} task={task} listId={list.id} />
      ))}
      <button onClick={() => setCreateTaskModalOpen(true)}>+</button>
      <Modal isOpen={isCreateTaskModalOpen} onClose={() => setCreateTaskModalOpen(false)}>
        <CreateTask onSubmit={handleAddTask} />
      </Modal>
    </div>
  );
}

export default memo(TaskList);
