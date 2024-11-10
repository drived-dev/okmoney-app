import api from '~/lib/axios';

export async function getDashboardDebtors() {
  try {
    const response = await api.get('/dashboard/debtors');
    return response.data;
  } catch (error) {
    console.error("Error fetching debtors:", error);
    throw error;
  }
}
