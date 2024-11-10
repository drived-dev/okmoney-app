import api from "~/lib/axios";

export const getUser = async (userId: string) => {
  try {
    const response = await api.get(`/creditor/${userId}`);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Error creating user:", error);
    return { status: 500, data: error };
  }
};
