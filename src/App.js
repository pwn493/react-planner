import './App.css';
import useTaskStore from './store/taskStore';
import useDebugStore from './store/debugStore';
import TaskList from './components/TaskList';
import NewTaskList from './components/NewTaskList';

function App() {
  const taskLists = useTaskStore(s => s.taskLists);

  const debugRenders = useDebugStore(s => s.debugRenders);
  const setDebugRenders = useDebugStore(s => s.setDebugRenders);

  function handleDebugChange(e) {
    setDebugRenders(e.target.checked);
  }

  return (
    <div className="App">
      <h1>Planner</h1>
      <NewTaskList />
      <div className="task-lists">
        {taskLists.map(list => (
          <TaskList key={list.id} list={list} />
        ))}
      </div>
      <label>
        <input
          type="checkbox"
          checked={debugRenders}
          onChange={handleDebugChange}
        />
        {' '}Debug renders
      </label>
    </div>
  );
}

export default App;
