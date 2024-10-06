import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { zustandStorage } from './storage';

interface TagState {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

const useTagStore = create(
  persist<TagState>(
    (set, get) => ({
    tags: ["favorite", "เพื่อน"],
    addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
    removeTag: (tag) => set((state) => ({ tags: state.tags.filter((t) => t !== tag) })),
    }),
    {
      name: 'tag-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => zustandStorage)
      // storage: createJSONStorage(() => zustandStorage), // (optional) by default, 'localStorage' is used
    },
));

export default useTagStore;