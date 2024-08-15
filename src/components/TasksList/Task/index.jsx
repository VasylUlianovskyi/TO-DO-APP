import { useState, useEffect } from 'react'
import { MdModeEditOutline, MdDeleteOutline } from 'react-icons/md'
import { CiTimer } from 'react-icons/ci'
import styles from '../TasksList.module.sass'

function Task ({ task, onToggle, onEdit, onDelete, onSetDeadline }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingDeadline, setIsEditingDeadline] = useState(false)
  const [newDescription, setNewDescription] = useState(task.description || '')
  const [newDeadline, setNewDeadline] = useState(task.deadline || '')

  useEffect(() => {
    setNewDescription(task.description || '')
    setNewDeadline(task.deadline || '')
  }, [task])

  const handleEditClick = () => {
    if (isEditing) {
      onEdit(newDescription)
    }
    setIsEditing(!isEditing)
  }

  const handleNewDeadline = () => {
    if (isEditingDeadline) {
      onSetDeadline(newDeadline)
    }
    setIsEditingDeadline(!isEditingDeadline)
  }
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleEditClick()
    }
  }

  const saveNewDeadline = e => {
    if (e.key === 'Enter') {
      handleNewDeadline()
    }
  }

  const isDeadlinePassed = task.deadline && new Date(task.deadline) < new Date()

  return (
    <li className={styles.taskEl}>
      <input type='checkbox' checked={task.isDone} onChange={onToggle} />
      <span onClick={onToggle} className={styles.newCheckboxIcon}></span>
      {isEditing ? (
        <input
          className={styles.editTask}
          type='text'
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <p
          className={`${styles.taskDescription} ${
            task.isDone
              ? styles.taskCompleted
              : isDeadlinePassed
              ? styles.taskDeadlinePassed
              : ''
          }`}
        >
          {task.description}
        </p>
      )}
      {isEditingDeadline ? (
        <input
          type='date'
          value={newDeadline}
          onChange={e => setNewDeadline(e.target.value)}
          onKeyDown={saveNewDeadline}
        />
      ) : (
        task.deadline && (
          <span
            className={`${styles.taskDescription} ${
              task.isDone
                ? styles.taskCompleted
                : isDeadlinePassed
                ? styles.taskDeadlinePassed
                : ''
            }`}
          >
            {new Date(task.deadline).toLocaleDateString('uk-UA', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
          </span>
        )
      )}
      <div className={styles.editingButtons}>
        <MdModeEditOutline onClick={handleEditClick} />
        <CiTimer onClick={handleNewDeadline} />{' '}
        <MdDeleteOutline onClick={onDelete} />
      </div>
    </li>
  )
}

export default Task
