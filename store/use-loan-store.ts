import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "./storage";
import { Loan, LoanStatus } from "~/types/Loan";
import { getLoanAll } from "~/api/loans/get-loan-all";
import { parseLoansDatas } from "~/lib/parse-loan-datas";

interface LoanStore {
  loans: Loan[];
  isLoading: boolean;
  error: string | null;
  fetchLoans: () => Promise<void>;
  setLoans: (loans: Loan[]) => void;
  addLoan: (loan: Loan) => void;
  removeLoan: (id: string) => void;
  getLoanById: (id: string) => Loan | undefined;
  getLoanByDebtorId: (debtorId: string) => Loan | undefined;
  updateLoan: (loan: Loan) => Promise<boolean>;
  refreshLoans: () => Promise<void>;
}

const useLoanStore = create(
  persist<LoanStore>(
    (set, get) => ({
      loans: [],
      isLoading: false,
      error: null,
      fetchLoans: async () => {
        set({ isLoading: true, error: null });
        try {
          const loans = await getLoanAll();
          const parsedLoans = parseLoansDatas(loans);
          set({ loans: parsedLoans, error: null });
        } catch (error) {
          console.error('Failed to fetch loans:', error);
          set({ error: 'Failed to load loans' });
        } finally {
          set({ isLoading: false });
        }
      },
      setLoans: (loans) => set({ loans }),
      addLoan: (loan) => set((state) => ({ loans: [...state.loans, loan] })),
      removeLoan: (id: string) =>
        set((state) => ({ loans: state.loans.filter((t) => t.id !== id) })),
      getLoanById: (id) => get().loans.find((loan) => loan.id === id),
      getLoanByDebtorId: (debtorId) =>
        get().loans.find((loan) => loan.debtorId === debtorId),
      updateLoan: async (loan) => {
        set((state) => ({
          loans: state.loans.map((t) => (t.id === loan.id ? loan : t)),
        }));
        // After updating local state, refresh from server
        await get().refreshLoans();
        return true;
      },
      refreshLoans: async () => {
        try {
          const loans = await getLoanAll();
          const parsedLoans = parseLoansDatas(loans);
          set({ loans: parsedLoans });
        } catch (error) {
          console.error('Failed to refresh loans:', error);
        }
      },
    }),
    {
      name: "loan-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => zustandStorage),
      // storage: createJSONStorage(() => zustandStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useLoanStore;
