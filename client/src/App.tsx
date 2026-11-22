import { useEffect, useState } from "react"

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(()=>{
    async function fetchTasks() {
      try{
        const response = await fetch('http://localhost:3001/api/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        console.log('Failed to fetch data')
      }
    }
    fetchTasks();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/tasks' , {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({title: newTaskTitle})
    })
      .then(res => res.json())
      .then(savedTask => {
        setTasks([...tasks, savedTask]);
        setNewTaskTitle('');
      })
  }
  return (
    <div>
        <h1>Dev Tracker</h1>
        <form onSubmit={handleSubmit}>
          <input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="New task..."
          />
          <button>Create Task</button>
        </form>

        <ul>
          {tasks.map(task => (
            <li key={task.id}>{task.title}  -  {task.status}</li>
          ))}
        </ul>
    </div>
  );
}

export default App
