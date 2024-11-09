import api from '~/lib/axios';

export async function addMemo(formData: FormData) {
  try {
    const response = await api.post('/payment/create', {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
    return response.data;
  } catch (error) {
    console.error("Error create payment memo:", error);
    throw error;
  }
}
