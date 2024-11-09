import api from '~/lib/axios';

export async function getDashboardLastYear() {
  try {
    const response = await api.get('/dashboard/loan/year');
    return response.data;
  } catch (error) {
    console.error("Error fetching debtors:", error);
    throw error;
  }
}
