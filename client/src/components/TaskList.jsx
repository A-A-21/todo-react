import Task from "./Task";

function TaskList ({tasks, setTasks}) {
   return (<div>
     {tasks?.map((el) => (
       <Task key={el.id} title={el.title} condition={el.condition} id={el.id} setTasks={setTasks}/>
     ))}
   </div>);
}

export default TaskList;
