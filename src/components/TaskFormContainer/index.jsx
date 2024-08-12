import { useDispatch } from 'react-redux'
import TaskForm from '../TaskForm'
import { addTask } from '../../store/slices/taskSlice'

function TaskFormContainer () {
  const dispatch = useDispatch()

  const handleAddTask = task => {
    dispatch(addTask(task))
  }

  return <TaskForm onSubmit={handleAddTask} />
}

export default TaskFormContainer
