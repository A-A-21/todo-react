import './App.css';
import Add from "./components/Add";
import TaskList from "./components/TaskList";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:3001').then((response) => response.json()).then((data) => setTasks(data));
  }, [])


  return (
    <div className="container" style={{paddingTop: '50px'}}>
      <Add setTasks={setTasks}/>
      <TaskList tasks={tasks} setTasks={setTasks}/>
    </div>
  );
}

export default App;
