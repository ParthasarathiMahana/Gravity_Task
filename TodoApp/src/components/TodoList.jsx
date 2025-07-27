import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem'
import style from './TodoList.module.css'

const TodoList = ({todoCount, setTodoCount, todoItems, setTodoItems, appliedFilter}) => {
    useEffect(()=>{
      console.log(appliedFilter);
      
        let tempTodoItems = Object.entries(localStorage)
        if(appliedFilter.all || (appliedFilter.done && appliedFilter.pending) || (!appliedFilter.all && !appliedFilter.done && !appliedFilter.pending)){
          return setTodoItems(tempTodoItems) 
        }
        tempTodoItems = tempTodoItems.filter(item=>appliedFilter[item[1]]===true)
        setTodoItems(tempTodoItems)
    },[todoCount])
  return (
    <div className={style.listContainer}>
      {!todoItems ? <h1>+ Add Todo</h1> : 
        todoItems.map((item, index)=><TodoItem key={index} name={item[0]} status={item[1]} setTodoCount={setTodoCount}/>)}
    </div>
  )
}

export default TodoList
