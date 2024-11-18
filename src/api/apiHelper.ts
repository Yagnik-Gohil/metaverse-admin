import { toast } from "react-hot-toast";

const apiHelper = async (
  request: Promise<any> // The actual API call (axios promise)
) => {
  try {
    const response = await request;

    const successMessage = response?.data?.message || "Request was successful!";
    toast.success(successMessage);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || "An unexpected error occurred!";
    toast.error(errorMessage);
    return error?.response?.data;
  }
};

export default apiHelper;
