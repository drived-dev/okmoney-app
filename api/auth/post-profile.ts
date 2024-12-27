import api from "~/lib/axios";

export const postProfile = async (formData: FormData) => {
  try {
    const response = await api.post("/creditor/profileimage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Error patching profile:", error);
    return { status: 500, data: error };
  }
};
