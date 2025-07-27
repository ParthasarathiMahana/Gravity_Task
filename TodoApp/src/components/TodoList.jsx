import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem'
import style from './TodoList.module.css'

const TodoList = ({todoCount, setTodoCount}) => {
    let [todoItems, setTodoItems] = useState([])
    useEffect(()=>{
        let tempTodoItems = Object.entries(localStorage)
        setTodoItems(tempTodoItems)
    },[todoCount])
  return (
    <div className={style.listContainer}>
        {todoItems.map(item=><TodoItem name={item[0]} status={item[1]} setTodoCount={setTodoCount}/>)}
    </div>
  )
}

export default TodoList
