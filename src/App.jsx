import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts'
import { TodoForm, TodoItem } from './components'

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

 
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'not-completed') return !todo.completed;
    return true; // all
  });

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] min-h-screen py-16 px-4">
        <div className="w-full max-w-2xl mx-auto bg-white notebook-paper shadow-2xl rounded-2xl px-6 py-12 text-black">
          <h1 className="text-3xl font-bold text-center mb-10 mt-2 tracking-wide">📝 Manage Your Todos</h1>

          <div className="mb-6">
            <TodoForm />
          </div>

          
          <div className="flex justify-center gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded-full ${filter === "all" ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-full ${filter === "completed" ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
            <button
              className={`px-4 py-2 rounded-full ${filter === "not-completed" ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-200"}`}
              onClick={() => setFilter("not-completed")}
            >
              Pending
            </button>
          </div>

          
          <div className="h-[400px] overflow-y-auto flex flex-col gap-4">
            {filteredTodos.map((todo) => (
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
  );
}

export default App;
