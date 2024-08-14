import { MdModeEditOutline, MdDeleteOutline } from 'react-icons/md'
import { CiTimer } from 'react-icons/ci'
import styles from '../TasksList.module.sass'

function Task ({ task, onToggle, onEdit, onDelete, onSetDeadline }) {
  return (
    <li className={styles.taskEl}>
      <input type='checkbox' checked={task.isDone} onChange={onToggle} />
      <span onClick={onToggle} className={styles.newCheckboxIcon}></span>
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
        <MdModeEditOutline onClick={onEdit} />
        <MdDeleteOutline onClick={onDelete} />
        <CiTimer onClick={onSetDeadline} />
      </div>
    </li>
  )
}

export default Task
