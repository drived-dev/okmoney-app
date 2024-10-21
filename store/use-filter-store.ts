import { create } from "zustand";

// Define the interface for the Filter Store state and actions
interface FilterStore {
  tagvalue: string[]; // Array of selected tags
  statusvalue: string[]; // Array of selected status values

  // Action to add a tag or status value
  addValue: (type: "tag" | "status", value: string[]) => void;

  // Action to delete a tag or status value
  deleteValue: (type: "tag" | "status", value: string) => void;

  // Action to clear all tag or status values
  clearValues: (type: "tag" | "status") => void;
}

// Create a Zustand store for managing tag and status values with proper types
const useFilterStore = create<FilterStore>((set) => ({
  tagvalue: [], // Initial tag values are an empty array
  statusvalue: [], // Initial status values are an empty array

  // Add a tag or status value to the store
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

  // Delete a tag or status value from the store
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

  // Clear all tag or status values from the store
  clearValues: (type) => {
    if (type === "tag") {
      set({ tagvalue: [] });
    } else if (type === "status") {
      set({ statusvalue: [] });
    }
  },
}));

export default useFilterStore;
