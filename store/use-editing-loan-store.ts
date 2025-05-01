import { create } from "zustand";

interface EditingLoanState {
  id: string;
  status: string;
}

const useEditingLoanStore = create<EditingLoanState>((set) => ({
  id: "",
  status: "",
  setId: (id: string) => {
    set({ id });
  },
  setStatus: (status: string) => {
    set({ status });
  },
}));

export default useEditingLoanStore;
