import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './slices/taskSlice'
import weatherReducer from './slices/weatherSlice'

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    weather: weatherReducer
  }
})

export default store
