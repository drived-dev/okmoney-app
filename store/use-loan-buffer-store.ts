import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "./storage";
import { Loan } from "~/types/Loan";

interface LoanBufferStore {
  loanBuffers: any[];
  setLoanBuffers: (loans: any[]) => void;
  resetLoanBuffers: () => void;
  //   removeLoans: (loans: Loan[]) => void;
}

export const useLoanBufferStore = create<LoanBufferStore>((set, get) => ({
  loanBuffers: [],
  setLoanBuffers: (loans) => set({ loanBuffers: loans }),
  resetLoanBuffers: () => set({ loanBuffers: [] }),
  //   removeLoans: (loan) =>
  // set((state) => ({ loans: state.loans.filter((t) => t !== loan) })),
}));
