import api from "~/lib/axios";

export async function getLoanAll() {
  try {
    const response = await api.get("/debtor/mydebtors");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching debtors:", error);

    // Enhance error with more context
    const enhancedError = new Error(error.message || "Failed to fetch debtors");
    enhancedError.response = error.response;
    enhancedError.code = error.code;

    throw enhancedError;
  }
}
