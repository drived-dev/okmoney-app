// TODO: loan schema from backend
export interface Loan {
  id: string;
  nickname: string;
  name: string;
  status: LoanStatus;
  outstanding: number;
  total: number;
  dueDate: string;
  profileImage: string;
  totalLoanTerm: number;
  tags?: string[];
  firstName: string;
  lastName: string;
  phoneNumber: string;
  healthu: string;
  memoNote: string;
  loanNumber: string;
  principal: number;
  remainingBalance: number;
  loanTermType: number;
  loanTermInterval: number;
  interestType: number;
  interestRate: number;
  creditorId: string;
  paidAmount: number;
}

export enum LoanStatus {
  ค้างชำระ = 0,
  ใกล้กำหนด = 1,
  รอชำระ = 2,
  ครบชำระ = 3,
}