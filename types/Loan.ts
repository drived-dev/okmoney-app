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
}

export enum LoanStatus {
  ค้างชำระ = 0,
  ใกล้กำหนด = 1,
  รอชำระ = 2,
  ครบชำระ = 3,
}