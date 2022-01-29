import { useState } from 'react'
import { DateTime } from 'luxon'

type Todo = {
  id: string
  label: string
  span: number
  lastDate: DateTime
}

type TodoInput = {
  label: string
  span: string
  lastDate: string
}

type InputType = keyof TodoInput

const initInput: TodoInput = { label: '', span: '', lastDate: '' }

export const useTodo = () => {
  const [todoList, setTodoList] = useState<Array<Todo>>([])
  const [todoInput, setTodoInput] = useState<TodoInput>(initInput)

  const updateInput = (type: InputType, value: string | null | undefined) => {
    if (value) {
      const newInput = {
        ...todoInput,
        [type]: value,
      }
      setTodoInput(newInput)
    }
  }

  const addTodo = () => {
    if (todoInput.label !== '') {
      const newTodo = {
        id: String(new Date().getTime()),
        label: todoInput.label,
        span: Number(todoInput.span),
        lastDate: DateTime.fromFormat(todoInput.lastDate, 'yyyy-M-d'),
      }
      setTodoList([...todoList, newTodo])
      setTodoInput(initInput)
    }
  }

  const removeTodo = (id: string) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id)
    setTodoList(newTodoList)
  }

  return { todoList, addTodo, removeTodo, todoInput, updateInput }
}
