import api from "~/lib/axios";

export async function createDebtorCSV(data: any) {
  try {
    const response = await api.post("/debtor/bulk", data);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    console.error("Error fetching debtors:", error);
    throw error;
  }
}
