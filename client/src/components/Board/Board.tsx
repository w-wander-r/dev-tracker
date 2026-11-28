import { useEffect } from 'react';
import './index.css';

function Board({tasks, setTasks}) {
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

    return (
        <div className="">
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.title}  -  {task.status}</li>
                ))}
            </ul>
        </div>
    )
}

export default Board;