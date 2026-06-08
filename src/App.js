import { useState } from 'react';
import './App.css';
import useTaskStore from './store/taskStore';
import TaskList from './components/TaskList';
import CreateTaskList from './components/CreateTaskList';
import Modal from './components/Modal';

function App() {
  const taskLists = useTaskStore(s => s.taskLists);
  const addTaskList = useTaskStore(s => s.addTaskList);
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="App">
      <h1>Planner</h1>
      <button onClick={() => setOpen(true)}>New List</button>
      <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
        <CreateTaskList onSubmit={name => { addTaskList(name); setOpen(false); }} />
      </Modal>
      <div className="task-lists">
        {taskLists.map(list => (
          <TaskList key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
}

export default App;
