import { Debtor } from "./debtor";

export interface Loan extends Debtor {
  id: string;
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
}

export enum LoanTermType {
  MONTHLY = 0,
  WEEKLY = 1,
  DAILY = 2,
}

export enum InterestType {
  FIXED = 0,
  VARIABLE = 1,
}

export enum LoanStatus {
  ค้างชำระ = 0,
  ใกล้กำหนด = 1,
  รอชำระ = 2,
  ครบชำระ = 3,
}