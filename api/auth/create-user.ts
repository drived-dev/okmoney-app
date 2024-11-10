import api from "~/lib/axios";

export const createUser = async (data: any) => {
  try {
    const response = await api.post("/creditor", data);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Error creating user:", error);
    return { status: 500, data: error };
  }
};
