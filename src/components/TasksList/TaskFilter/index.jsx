import styles from '../TasksList.module.sass'

function TaskFilters ({ filter, setFilter }) {
  return (
    <div className={styles.filters}>
      <button
        className={filter === 'all' ? styles.activeFilter : ''}
        onClick={() => setFilter('all')}
      >
        All
      </button>
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
  )
}

export default TaskFilters
