import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import {
  toggleTask,
  deleteTask,
  editTask,
  setDeadline,
  clearCompleted
} from '../../store/slices/taskSlice'
import styles from './TasksList.module.sass'
import Task from './Task'
import TaskFooter from './TaskFooter'

function TasksList () {
  const tasks = useSelector(state => state.tasks)
  const dispatch = useDispatch()

  const [filter, setFilter] = useState('all')

  const handleToggleTask = id => dispatch(toggleTask({ id }))
  const handleEditTask = (id, newDescription, newDeadline) =>
    dispatch(
      editTask({ id, description: newDescription, deadline: newDeadline })
    )
  const handleDeleteTask = id => dispatch(deleteTask({ id }))
  const handleDeadline = id => dispatch(setDeadline({ id }))
  const handleClearCompleted = () => dispatch(clearCompleted())

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.isDone
    if (filter === 'active') return !task.isDone
    return true
  })

  return (
    <>
      <section className={styles.taskListContainer}>
        <ul>
          {filteredTasks.map(task => (
            <Task
              key={task.id}
              task={task}
              onToggle={() => handleToggleTask(task.id)}
              onEdit={() => handleEditTask(task.id)}
              onDelete={() => handleDeleteTask(task.id)}
              onSetDeadline={() => handleDeadline(task.id)}
            />
          ))}
        </ul>
        <TaskFooter
          tasks={tasks}
          handleClearCompleted={handleClearCompleted}
          filter={filter}
          setFilter={setFilter}
        />
      </section>
      <p className={styles.descript}>Drag and drop to reorder list</p>
    </>
  )
}

export default TasksList
