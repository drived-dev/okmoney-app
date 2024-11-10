import api from "~/lib/axios";

export async function addGuarantorToLoan(loanId: string, data: any) {
  try {
    const response = await api.post(`/guarantor/loan/${loanId}`, data);
    return { status: response.status, response: response.data };
  } catch (error) {
    console.error("Error fetching debtors:", error);
    console.log(error.response.data);
    throw { status: 500, response: error };
  }
}
