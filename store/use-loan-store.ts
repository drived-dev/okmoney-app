import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "./storage";
import { Loan } from "~/types/Loan";

const demodata: Loan[] = [
  {
    id: "01",
    nickname: "บิบิ",
    name: "ธน สมพง",
    status: "รอชำระ",
    outstanding: 0,
    total: 500,
    dueDate: "30/5",
    profileImage:
      "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
  },
  {
    id: "02",
    nickname: "แบงค์",
    name: "ธนาการ",
    status: "ใกล้กำหนด",
    outstanding: 100,
    total: 500,
    dueDate: "30/5",
    profileImage:
      "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
  },
  {
    id: "03",
    nickname: "บิน",
    name: "ธุดง",
    status: "ครบชำระ",
    outstanding: 200,
    total: 500,
    dueDate: "30/5",
    profileImage:
      "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
  },
  {
    id: "04",
    nickname: "โบ๊ท",
    name: "ทองสิระ",
    status: "ค้างชำระ",
    outstanding: 300,
    total: 500,
    dueDate: "30/5",
    profileImage:
      "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
  },
  {
    id: "05",
    nickname: "โบ๊ท",
    name: "ทองสิระ",
    status: "ค้างชำระ",
    outstanding: 300,
    total: 500,
    dueDate: "30/5",
    profileImage:
      "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
  },
];

interface LoanStore {
  loans: Loan[];
  addLoan: (loan: Loan) => void;
  removeLoan: (loan: Loan) => void;
}

const useLoanStore = create(
  persist<LoanStore>(
    (set, get) => ({
      loans: demodata,
      addLoan: (loan) => set((state) => ({ loans: [...state.loans, loan] })),
      removeLoan: (loan) =>
        set((state) => ({ loans: state.loans.filter((t) => t !== loan) })),
    }),
    {
      name: "loan-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => zustandStorage),
      // storage: createJSONStorage(() => zustandStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useLoanStore;
