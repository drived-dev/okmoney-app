import api from '~/lib/axios';

export async function createLoan(data: any) {
  try {
    const response = await api.post("/debtor", data);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Error fetching debtors:", error);
    console.error(error.response.data);
    return { status: 500, data: error };
  }
}
