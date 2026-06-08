import { useState } from 'react';

function CreateTaskList({ onSubmit }) {
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim());
    setName('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          List Name
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Create List</button>
    </form>
  );
}

export default CreateTaskList;
