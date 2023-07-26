import { configureStore } from '@reduxjs/toolkit'
import  TasksReducer  from '../Tasks/TasksSlicer'

export const Store = configureStore ({
  reducer: {
    todos: TasksReducer,
  }
}) 
