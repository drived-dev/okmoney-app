import { LoanStatus } from "~/types/Loan";

export function parseLoansDatas(loanDatas: any) {
  const buffer = loanDatas.map((loanData: any) => ({
    id: loanData.loan.loanNumber,
    nickname: loanData.debtor.firstName,
    name: `${loanData.debtor.firstName} ${loanData.debtor.lastName}`,
    status: LoanStatus[loanData.loan.loanStatus],
    outstanding: loanData.loan.remainingBalance,
    total: loanData.loan.totalBalance,
    dueDate: loanData.loan.dueDate,
    profileImage: "e",
    totalLoanTerm: loanData.loan.totalLoanTerm,
    tags: loanData.loan.tags,
    firstName: loanData.debtor.firstName,
    lastName: loanData.debtor.lastName,
    phoneNumber: loanData.debtor.phoneNumber,
    healthu: loanData.debtor.healthu,
    memoNote: loanData.debtor.memoNote,
    paypapay: loanData.debtor.paypapay,
  }));
  return buffer;
}
