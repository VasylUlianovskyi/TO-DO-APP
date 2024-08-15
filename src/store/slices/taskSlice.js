import { createSlice } from '@reduxjs/toolkit'

const loadTasksFromLocalStorage = () => {
  try {
    const serializedTasks = localStorage.getItem('tasks')
    if (serializedTasks === null) return []
    return JSON.parse(serializedTasks)
  } catch (err) {
    return []
  }
}

const saveTasksToLocalStorage = tasks => {
  try {
    const serializedTasks = JSON.stringify(tasks)
    localStorage.setItem('tasks', serializedTasks)
  } catch (err) {
    console.error('Не вдалося зберегти завдання у localStorage', err)
  }
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: loadTasksFromLocalStorage(),
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        description: action.payload.description,
        isDone: false,
        deadline: action.payload.deadline
      }
      state.push(newTask)
      saveTasksToLocalStorage(state)
    },

    deleteTask: (state, action) => {
      const updatedTasks = state.filter(task => task.id !== action.payload.id)
      saveTasksToLocalStorage(updatedTasks)
      return updatedTasks
    },

    clearCompleted: state => {
      return state.filter(task => !task.isDone)
    },

    toggleTask: (state, action) => {
      const task = state.find(task => task.id === action.payload.id)
      if (task) {
        task.isDone = !task.isDone
        saveTasksToLocalStorage(state)
      }
    },

    editTask: (state, action) => {
      const task = state.find(task => task.id === action.payload.id)
      if (task && !task.isDone) {
        task.description = action.payload.description
        saveTasksToLocalStorage(state)
      } else {
        console.error('Завдання не знайдено або вже виконане.')
      }
    },

    setDeadline: (state, action) => {
      const task = state.find(task => task.id === action.payload.id)
      if (task && !task.isDone) {
        task.deadline = action.payload.deadline
        saveTasksToLocalStorage(state)
      } else {
        console.error('Завдання не знайдено або вже виконане.')
      }
    }
  }
})

export const {
  addTask,
  deleteTask,
  toggleTask,
  editTask,
  setDeadline,
  clearCompleted
} = tasksSlice.actions
export default tasksSlice.reducer
