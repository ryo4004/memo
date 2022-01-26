import { useState } from 'react'

type Todo = {
  id: string
  label: string
}

export const useTodo = () => {
  const [todoList, setTodoList] = useState<Array<Todo>>([])

  const addTodo = (label: string) => {
    const newTodo = {
      id: String(new Date().getTime()),
      label,
    }
    setTodoList([...todoList, newTodo])
  }

  const removeTodo = (id: string) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id)
    setTodoList(newTodoList)
  }

  return { todoList, addTodo, removeTodo }
}
