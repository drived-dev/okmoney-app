import api from '~/lib/axios';

interface PatchLoanData {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  phoneNumber: string;
  memoNote: string;
  address?: string;
  autoSendSms?: boolean;
  profileImage?: string;
}

export async function patchLoan(loanId: string, data: Partial<PatchLoanData>) {
  try {
    const response = await api.patch(`/debtor/${loanId}`, data);
    return { 
      status: response.status, 
      data: response.data,
      success: response.status >= 200 && response.status < 300
    };
  } catch (error: any) {
    console.error("Error updating debtor:", error);
    if (error.response) {
      console.error("Error response:", error.response.data);
      return { 
        status: error.response.status || 500, 
        data: error.response.data || error,
        success: false
      };
    }
    return { 
      status: 500, 
      data: error,
      success: false
    };
  }
}
