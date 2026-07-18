import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")

    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)

    }
  }, [])

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleOnChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")

  }

  const handleCheckBox = (id) => {
    console.log(`this is my ${id}`);
    let index = todos.findIndex(item => {
      return item.id === id;
    })

    console.log(index);
    let newTodos = [...todos]
    newTodos[index] = { ...newTodos[index], isCompleted: !newTodos[index].isCompleted }
    setTodos(newTodos)
    console.log(newTodos);
  }

  const handleDlt = (id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos);
  }

  const handleEdit = (id) => {
    let newTodos = todos.find(item => {
      return item.id === id;
    })

    setTodo(newTodos.todo) //just needs the todo not the whole object which has id, index etc
    let setNewTodos = todos.filter(item => {
      return item.id !== id;
    })

    setTodos(setNewTodos)
  }

  const handleRemoveCompleted = (id) => {
    let newTodos = todos.filter(item => {
      return item.isCompleted === false
    })
    setTodos(newTodos)

  }

  return (
    <>
      <Navbar/>

      <div className="container w-full md:max-w-[80%] lg:max-w-4xl bg-violet-200 my-5 rounded-md p-4 md:p-10 min-h-[85vh] mx-auto">

        <div className="addTodos">

          <h2 className='text-lg font-semibold'>Add a Todo</h2>
      
          <div className='flex flex-col md:flex-row gap-3 mt-3' >
            <input onChange={handleOnChange}
              value={todo}
              className='flex-1 border-2 rounded w-full px-3 h-10'
              type='text'
              placeholder='type something'
              />

            <button onClick={handleAdd}
              className=' transition-all hover:scale-105 active:scale-90 bg-violet-950 w-20 cursor-pointer rounded-md text-white h-10'> Add
            </button>
          </div>

<br/>

          <h1 className='text-lg font-semibold'>Your Todos
          </h1>

          {todos.map(item => {

            return item.todo.length > 0 && (<div key={item.id} >

              <div className='flex flex-col md:flex-row md:items-center justify-between my-3 gap-2'>

                <input onChange={() => handleCheckBox(item.id)}
                  type="checkbox"
                  checked={item.isCompleted}
                  className='w-8 h-5 mr-3 cursor-pointer'/>

                <div
                  className={`text border-gray-500 border rounded h-10 p-2 flex-1 ${item.isCompleted ? "line-through" : ""} `}>
                  {item.todo}
                </div>

                <button onClick={() => handleEdit(item.id)}
                  className="flex items-center justify-center bg-violet-950 px-4 cursor-pointer rounded-md text-white h-10 transition-all hover:scale-105 active:scale-90">
                  <MdModeEdit />
                </button>

                <button onClick={() => handleDlt(item.id)}
                  className='flex items-center justify-center bg-violet-950 px-4 cursor-pointer rounded-md text-white h-10 transition-all hover:scale-105 active:scale-90'>
                  <RiDeleteBin6Fill/>
                </button>

              </div>
            </div>
            )
          })}

          <div className="flex justify-end mt-2">
            {todos.length > 0 &&
              <button onClick={handleRemoveCompleted}
                className="bg-violet-950 px-4 cursor-pointer rounded-md text-white h-10 transition-all hover:scale-105 active:scale-90">
                Remove completed tasks
              </button>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
