import api from '~/lib/axios';

export async function getDashboardMonth() {
  try {
    const response = await api.get('/dashboard/loan/month');
    return response.data;
  } catch (error) {
    console.error("Error fetching debtors:", error);
    throw error;
  }
}
