import api from "~/lib/axios";

export async function addGuarantorToLoan(data: any) {
  try {
    const response = await api.post(
      "/guarantor/loan/4Ig9rJ7PkPvV5mB9cstn",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching debtors:", error);
    throw error;
  }
}
