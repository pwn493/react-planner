import { useState } from 'react';
import { createTask } from '../store/taskStore';

function CreateTask({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [size, setSize] = useState(0);
  const [energy, setEnergy] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    const task = createTask({ title, size, energy });
    onSubmit(task);
    setTitle('');
    setSize(0);
    setEnergy(0);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Size
          <input
            type="number"
            min="0"
            step="any"
            value={size}
            onChange={e => setSize(e.target.value === '' ? 0 : Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Energy
          <input
            type="number"
            min="0"
            step="any"
            value={energy}
            onChange={e => setEnergy(e.target.value === '' ? 0 : Number(e.target.value))}
          />
        </label>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default CreateTask;
