import { create } from "zustand";

// Create a Zustand store for managing tag and status values
const useFilterStore = create((set) => ({
  tagvalue: [],
  statusvalue: [],

  // Add a tag or status value
  addValue: (type, value) => {
    if (type === "tag") {
      set((state) => ({
        tagvalue: [...new Set([...state.tagvalue, ...value])], // Prevent duplicates
      }));
    } else if (type === "status") {
      set((state) => ({
        statusvalue: [...new Set([...state.statusvalue, ...value])], // Prevent duplicates
      }));
    }
  },

  // Delete a tag or status value
  deleteValue: (type, value) => {
    if (type === "tag") {
      set((state) => ({
        tagvalue: state.tagvalue.filter((item) => item !== value),
      }));
    } else if (type === "status") {
      set((state) => ({
        statusvalue: state.statusvalue.filter((item) => item !== value),
      }));
    }
  },

  // Clear all tag or status values
  clearValues: (type) => {
    if (type === "tag") {
      set({ tagvalue: [] });
    } else if (type === "status") {
      set({ statusvalue: [] });
    }
  },
}));

export default useFilterStore;
