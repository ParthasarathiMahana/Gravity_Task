import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './components/TodoList'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'
import Filter from './components/Filter'

function TodoApp() {
  const [todoCount, setTodoCount] = useState(0)

  return (
    <div className='container'>
      <div className='formSection'>
        <AddTodo setTodoCount={setTodoCount}/>
        <Filter/>
      </div>
      <div className='listSection'>
        <TodoList todoCount={todoCount} setTodoCount={setTodoCount}/>
      </div>
    </div>
  )
}

export default TodoApp
