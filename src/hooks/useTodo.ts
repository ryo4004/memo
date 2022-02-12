import { useState, useEffect, useContext, createContext } from 'react'
import { DateTime } from 'luxon'

import { noop } from '../utilities/noop'
import * as storage from '../utilities/storage'

const STORAGE_KEY = 'todolist'

export type Room = {
  id: number
  name: string
  lastDate: DateTime | null
}

export type Todo = {
  id: number
  label: string
  span: number
  lastDate: DateTime | null
}

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

type StringDate = { lastDate: string }

export type StorageType<T> = Omit<T, 'lastDate'> & StringDate

type StorageData = {
  roomList: Array<StorageType<Room>>
  todoList: Array<StorageType<Todo>>
}

export const useTodo = (): TodoType => {
  const [state, setState] = useState<State>(initState)

  useEffect(() => {
    // eslint-disable-next-line
    ;(async () => {
      const storageData = await storage.getObject<StorageData>(STORAGE_KEY)
      if (storageData) {
        const newState = {
          roomList: storage.timeConvertToDateTime<StorageType<Room>>(storageData.roomList),
          todoList: storage.timeConvertToDateTime<StorageType<Todo>>(storageData.todoList),
        }
        setState((state) => ({ ...state, ...newState }))
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
    const newState = {
      ...state,
      todoList: [...state.todoList, validatedInput],
    }
    setState((state) => ({ ...state, ...newState }))
    storage.setObjectWithArray(STORAGE_KEY, newState)
    return true
  }

  const removeTodo = (id: number) => {
    const newState = {
      ...state,
      todoList: state.todoList.filter((todo) => todo.id !== id),
    }
    setState((state) => ({ ...state, ...newState }))
    storage.setObjectWithArray(STORAGE_KEY, newState)
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
