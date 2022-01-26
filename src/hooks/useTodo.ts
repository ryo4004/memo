import { useState } from 'react'

type Todo = {
  id: string
  label: string
}

export const useTodo = () => {
  const [todoList, setTodoList] = useState<Array<Todo>>([])
  const [todoInput, setTodoInput] = useState<string>('')

  const updateTodoInput = (value: string | null | undefined) => {
    if (value) {
      setTodoInput(value)
    }
  }

  const addTodo = () => {
    if (todoInput !== '') {
      const newTodo = {
        id: String(new Date().getTime()),
        label: todoInput,
      }
      setTodoList([...todoList, newTodo])
      setTodoInput('')
    }
  }

  const removeTodo = (id: string) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id)
    setTodoList(newTodoList)
  }

  return { todoList, addTodo, removeTodo, todoInput, updateTodoInput }
}
