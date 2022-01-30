import { useState, useEffect } from 'react'
import { DateTime } from 'luxon'

import * as storage from '../utilities/storage'

const STORAGE_KEY = 'todolist'

type Todo = {
  id: string
  label: string
  span: number
  lastDate: DateTime | null
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

  useEffect(() => {
    // eslint-disable-next-line
    ;(async () => {
      const storageData = await storage.getData(STORAGE_KEY)
      if (storageData) {
        const parsedData: { list: Array<Todo> } = JSON.parse(storageData)
        const newList = parsedData.list.map((todo) => ({
          ...todo,
          lastDate: todo.lastDate ? DateTime.fromMillis(Number(todo.lastDate)) : null,
        }))
        setTodoList(newList)
      }
    })()
  }, [])

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
      const newList = [...todoList, newTodo]
      setTodoList(newList)
      storage.setData(STORAGE_KEY, {
        list: newList.map((l) => ({ ...l, lastDate: l.lastDate ? l.lastDate.toMillis() : null })),
      })
      setTodoInput(initInput)
      return true
    }
  }

  const removeTodo = (id: string) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id)
    setTodoList(newTodoList)
  }

  return { todoList, addTodo, removeTodo, todoInput, updateInput }
}
