import api from "~/lib/axios";

export const deleteUser = async() => {
  try {
    const response = await api.delete(`/creditor`);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { status: 500, data: error };
  }
};
