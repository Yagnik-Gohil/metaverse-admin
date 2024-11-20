import { toast } from "react-hot-toast";

const apiHelper = async (
  request: Promise<any>, // The actual API call (axios promise)
  showAlert: boolean = false
) => {
  try {
    const response = await request;

    const successMessage = response?.data?.message || "Request was successful!";
    if (showAlert) {
      toast.success(successMessage);
    }
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || "An unexpected error occurred!";
    toast.error(errorMessage);
    return error?.response?.data;
  }
};

export default apiHelper;
