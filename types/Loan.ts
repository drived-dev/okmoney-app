export interface Loan {
  id: string;
  nickname: string;
  name: string;
  status: string;
  outstanding: number;
  total: number;
  dueDate: string;
  profileImage: string;
  tags?: string[];
}
