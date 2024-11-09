export type PaymentHistory = {
  id: string;
  loanId: string;
  creditorId: string;
  debtorId: string;
  amount: number;
  paymentDate?: number;
  paymentType: PaymentType;
  imageUrl?: string;
  createdAt?: number;
  updatedAt?: number;
  // TODO: Add debtor image
};

export enum PaymentType {
  EXISTING = 0,
  CASH = 1,
  TRANSFER = 2,
}

