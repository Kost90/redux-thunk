import { useEffect } from 'react';
import TasksItem from '../ui/Taskitem/TasksItem';
import CreateTaskForm from './CreateTaskForm';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteTodo, FetchTodos } from './TasksSlicer';
import styles from './Tasks.module.css'



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
    <div className={styles.container}>
      <CreateTaskForm 
      titel ={'Add task'}/>
      {status === 'loading' && <h2 className={styles.loading}>Loading...</h2> }
      {error && <h2>Error: Server error</h2>}
      <ul className={styles.container_ul}>
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