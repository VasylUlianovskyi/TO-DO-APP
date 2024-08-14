import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { MdModeEditOutline } from 'react-icons/md'
import { MdDeleteOutline } from 'react-icons/md'
import { CiTimer } from 'react-icons/ci'
import {
  toggleTask,
  deleteTask,
  editTask,
  setDeadline,
  clearCompleted
} from '../../store/slices/taskSlice'
import styles from './TasksList.module.sass'

function TasksList () {
  const tasks = useSelector(state => state.tasks)
  const dispatch = useDispatch()

  const [filter, setFilter] = useState('all')

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

  const handleClearCompleted = () => {
    dispatch(clearCompleted())
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.isDone
    if (filter === 'active') return !task.isDone
    return true
  })

  return (
    <section className={styles.taskListContainer}>
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id} className={styles.taskEl}>
            <input
              type='checkbox'
              checked={task.isDone}
              onChange={() => handleToggleTask(task.id)}
            />
            <span
              onClick={() => handleToggleTask(task.id)}
              className={styles.newCheckboxIcon}
            ></span>
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
      <footer className={styles.taskListFooter}>
        <p>{tasks.filter(task => !task.isDone).length} task left</p>
        <div className={styles.filters}>
          <button
            className={filter === 'all' ? styles.activeFilter : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>{' '}
          <button
            className={filter === 'active' ? styles.activeFilter : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={filter === 'completed' ? styles.activeFilter : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        <button className={styles.clearComplBtn} onClick={handleClearCompleted}>
          Clear Completed
        </button>
      </footer>
    </section>
  )
}

export default TasksList
