import { useState, useEffect, useContext, createContext } from 'react'
import { DateTime } from 'luxon'

import { noop } from '../utilities/noop'
import * as storage from '../utilities/storage'

const STORAGE_KEY = 'todolist'

type State = {
  todoList: Array<Todo>
  todoInput: TodoInput
}

type TodoType = State & {
  addTodo: () => boolean
  removeTodo: (id: number) => void
  updateInput: (type: InputType, value: string | null | undefined) => void
}

const initState = {
  todoList: [],
  todoInput: { label: '', span: '', lastDate: '' },
}

export const TodoContext = createContext<TodoType>({
  ...initState,
  addTodo: () => false,
  removeTodo: noop,
  updateInput: noop,
})

export const useTodoContext = () => {
  return useContext(TodoContext)
}

type Todo = {
  id: number
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

export const useTodo = (): TodoType => {
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
        id: new Date().getTime(),
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
    } else {
      return false
    }
  }

  const removeTodo = (id: number) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id)
    setTodoList(newTodoList)
  }

  return { todoList, addTodo, removeTodo, todoInput, updateInput }
}
