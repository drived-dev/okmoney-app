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
  hasLoaded: boolean; // Track if data has been loaded at least once
  fetchLoans: () => Promise<void>;
  setLoans: (loans: Loan[]) => void;
  addLoan: (loan: Loan) => void;
  removeLoan: (id: string) => void;
  getLoanById: (id: string) => Loan | undefined;
  getLoanByDebtorId: (debtorId: string) => Loan | undefined;
  updateLoan: (loan: Loan) => Promise<boolean>;
  refreshLoans: () => Promise<void>;
  clearError: () => void;
}

const useLoanStore = create(
  persist<LoanStore>(
    (set, get) => ({
      loans: [],
      isLoading: false,
      error: null,
      hasLoaded: false,
      fetchLoans: async () => {
        // Prevent multiple simultaneous requests
        if (get().isLoading) {
          console.log("Already loading loans, skipping duplicate request");
          return;
        }

        set({ isLoading: true, error: null });
        try {
          console.log("Starting to fetch loans...");
          const loans = await getLoanAll();
          const parsedLoans = parseLoansDatas(loans);
          console.log("Successfully fetched loans:", parsedLoans.length);
          set({ loans: parsedLoans, error: null, hasLoaded: true });
        } catch (error: any) {
          console.error("Failed to fetch loans:", error);
          let errorMessage = "ไม่สามารถโหลดข้อมูลลูกหนี้ได้";

          if (error.response?.status === 401) {
            errorMessage = "เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่";
          } else if (error.response?.status === 403) {
            errorMessage = "ไม่มีสิทธิ์เข้าถึงข้อมูล";
          } else if (error.response?.status >= 500) {
            errorMessage = "เซิร์ฟเวอร์มีปัญหา กรุณาลองอีกครั้งภายหลัง";
          } else if (error.code === "NETWORK_ERROR" || !error.response) {
            errorMessage = "ไม่สามารถเชื่อมต่ออินเทอร์เน็ตได้";
          }

          set({ error: errorMessage, hasLoaded: true });
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
          set({ loans: parsedLoans, error: null, hasLoaded: true });
        } catch (error: any) {
          console.error("Failed to refresh loans:", error);
          let errorMessage = "ไม่สามารถรีเฟรชข้อมูลลูกหนี้ได้";

          if (error.response?.status === 401) {
            errorMessage = "เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่";
          } else if (error.response?.status === 403) {
            errorMessage = "ไม่มีสิทธิ์เข้าถึงข้อมูล";
          } else if (error.response?.status >= 500) {
            errorMessage = "เซิร์ฟเวอร์มีปัญหา กรุณาลองอีกครั้งภายหลัง";
          } else if (error.code === "NETWORK_ERROR" || !error.response) {
            errorMessage = "ไม่สามารถเชื่อมต่ออินเทอร์เน็ตได้";
          }

          set({ error: errorMessage });
        }
      },
      clearError: () => set({ error: null }),
    }),
    {
      name: "loan-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => zustandStorage),
      // storage: createJSONStorage(() => zustandStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useLoanStore;
