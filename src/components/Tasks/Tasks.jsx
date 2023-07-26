import { useEffect } from 'react';
import TasksItem from '../ui/Taskitem/TasksItem';
import CreateTaskForm from './CreateTaskForm';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteTodo, FetchTodos } from './TasksSlicer';



function Tasks() {

  const {tasks, status, error} = useSelector(state => state.todos);
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(FetchTodos());
  }, [dispatch]);
  
  const handleDelete = (id) => {
    dispatch(DeleteTodo(id));
  };

  return (
    <div>
      <CreateTaskForm 
      titel ={'Add task'}/>
      {status === 'loading' && <h2>Loading...</h2> }
      {error && <h2>Error: Server error</h2>}
      <ul>
        {tasks.map(task =>(
        <TasksItem 
        text ={task.text}
        id={task.id}
        key={task.id}
        onDelete={handleDelete}
        />
        ))}
      </ul>
    </div>
  )
}

export default Tasks