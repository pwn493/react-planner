import { memo, useState } from 'react';
import { DebugRenders } from '@pwn493/react-debug-renders';
import useTaskStore from '../store/taskStore';
import useDebugStore from '../store/debugStore';
import Modal from './Modal';
import { useDraggable } from '../hooks/useDraggable';

const STATUSES = ['New', 'InProgress', 'Blocked', 'Done'];

function Task({ task, listId }) {
  const [isStatusModalOpen, setStatusModalOpen] = useState(false);
  const updateTaskStatus = useTaskStore(s => s.updateTaskStatus);
  const reorderTasksInList = useTaskStore(s => s.reorderTasksInList);
  const debugRenders = useDebugStore(s => s.debugRenders);
  const { isDragOver, dragProps } = useDraggable(task.id, (fromId, toId) => reorderTasksInList(listId, fromId, toId));

  const titleText = task.status === 'Blocked' ? `* ${task.title}` : task.title;
  const titleStyle = task.status === 'Done' ? { textDecoration: 'line-through' } : {};

  return (
    <div className={`task${isDragOver ? ' drag-over' : ''}`} {...dragProps}>
      <DebugRenders enabled={debugRenders} />
      <span style={titleStyle}>{titleText}</span>
      <button onClick={() => setStatusModalOpen(true)}>{task.status}</button>
      <span>Size: {task.size}</span>
      <span>Energy: {task.energy}</span>
      <Modal isOpen={isStatusModalOpen} onClose={() => setStatusModalOpen(false)}>
        <p>Select status:</p>
        <div>
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => {
                updateTaskStatus(listId, task.id, s);
                setStatusModalOpen(false);
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}

export default memo(Task);
