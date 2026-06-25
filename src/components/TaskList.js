import { memo, useState } from 'react';
import { DebugRenders } from '@pwn493/react-debug-renders';
import useTaskStore from '../store/taskStore';
import useDebugStore from '../store/debugStore';
import Task from './Task';
import Modal from './Modal';
import CreateTask from './CreateTask';
import { useDraggable } from '../hooks/useDraggable';

function TaskList({ list }) {
  const addTaskToList = useTaskStore(s => s.addTaskToList);
  const deleteTaskList = useTaskStore(s => s.deleteTaskList);
  const reorderTaskLists = useTaskStore(s => s.reorderTaskLists);
  const debugRenders = useDebugStore(s => s.debugRenders);
  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isCollapsed, setCollapsed] = useState(false);
  const { isDragOver, dragProps } = useDraggable(list.id, reorderTaskLists);

  function handleAddTask(task) {
    addTaskToList(list.id, { title: task.title, size: task.size, energy: task.energy });
    setCreateTaskModalOpen(false);
  }

  return (
    <div className={`task-list${isDragOver ? ' drag-over' : ''}`} {...dragProps}>
      <h2 onClick={() => setCollapsed(c => !c)}>
        <span className="drag-handle">⠿</span>
        <span className="collapse-caret">{isCollapsed ? '▸' : '▾'}</span>
        {list.name}
        <button
          className="delete-list-button"
          onClick={(e) => { e.stopPropagation(); setDeleteModalOpen(true); }}
        >
          x
        </button>
      </h2>
      {!isCollapsed && (
        <>
          <DebugRenders enabled={debugRenders} />
          {list.tasks.map(task => (
            <Task key={task.id} task={task} listId={list.id} />
          ))}
          <button className="add-task-button" onClick={() => setCreateTaskModalOpen(true)}>+</button>
        </>
      )}
      <Modal isOpen={isCreateTaskModalOpen} onClose={() => setCreateTaskModalOpen(false)}>
        <CreateTask onSubmit={handleAddTask} />
      </Modal>
      <Modal isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <p>Delete list "{list.name}"?</p>
        <button onClick={() => setDeleteModalOpen(false)}>Cancel</button>
        <button
          onClick={() => {
            deleteTaskList(list.id);
            setDeleteModalOpen(false);
          }}
        >
          Delete
        </button>
      </Modal>
    </div>
  );
}

export default memo(TaskList);
