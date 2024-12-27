import api from '~/lib/axios';

export async function patchLoan(loanId: string, data: any) {
  try {
    const response = await api.patch(`/debtor/${loanId}`, data);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Error posting debtors:", error);
    console.error(error.response.data);
    return { status: 500, data: error };
  }
}
