import api from "~/lib/axios";

export const sendOtp = async(phoneNumber: string) => {
  try {
    const response = await api.post(`/auth/phone/register`, { phoneNumber });
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Error phone login:", error);
    return { status: 500, data: error };
  }
};


export const verifyOtp = async(phoneNumber: string, password: string) => {
  try {
    const response = await api.post(`/auth/phone/login`, {
      phoneNumber: phoneNumber,
      password: password,
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Error verify otp:", error);
    return { status: 500, data: error };
  }
};
