import { useState } from "react";
import './index.css';

function Actions({tasks, setTasks}) {
    const [newTaskTitle, setNewTaskTitle] = useState('');

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

    return(
        <div className="actions-wrapper">
            <form onSubmit={handleSubmit}>
                <input
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="New task..."
                />
                <button>Create Task</button>
            </form>
        </div>
    );
}

export default Actions;