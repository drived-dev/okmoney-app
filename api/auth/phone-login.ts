import api from "~/lib/axios";
import { AxiosError } from "axios";

// Helper function to extract error message from response
const extractErrorMessage = (error: AxiosError): string => {
  const responseData = error.response?.data;

  // If response is a string (HTML or plain text)
  if (typeof responseData === "string") {
    // Check if it's HTML
    if (responseData.includes("<html") || responseData.includes("<!DOCTYPE")) {
      // Extract title from HTML if possible
      const titleMatch = responseData.match(/<title>(.*?)<\/title>/i);
      if (titleMatch) {
        return titleMatch[1].trim();
      }
      // Return generic message for HTML errors
      return "Server error occurred";
    }
    // Return plain text error
    return responseData;
  }

  // If response is an object with message
  if (responseData && typeof responseData === "object") {
    if ("message" in responseData && typeof responseData.message === "string") {
      return responseData.message;
    }
    if ("error" in responseData && typeof responseData.error === "string") {
      return responseData.error;
    }
  }

  // Fallback to axios error message
  return error.message || "An error occurred";
};

export const sendOtp = async (phoneNumber: string) => {
  try {
    const response = await api.post(`/auth/phone/register`, { phoneNumber });
    return { status: response.status, data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status || 500;
    const errorMessage = extractErrorMessage(axiosError);

    console.error("Error phone login:", {
      status,
      message: axiosError.message,
      errorMessage,
      hasHtmlResponse:
        typeof axiosError.response?.data === "string" &&
        axiosError.response.data.includes("<html"),
    });

    return {
      status,
      data: {
        message: errorMessage,
        status,
      },
    };
  }
};

export const verifyOtp = async (phoneNumber: string, password: string) => {
  try {
    const response = await api.post(`/auth/phone/login`, {
      phoneNumber: phoneNumber,
      password: password,
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status || 500;
    const errorMessage = extractErrorMessage(axiosError);

    console.error("Error verify otp:", {
      status,
      message: axiosError.message,
      errorMessage,
      hasHtmlResponse:
        typeof axiosError.response?.data === "string" &&
        axiosError.response.data.includes("<html"),
    });

    return {
      status,
      data: {
        message: errorMessage,
        status,
      },
    };
  }
};
