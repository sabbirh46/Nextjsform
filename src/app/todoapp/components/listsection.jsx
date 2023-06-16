"use client"
import React from 'react'

const Listsection = ({ todoList, setTodoList, filterVal }) => {

     // complete function
  const handleComplete = id => {
    const taskListCopy = [...todoList]
    const makeComplete = taskListCopy.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    )
    setTodoList(makeComplete)
  }
  // delete function
  const handleDelete = id => {
    const taskListCopy = [...todoList]
    const makeDelete = taskListCopy.filter(item => item.id !== id && item)
    setTodoList(makeDelete)
  }
  return (
    <div>
    {todoList?.sort((a,b) => a.isCompleted - b.isCompleted)?.map(
        (item, index) =>
          ((item.isCompleted && filterVal === 'completed') ||
            (!item.isCompleted && filterVal === 'uncompleted') ||
            filterVal === 'all') && (
            <div
              className={`flex mb-4 items-center ${
                !item.isCompleted ? 'bg-green-lighter' : 'bg-red-lighter'
              } px-3 py-1 border border-amber rounded cursor-pointer`}
              key={`${item.id}_${index}`}
            >
              <span className='mr-4 font-bold text-sm'>{index + 1}.</span>
              <p
                className={`w-full text-grey-darkest ${
                  item.isCompleted && 'line-through'
                }`}
              >
                {item.task}
              </p>
              <button
                className={`flex-no-shrink px-2 py-1 ml-4 mr-2 border-2 rounded ${
                  item.isCompleted
                    ? 'border-red hover:bg-red-light'
                    : 'border-green hover:bg-green-light'
                }`}
                onClick={() => handleComplete(item.id)}
              >
                {!item.isCompleted ? '✔️' : '❌'}
              </button>
              <button
                className='flex-no-shrink px-2 py-1 border-2 rounded text-red border-red hover:text-white hover:bg-red'
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          )
      )} 

    </div>
  )
}

export default Listsection