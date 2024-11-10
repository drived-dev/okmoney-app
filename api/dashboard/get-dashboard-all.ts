import api from '~/lib/axios';

export async function getDashboardAll() {
  try {
    const response = await api.get('/dashboard/loan');
    return response.data;
  } catch (error) {
    console.error("Error fetching debtors:", error);
    throw error;
  }
}
