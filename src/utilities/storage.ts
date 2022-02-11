import { Storage } from '@capacitor/storage'
import { DateTime } from 'luxon'

// 基本
export const setData = async (key: string, value: object) => {
  return await Storage.set({ key, value: JSON.stringify(value) })
}

export const getData = async (key: string) => {
  const { value } = await Storage.get({ key })
  return value
}

export const removeData = async (key: string) => {
  return await Storage.remove({ key })
}

// 配列
const timeConvertToDateTime = <T>(array: Array<T & { lastDate: string }>): Array<T & { lastDate: DateTime | null }> => {
  return array.map((value) => ({
    ...value,
    lastDate: value.lastDate ? DateTime.fromMillis(Number(value.lastDate)) : null,
  }))
}

const timeConvertToMillis = <T>(array: Array<T & { lastDate?: DateTime }>) => {
  return array.map((value) => ({
    ...value,
    lastDate: value.lastDate ? value.lastDate.toMillis() : null,
  }))
}

export const loadArray = async <T>(key: string): Promise<Array<T>> => {
  const storageData = await getData(key)
  if (!storageData) {
    return []
  }
  const parsedData: { list: Array<any> } = JSON.parse(storageData)
  const list = timeConvertToDateTime(parsedData.list)
  return list
}

export const saveArray = async <T>(key: string, array: Array<T>): Promise<void> => {
  await setData(key, timeConvertToMillis(array))
}

export const removeArray = async (key: string) => await removeData(key)
