// TODO: setup MMKV-storage
// import { StateStorage } from 'zustand/middleware'
// import { MMKV } from 'react-native-mmkv'

import AsyncStorage from "@react-native-async-storage/async-storage";

// const storage = new MMKV()

// export const zustandStorage: StateStorage = {
//   setItem: (name, value) => {
//     return storage.set(name, value)
//   },
//   getItem: (name) => {
//     const value = storage.getString(name)
//     return value ?? null
//   },
//   removeItem: (name) => {
//     return storage.delete(name)
//   },
// }

export const zustandStorage = AsyncStorage