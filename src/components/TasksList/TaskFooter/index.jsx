import TaskFilters from '../TaskFilter'
import styles from '../TasksList.module.sass'

function TaskFooter ({ tasks, handleClearCompleted, filter, setFilter }) {
  const remainingTasks = tasks.filter(task => !task.isDone).length

  return (
    <footer className={styles.taskListFooter}>
      <p>{remainingTasks} task left</p>
      <TaskFilters filter={filter} setFilter={setFilter} />
      <button className={styles.clearComplBtn} onClick={handleClearCompleted}>
        Clear Completed
      </button>
    </footer>
  )
}

export default TaskFooter
