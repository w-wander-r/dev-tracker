import './reset.css';
import { useState } from "react"
import Header from "./components/header/Header";
import Actions from './components/actionButtons/Actions';
import Board from './components/Board/Board';

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <div>
        <Header/>

        <Actions tasks={tasks} setTasks={setTasks} />

        <Board tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App
