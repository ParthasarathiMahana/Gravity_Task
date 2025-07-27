import React from 'react'
import style from './TodoItem.module.css'

const TodoItem = ({name, status, setTodoCount}) => {
    const handleDelete = () => {
        let deleteAlert = confirm("Do you want to delete "+name+" from your Todo List?")
        if(deleteAlert){
            localStorage.removeItem(name)
            setTodoCount(pre=>pre-1)
        }
    }

    const handleMarkDone = () => {
        if(status === 'pending'){
        let doneAlert = confirm("Do you want to mark "+name+" as done?")
        if(doneAlert){
            localStorage.setItem(name, 'done')
            setTodoCount(pre=>pre-1)
        }
        }
    }

  return (
    <div className={style.ItemContainer}>
      <div className={style.headingSection}>
        <div className={style.heading}>{name}</div>
        <div className={status!=='pending'? style.statusDone : style.statusPending}>
            <div style={{border:"2px solid white", borderRadius:"50%", height:"5px", width:"5px"}}></div>
            {status}
        </div>
      </div>
      <div className={style.buttonSection}>
        <button style={{width:"35%", border:"none", backgroundColor:"red", padding:"8px", color:"white", borderRadius:"5px", cursor:"pointer"}} onClick={handleDelete}>Delete</button>
        <button onClick={handleMarkDone} style={{width:"60%", border:"none", backgroundColor:`${status!=='pending'? "gray":"green"}`, padding:"8px", color:"white", borderRadius:"5px", cursor:"pointer"}} disabled={status!=='pending'}>{status!=='pending'? 'Done' : 'Mark as Done'}</button>
      </div>
    </div>
  )
}

export default TodoItem
