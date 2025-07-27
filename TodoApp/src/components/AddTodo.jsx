import React, { useState } from 'react'

const AddTodo = ({setTodoCount}) => {
    const [taskName, setTaskName] = useState('')

    const handleFormSubmit = () => {
        if(!taskName){
            return alert("Task name can not be empty!")
        }
        setTaskName('')
        localStorage.setItem(taskName, "pending")
        setTodoCount(pre=>pre+1)
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter"){
            handleFormSubmit()
        }
    }

  return (
    <div style={{width:"85%", display:"flex", alignItems:"center" }}>
      <div style={{width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <input placeholder='Enter todo name' onKeyDown={handleKeyDown} onChange={(e)=>setTaskName(e.target.value)} value={taskName} type="text" name="" id="" style={{paddingLeft:"5px", height:"35px", width:"80%", fontSize:"20px", 
            borderRadius:"5px", border:"1px solid grey"
        }}/>
        <button 
        onClick={handleFormSubmit}
        className='customButton'
        style={{width:"100px"}}
        >
                + Add Task
            </button>
      </div>
    </div>
  )
}

export default AddTodo
