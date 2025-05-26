import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts'
import { TodoForm, TodoItem } from './components'

function App() {
  const [todos, SetTodos] = useState([])

  const addTodo = (todo) => {
    console.log("yes")
    SetTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    SetTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    SetTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    SetTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      SetTodos(todos)
    }
  }, [])



  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))

  }, [todos])



  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] min-h-screen py-16 px-4">
        <div className="w-full max-w-2xl mx-auto bg-white notebook-paper shadow-2xl rounded-2xl px-6 py-12 text-black">

          <h1 className="text-3xl font-bold text-center mb-10 mt-2 tracking-wide">📝 Manage Your Todos</h1>

          <div className="mb-6">
            <TodoForm />
          </div>

          <div className="h-[400px] overflow-y-auto flex flex-col gap-4">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <div className="rounded-xl p-4 shadow hover:shadow-lg transition duration-300 ease-in-out">
                  <TodoItem todo={todo} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>

  )
}

export default App
