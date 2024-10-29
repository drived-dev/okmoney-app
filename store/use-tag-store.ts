import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "./storage";

interface TagState {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  clearTags: () => void; // New clear function
}

const useTagStore = create(
  persist<TagState>(
    (set, get) => ({
      tags: [],
      addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
      removeTag: (tag) =>
        set((state) => ({ tags: state.tags.filter((t) => t !== tag) })),
      clearTags: () => set({ tags: [] }), // Clear all tags
    }),
    {
      name: "tag-storage", // Name of the storage item
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useTagStore;
