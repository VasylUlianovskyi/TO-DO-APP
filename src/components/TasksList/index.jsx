import { useSelector, useDispatch } from 'react-redux'
import { MdModeEditOutline } from 'react-icons/md'
import { MdDeleteOutline } from 'react-icons/md'
import { CiTimer } from 'react-icons/ci'
import {
  toggleTask,
  deleteTask,
  editTask,
  setDeadline
} from '../../store/slices/taskSlice'
import styles from './TasksList.module.sass'
function TasksList () {
  const tasks = useSelector(state => state.tasks)
  const dispatch = useDispatch()

  const handleToggleTask = id => {
    dispatch(toggleTask({ id }))
  }

  const handleEditTask = (id, newDescription, newDeadline) => {
    dispatch(
      editTask({ id, description: newDescription, deadline: newDeadline })
    )
  }

  const handleDeleteTask = id => {
    dispatch(deleteTask({ id }))
  }

  const handleDeadline = id => {
    dispatch(setDeadline({ id }))
  }

  return (
    <ul className={styles.taskListContainer}>
      {tasks.map(task => (
        <li key={task.id} className={styles.taskEl}>
          <input
            type='checkbox'
            checked={task.isDone}
            onChange={() => handleToggleTask(task.id)}
          />
          <p
            style={{
              textDecoration: task.isDone ? 'line-through' : 'none',
              color: task.isDone ? 'grey' : 'black'
            }}
          >
            {task.description}{' '}
            {task.deadline && (
              <span>{new Date(task.deadline).toLocaleDateString()}</span>
            )}
          </p>
          <div className={styles.editingButtons}>
            <MdModeEditOutline onClick={() => handleEditTask(task.id)} />
            <MdDeleteOutline onClick={() => handleDeleteTask(task.id)} />
            <CiTimer onClick={() => handleDeadline(task.id)} />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TasksList
