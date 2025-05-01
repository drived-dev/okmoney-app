import { create } from "zustand";

interface EditingLoanState {
  id: string;
}

const useEditingLoanStore = create<EditingLoanState>((set) => ({
  id: "",
  status: "",
  setId: (id: string) => {
    set({ id });
  },
}));

export default useEditingLoanStore;
