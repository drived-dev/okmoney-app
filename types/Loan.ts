export interface Loan {
  id: string;
  status: string;
  outstanding: number;
  total: number;
  name: string;
  dueDate: string;
  nickname?: string;
  profileImage: string;
  totalLoanTerm: number;
}
