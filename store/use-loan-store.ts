import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "./storage";
import { Loan, LoanStatus } from "~/types/Loan";


interface LoanStore {
  loans: Loan[];
  setLoans: (loans: Loan[]) => void;
  addLoan: (loan: Loan) => void;
  removeLoan: (loan: Loan) => void;
  getLoanById: (id: string) => Loan | undefined;
}

const useLoanStore = create(
  persist<LoanStore>(
    (set, get) => ({
      loans: [],
      setLoans: (loans) => set({ loans }),
      addLoan: (loan) => set((state) => ({ loans: [...state.loans, loan] })),
      removeLoan: (loan) =>
        set((state) => ({ loans: state.loans.filter((t) => t !== loan) })),
      getLoanById: (id) => get().loans.find((loan) => loan.id === id),
    }),
    {
      name: "loan-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => zustandStorage),
      // storage: createJSONStorage(() => zustandStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useLoanStore;
