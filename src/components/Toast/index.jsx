import toast, { Toaster } from "react-hot-toast";

const toastId = toast.loading("Loading...");
export const loadingToast = (msg) => toast.loading(msg, { id: toastId });
export const loadingToErrorToast = (msg) => toast.error(msg, { id: toastId });
export const loadingToSuccess = (msg) => toast.success(msg, { id: toastId });
export const loadingDimiss = () => toast.dismiss(toastId);
const Toast = () => {
  return <Toaster />;
};

export default Toast;
