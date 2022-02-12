import { Storage } from '@capacitor/storage'
import { DateTime } from 'luxon'

// 基本
export const setData = async (key: string, value: string) => {
  return await Storage.set({ key, value })
}

export const getData = async (key: string) => {
  const { value } = await Storage.get({ key })
  return value
}

export const removeData = async (key: string) => {
  return await Storage.remove({ key })
}

// オブジェクト
export const setObject = async (key: string, value: object) => {
  return await setData(key, JSON.stringify(value))
}

type ObjectWithArray = {
  [key: string]: Array<LastDate>
}

interface LastDate {
  lastDate: DateTime | null
}

interface LastDateString {
  lastDate: string
}
interface LastDateNumber {
  lastDate: number | null
}

export const setObjectWithArray = async (key: string, object: ObjectWithArray) => {
  return await setObject(key, convertObjectWithArray(object))
}

export const getObject = async <T>(key: string): Promise<T | null> => {
  const value = await getData(key)
  if (!value) {
    return null
  }
  const object: T = JSON.parse(value)
  return object
}

export const removeObject = async (key: string) => await removeData(key)

// リスト用関数
export const timeConvertToDateTime = <T extends LastDateString>(array: Array<T>): Array<T & LastDate> => {
  return array.map((value) => ({
    ...value,
    lastDate: value.lastDate ? DateTime.fromMillis(Number(value.lastDate)) : null,
  }))
}

export const timeConvertToMillis = <T extends LastDate>(array: Array<T>): Array<T & LastDateNumber> => {
  return array.map((value) => ({
    ...value,
    lastDate: value.lastDate ? value.lastDate.toMillis() : null,
  }))
}

export const convertObjectWithArray = (object: ObjectWithArray) => {
  const array = (Object.keys(object) as (keyof ObjectWithArray)[]).map((key) => {
    return [key, timeConvertToMillis(object[key])]
  })
  return Object.fromEntries(array)
}
