import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {
    const [todo, setTodo] = useState("")
    const { addTodo } = useTodo()

    const add = (e) => {
        e.preventDefault()

        if (!todo) return

        addTodo({ todo, completed: false })
        setTodo("")
    }

    return (
        <form
            onSubmit={add}
            className="flex rounded-lg shadow-md overflow-hidden border border-gray-300 bg-white notebook-style"
        >
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full px-4 py-2 text-gray-800 bg-transparent outline-none font-[cursive] placeholder-gray-500"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 font-semibold transition"
            >
                Add
            </button>
        </form>

    );
}

export default TodoForm;