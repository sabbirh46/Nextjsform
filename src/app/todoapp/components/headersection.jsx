"use client"
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const HeaderSection = ({ setTodoList, filterVal, setFilterVal, todoList }) => {
  const [task, setTask] = useState('')

  const selectValue = [
    { value: 'all', name: 'All' },
    { value: 'completed', name: 'Completed' },
    { value: 'uncompleted', name: 'Uncompleted' }
  ]

  const handleAddTask = () => {
    setTodoList(pre => [...pre,{ task, id:uuidv4(), isCompleted: false }])
    // reset the input value
    setTask('')
  }

  return (
    <div className='mb-8'>
      <h1 className='text-grey-darkest text-3xl'>Todo List</h1>
      <div className='flex mt-4 gap-5'>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 '
          placeholder='Add task'
          value={task}
          onChange={e => setTask(e.target.value)}
        />
        <button
          className='p-2 border-2 rounded text-teal-900 border-teal hover:text-white hover:bg-green-light bg-green-lighter '
          onClick={() => handleAddTask()}
          disabled={task === ''}
        >
          Add
        </button>
        <select
          className='shadow appearance-none border rounded py-2 px-3  text-grey-darker flex-no-grow'
          onChange={e => setFilterVal(e.target.value)}
          value={filterVal}
        >
          {selectValue.map((item, index) => (
            <option value={item.value} key={`filter_option${index}`}>
              {item.name}
            </option>
          ))}
          
        </select>
      </div>
    </div>
  )
}

export default HeaderSection
