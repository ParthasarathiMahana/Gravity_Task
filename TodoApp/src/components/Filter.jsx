import React, { useEffect, useLayoutEffect, useState } from 'react'
import style from './filter.module.css'

const Filter = ({setShowFilterModal}) => {
  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"center", marginRight:"10px"}}>
      <button 
      className='customButton'
      style={{width:"80px"}}
      onClick={()=>setShowFilterModal(pre=>!pre)}
      >
        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", height:"90%", width:"90%"}}>
            <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.2673 6.24223C2.20553 4.40955 3.50184 1 6.26039 1H17.7396C20.4981 1 21.7945 4.40955 19.7327 6.24223L15.3356 10.1507C15.1221 10.3405 15 10.6125 15 10.8981V21.0858C15 22.8676 12.8457 23.7599 11.5858 22.5L9.58578 20.5C9.21071 20.1249 8.99999 19.6162 8.99999 19.0858V10.8981C8.99999 10.6125 8.87785 10.3405 8.66436 10.1507L4.2673 6.24223ZM6.26039 3C5.34088 3 4.90877 4.13652 5.59603 4.74741L9.99309 8.6559C10.6336 9.22521 11 10.0412 11 10.8981V19.0858L13 21.0858V10.8981C13 10.0412 13.3664 9.22521 14.0069 8.6559L18.404 4.74741C19.0912 4.13652 18.6591 3 17.7396 3H6.26039Z" fill="#f2f2f2"></path> </g></svg>
            <p>
                Filter
            </p>
        </div>
      </button>
    </div>
  )
}

export const FilterModal = ({setTodoItems, setShowFilterModal, appliedFilter, setAppliedFilter}) => {
  const [done, setDone] = useState(false)
  const [pending, setPending] = useState(false)
  const [all, setAll] = useState(false)

  useLayoutEffect(()=>{
    
    for(let item in appliedFilter){
      
      if(appliedFilter[item]){
        if(item==='done'){
          setDone(true)
        }
        if(item==='pending'){
          setPending(true)
        }
        if(item==='all'){
          setAll(true)
        }
      }
    }
  }, [appliedFilter])

  const handleApply = () => {
    let allTodos = Object.entries(localStorage)

    let filter = {done:done, pending: pending, all:all}
    setAppliedFilter(filter)

    if(!all && !done && !pending){
      return setShowFilterModal(false)
    }
    
    if(all || (done && pending)){
      setTodoItems(allTodos)
      return setShowFilterModal(false)
    }

    if(done){
      let doneTodos = allTodos.filter(item=>item[1]==='done')
      setTodoItems(doneTodos)
      return setShowFilterModal(false)
    }

    let pendingTodos = allTodos.filter(item=>item[1]==='pending')
    setTodoItems(pendingTodos)
    return setShowFilterModal(false)
  }

  const handleReset = () => {
    let allTodos = Object.entries(localStorage)
    setTodoItems(allTodos)
    setAppliedFilter({})
    setShowFilterModal(false)
  }

  return(
     <>
          <div className={style.filterModal}>
            <div className={style.heading}>Filter</div>
            <div className={style.filterBody}>
              <div className={style.checkboxGroup}>
                <div>
                <input type="checkbox" style={{marginRight:"5px"}} checked={done } onChange={()=>setDone(pre=>!pre)}/>Done
                </div>
                <div>
                <input type="checkbox" style={{marginRight:"5px"}} checked={pending} onChange={()=>setPending(pre=>!pre)}/>Pending
                </div>
                <div>
                <input type="checkbox" style={{marginRight:"5px"}} checked={all} onChange={()=>setAll(pre=>!pre)}/>All
                </div>
                <div className={style.buttonGroup}>
                  <button style={{border:"1px solid navy", color:"navy"}} onClick={handleReset}>Reset</button>
                  <button style={{backgroundColor:"navy", color:"white"}} onClick={handleApply}>Apply</button>
                </div>
              </div>
            </div>
          </div>
        </>
  )
}

export default Filter
