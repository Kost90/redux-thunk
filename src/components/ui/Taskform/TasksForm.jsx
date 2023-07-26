

function TasksForm({onSubmit, defaultValues = {}, titel}) {
  return (
    <form onSubmit={onSubmit}>
      <input type='text' name='text' defaultValue={defaultValues.text}/>
      <button type="submit">{titel}</button>
    </form>
  )
}

export default TasksForm