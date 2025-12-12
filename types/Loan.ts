import { Debtor } from "./debtor";

export interface Loan extends Debtor {
  id: string;
  phoneNumber: string;
  loanNumber?: string;
  principal: number;
  loanStatus: LoanStatus;
  remainingBalance: number;
  totalBalance: number;
  totalLoanTerm: number;
  loanTermType: LoanTermType;
  loanTermInterval: number;
  interestType: InterestType;
  interestRate: number;
  dueDate: number;
  tags: string[];
  debtorId: string;
  creditorId: string;
  guarantorId?: string;
  // Extended properties from parseLoanData
  status?: string; // String representation of loanStatus
  total?: number; // Alias for totalBalance
  profileImage?: string;
  notes?: string;
  paymentPerInstallment?: number;
  installmentCount?: number;
  currentInstallment?: number;
  loanDate?: string;
  paymentType?: string;
}

export enum LoanStatus {
  OVERDUE = "OVERDUE", // ค้างชำระ
  UNDERDUE = "UNDERDUE", // ใกล้กำหนดชำระ
  DUE = "DUE", // รอชำระ
  CLOSED = "CLOSED",
}

export enum InterestType {
  FIXED = "FIXED",
  VARIABLE = "VARIABLE",
}

export enum LoanTermType {
  MONTHLY = "MONTHLY",
  WEEKLY = "WEEKLY",
  DAILY = "DAILY",
}
