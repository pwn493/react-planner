import { useState } from 'react';
import useTaskStore from '../store/taskStore';
import CreateTaskList from './CreateTaskList';
import Modal from './Modal';

function NewTaskList() {
  const addTaskList = useTaskStore(s => s.addTaskList);
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <button className="new-list-button" onClick={() => setOpen(true)}>New List</button>
      <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
        <CreateTaskList onSubmit={name => { addTaskList(name); setOpen(false); }} />
      </Modal>
    </>
  );
}

export default NewTaskList;
