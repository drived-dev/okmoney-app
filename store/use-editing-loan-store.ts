import { create } from "zustand";

interface EditingLoanState {
  id: string;
  setId: (id: string) => void;
  removeId: () => void;
}

const useEditingLoanStore = create<EditingLoanState>((set) => ({
  id: "",
  setId: (id: string) => {
    set({ id });
  },
  removeId: () => {
    set({ id: "" });
  },
}));

export default useEditingLoanStore;
