import { combineReducers } from 'redux'
import todoList from './todoListReducer'

const todoApp = combineReducers({
  todoList
})

export default todoApp
