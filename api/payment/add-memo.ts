import api from '~/lib/axios';

export async function addMemo(formData: FormData) {
  try {
    const response = await api.post("/payment/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Error create payment memo:", error);
    return { status: 500, data: error };
  }
}
