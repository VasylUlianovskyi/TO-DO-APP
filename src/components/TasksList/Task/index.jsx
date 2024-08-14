import { useState, useEffect } from 'react'
import { MdModeEditOutline, MdDeleteOutline } from 'react-icons/md'
import { CiTimer } from 'react-icons/ci'
import styles from '../TasksList.module.sass'

function Task ({ task, onToggle, onEdit, onDelete, onSetDeadline }) {
  const [isEditing, setIsEditing] = useState(false)
  const [newDescription, setNewDescription] = useState(task.description || '')
  const [newDeadline, setNewDeadline] = useState(task.deadline || '')

  useEffect(() => {
    setNewDescription(task.description || '')
    setNewDeadline(task.deadline || '')
  }, [task])

  const handleEditClick = () => {
    if (isEditing) {
      onEdit(newDescription, newDeadline)
    }
    setIsEditing(!isEditing)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleEditClick()
    }
  }

  return (
    <li className={styles.taskEl}>
      <input type='checkbox' checked={task.isDone} onChange={onToggle} />
      <span onClick={onToggle} className={styles.newCheckboxIcon}></span>
      {isEditing ? (
        <div>
          <input
            type='text'
            value={newDescription}
            onChange={e => setNewDescription(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            type='date'
            value={newDeadline}
            onChange={e => setNewDeadline(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      ) : (
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
      )}
      <div className={styles.editingButtons}>
        <MdModeEditOutline onClick={handleEditClick} />
        <MdDeleteOutline onClick={onDelete} />
        <CiTimer onClick={onSetDeadline} />
      </div>
    </li>
  )
}

export default Task
