import { useEffect } from 'react';
import './index.css';

const STATUSES = ['TODO', 'IN_PROGRESS', 'DONE'] as const;
type Status = typeof STATUSES[number];

interface Task {
  id: number;
  title: string;
  status: Status;
}

interface BoardProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

function Board({ tasks, setTasks }: BoardProps) {
  // fetch task
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch('http://localhost:3001/api/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        console.log('Failed to fetch data');
      }
    }
    fetchTasks();
  }, [setTasks]);

  // group tasks by status
  const columns = STATUSES.map((status) => ({
    status,
    tasks: tasks.filter((task) => task.status === status),
  }));

  // change status handler
  const handleStatusChange = async (taskId: number, newStatus: Status) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const updatedTask = await response.json();

      // render
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (err) {
      console.log('Failed to update task');
    }
  };

  // DELETE a task
  const handleDelete = async (taskId: number) => {
    try {
      await fetch(`http://localhost:3001/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      console.log('Failed to delete task');
    }
  };

  return (
    <div className="board">
      {columns.map(({ status, tasks: columnTasks }) => (
        <div key={status} className="board-column">
          <h2 className="column-title">{status}</h2>
          <ul className="task-list">
            {columnTasks.map((task) => (
              <li key={task.id} className="task-card">
                <span className="task-title">{task.title}</span>
                <div className="task-actions">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task.id, e.target.value as Status)
                    }
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Board;