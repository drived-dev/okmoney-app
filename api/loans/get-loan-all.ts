import api from '~/lib/axios';

export async function getLoanAll() {
  try {
    const response = await api.get('/debtor/mydebtors');
    return response.data;
  } catch (error) {
    console.error("Error fetching debtors:", error);
    throw error;
  }
}
