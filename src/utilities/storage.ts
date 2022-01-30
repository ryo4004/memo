import { Storage } from '@capacitor/storage'

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
