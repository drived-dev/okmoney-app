import api from "~/lib/axios";

export const patchUser = async (data: any) => {
  try {
    const response = await api.patch("/creditor", data);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Error patching user:", error);
    return { status: 500, data: error };
  }
};
