import api from '~/lib/axios';

export async function getPaymentHistory() {
  try {
    const response = await api.get('/payment/history');
    return response.data;
  } catch (error) {
    console.error('Error fetching payment history:', error);
    throw error;
  }
}

export async function getPaymentHistoryByDebtorId(debtorId: string) {
  try {
    const response = await api.get(`/payment/history/debtor/${debtorId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching payment history:', error);
    throw error;
  }
}
