import styles from './Taskform.module.css' 

function TasksForm({onSubmit, defaultValues = {}, titel}) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <input type='text' name='text' defaultValue={defaultValues.text}/>
      <button type="submit">{titel}</button>
    </form>
  )
}

export default TasksForm