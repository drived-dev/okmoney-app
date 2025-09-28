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
}

export enum LoanStatus {
  OVERDUE = 'OVERDUE', // ค้างชำระ
  UNDERDUE = 'UNDERDUE', // ใกล้กำหนดชำระ
  DUE = 'DUE', // รอชำระ
  CLOSED = 'CLOSED',
}

export enum InterestType {
  FIXED = 'FIXED',
  VARIABLE = 'VARIABLE',
}

export enum LoanTermType {
  MONTHLY = 'MONTHLY',
  WEEKLY = 'WEEKLY',
  DAILY = 'DAILY',
}