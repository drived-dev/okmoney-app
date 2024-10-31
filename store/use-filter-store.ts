import { create } from "zustand";

interface TagState {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  clearTags: () => void; // Clear function
}

const useFilterStore = create<TagState>((set) => ({
  tags: [],
  addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
  removeTag: (tag) =>
    set((state) => ({ tags: state.tags.filter((t) => t !== tag) })),
  clearTags: () => set({ tags: [] }), // Clear all tags
}));

export default useFilterStore;
