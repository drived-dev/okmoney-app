import { Loan, LoanStatus } from "~/types/Loan";

export function parseLoansDatas(loanDatas: any) {
  console.log(loanDatas);
  const buffer = loanDatas.map((loanData: Loan) => ({
    id: loanData.loan.id,
    loanNumber: loanData.loan.loanNumber,
    nickname: loanData.debtor.firstName,
    firstName: loanData.debtor.firstName,
    lastName: loanData.debtor.lastName,
    status: LoanStatus[loanData.loan.loanStatus],
    outstanding: loanData.loan.remainingBalance,
    total: loanData.loan.totalBalance,
    dueDate: loanData.loan.dueDate,
    profileImage: "e",
    tags: loanData.loan.tags,
    notes: loanData.debtor.memoNote,
    principal: loanData.loan.principal,
    interestRate: loanData.loan.interestRate,
    paymentPerInstallment: loanData.loan.totalBalance / loanData.loan.totalLoanTerm,
    installmentCount: loanData.loan.totalLoanTerm,
    remainingBalance: loanData.loan.remainingBalance,
    currentInstallment: Math.ceil((loanData.loan.totalBalance - loanData.loan.remainingBalance) / (loanData.loan.totalBalance / loanData.loan.totalLoanTerm)),
    loanDate: new Date(loanData.loan.dueDate).toLocaleDateString(),
    paymentType: loanData.loan.loanTermType === 0 ? "รายเดือน" : loanData.loan.loanTermType === 1 ? "รายสัปดาห์" : "รายวัน"
  }));

  console.log("buffer");
  console.log(buffer);
  return buffer;
}
