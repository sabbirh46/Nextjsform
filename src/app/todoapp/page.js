"use client"
import React, { useState, useEffect } from 'react'
import Headersection from './components/headersection'
import Listsection from './components/listsection'
import UseDidMountEffect from './hooks/useDidMountEffect'
 function todo(){
const [todoList, setTodoList]=useState([])
const [filterVal, setFilterVal] = useState('all')

UseDidMountEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList])
  
  useEffect(() => {
    setTodoList(JSON.parse(localStorage.getItem('todoList')))
  }, [])

return(
   
    
   
    <div className="h-screen overflow-hidden flex items-center justify-center  bg-red-light">
    
     <div className="h-100 w-full flex items-center justify-center  font-sans">
       <div className="bg-white rounded shadow-lg p-6 m-4 w-full lg:w-1/2">
          <Headersection
             setTodoList={setTodoList}
              filterVal={filterVal}
              todoList={todoList}
              setFilterVal={setFilterVal}
          />
          <Listsection
             todoList={todoList}
              setTodoList={setTodoList}
              filterVal={filterVal}
          />
       </div>
     </div>
     
    </div>

   



)




}

export default todo