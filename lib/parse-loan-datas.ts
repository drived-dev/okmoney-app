import { Loan, LoanStatus } from "~/types/Loan";

export function parseLoanData(loanData: any): Loan {
  return {
    id: loanData.loan.id,
    loanNumber: loanData.loan.loanNumber,
    nickname: loanData.debtor.nickname,
    firstName: loanData.debtor.firstName,
    lastName: loanData.debtor.lastName,
    phoneNumber: loanData.debtor.phoneNumber,
    status: LoanStatus[loanData.loan.loanStatus],
    total: loanData.loan.totalBalance,
    dueDate: loanData.loan.dueDate,
    profileImage: "e",
    tags: loanData.loan.tags,
    notes: loanData.debtor.memoNote,
    principal: loanData.loan.principal,
    debtorId: loanData.loan.debtorId,
    interestRate: loanData.loan.interestRate,
    paymentPerInstallment: loanData.loan.totalBalance / loanData.loan.totalLoanTerm,
    installmentCount: loanData.loan.totalLoanTerm,
    remainingBalance: loanData.loan.remainingBalance,
    currentInstallment: Number(
      ((loanData.loan.totalBalance - loanData.loan.remainingBalance) /
        (loanData.loan.totalBalance / loanData.loan.totalLoanTerm)).toFixed(1)
    ),
    loanDate: new Date(loanData.loan.dueDate).toLocaleDateString(),
    paymentType:
      loanData.loan.loanTermType === 0
        ? "รายเดือน"
        : loanData.loan.loanTermType === 1
        ? "รายสัปดาห์"
        : "รายวัน",
  }
}
export function parseLoansDatas(loanDatas: any) {
  const buffer = loanDatas.map((loanData: any) => parseLoanData(loanData));
  return buffer;
}
