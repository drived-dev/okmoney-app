import { create } from "zustand";

interface EditingLoanState {
  id: string;
  setId: (id: string) => void;
}

const useEditingLoanStore = create<EditingLoanState>((set) => ({
  id: "",
  setId: (id: string) => {
    set({ id });
  },
}));

export default useEditingLoanStore;
