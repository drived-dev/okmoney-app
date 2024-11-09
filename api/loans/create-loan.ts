import api from '~/lib/axios';

export async function createLoan(data: any) {
  try {
    const response = await api.post('/debtor', data);
    return response.data;
  } catch (error) {
    console.error("Error fetching debtors:", error);
    throw error;
  }
}
