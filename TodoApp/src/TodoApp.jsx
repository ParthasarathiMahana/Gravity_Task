import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './components/TodoList'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'
import Filter,{FilterModal} from './components/Filter'

function TodoApp() {
  const [todoCount, setTodoCount] = useState(0)
  const [showFilterModal, setShowFilterModal] = useState(false)
      let [todoItems, setTodoItems] = useState([])

  return (
    <>
    <div className='container'>
      <div className='formSection'>
        <AddTodo setTodoCount={setTodoCount}/>
        <Filter setShowFilterModal={setShowFilterModal}/>
      </div>
      <div className='listSection'>
        <TodoList todoCount={todoCount} setTodoCount={setTodoCount} todoItems={todoItems} setTodoItems={setTodoItems} />
      </div>
    </div>
    {showFilterModal ? 
       <FilterModal setFilteredValues={setFilteredValues}/>
        :""}
    </>
  )
}

export default TodoApp
