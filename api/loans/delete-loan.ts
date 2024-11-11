import api from '~/lib/axios';

export async function deleteLoan(loanId: string) {
  try {
    const response = await api.delete(`/debtor/${loanId}`);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Error deleting loan:", error);
    return { status: 500, data: error };
  }
}

