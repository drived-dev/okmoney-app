import AsyncStorage from '@react-native-async-storage/async-storage';
import { zustandStorage } from './storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

const useTagStore = create(
  persist(
    (set, get) => ({
    tags: ["favorite", "เพื่อน"],
    addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
    removeTag: (tag) => set((state) => ({ tags: state.tags.filter((t) => t !== tag) })),
    }),
    {
      name: 'tag-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage)
      // storage: createJSONStorage(() => zustandStorage), // (optional) by default, 'localStorage' is used
    },
));

export default useTagStore;