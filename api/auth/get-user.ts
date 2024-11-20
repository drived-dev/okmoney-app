import api from "~/lib/axios";

export const getUser = async() => {
  try {
    const response = await api.get(`/creditor`);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Error creating user:", error);
    return { status: 500, data: error };
  }
};
