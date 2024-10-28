import useGlobalStore from "@/zustand/globalStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showNotification = (type, message, wait = 2, callback = null) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "fetch":
      break;
    default:
      toast.info(message);
  }
};

export const startLoadingNotification = (loadingMessage = "Yükleniyor..") => {
  const setLoading = useGlobalStore.getState().setIsLoading;
  setLoading(true);
  return toast.loading(loadingMessage);
};

export const endLoadingNotification = (ref, type = "success", message) => {
  const setLoading = useGlobalStore.getState().setIsLoading;
  setLoading(false);
  toast.update(ref, {
    render: message,
    type: type,
    isLoading: false,
    autoClose: 2000,
    pauseOnHover: type == "error",
  });
};
