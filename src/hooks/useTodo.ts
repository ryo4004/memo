import { useState, useEffect, useContext, createContext } from 'react'
import { DateTime } from 'luxon'

import { noop } from '../utilities/noop'
import * as storage from '../utilities/storage'

const STORAGE_KEY = 'todolist'

type State = {
  roomList: Array<Room>
  todoList: Array<Todo>
}

type TodoType = State & {
  addRoom: () => void
  removeRoom: () => void
  addTodo: (validatedInput: Todo) => void
  removeTodo: (id: number) => void
}

const initState: State = {
  roomList: [],
  todoList: [],
}

export const TodoContext = createContext<TodoType>({
  ...initState,
  addRoom: noop,
  removeRoom: noop,
  addTodo: noop,
  removeTodo: noop,
})

export const useTodoContext = () => {
  return useContext(TodoContext)
}

type Room = {
  id: number
  name: string
}

export type Todo = {
  id: number
  label: string
  span: number
  lastDate: DateTime | null
}

export const useTodo = (): TodoType => {
  const [state, setState] = useState<State>(initState)

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
        setState((state) => ({ ...state, todoList: newList }))
      }
    })()
  }, [])

  const addRoom = () => {
    setState((state) => ({ ...state, roomList: [] }))
  }

  const removeRoom = () => {
    setState((state) => ({ ...state, roomList: [] }))
  }

  const addTodo = (validatedInput: Todo) => {
    const newList = [...state.todoList, validatedInput]
    storage.setData(STORAGE_KEY, {
      list: newList.map((l) => ({ ...l, lastDate: l.lastDate ? l.lastDate.toMillis() : null })),
    })
    setState((state) => ({ ...state, todoList: newList }))
    return true
  }

  const removeTodo = (id: number) => {
    const newTodoList = state.todoList.filter((todo) => todo.id !== id)
    setState((state) => ({ ...state, todoList: newTodoList }))
    storage.setData(STORAGE_KEY, {
      list: newTodoList.map((l) => ({ ...l, lastDate: l.lastDate ? l.lastDate.toMillis() : null })),
    })
  }

  return {
    roomList: state.roomList,
    addRoom,
    removeRoom,
    todoList: state.todoList,
    addTodo,
    removeTodo,
  }
}
