import { ReactText, useRef } from "react";
import { toast } from "react-toastify";

import useLoading from "@/hooks/useLoading";

export default function useToast() {
  const { updateLoadingState } = useLoading();
  function isLoading(): ReactText {
    updateLoadingState();
    const toastId = toast.loading("Processing...", {
      position: "top-left",
    });
    return toastId;
  }

  function isSuccessful(toastId: any, message: string) {
    updateLoadingState();
    toast.update(toastId, {
      render: message,
      type: "success",
      isLoading: false,
      position: "top-left",
      closeButton: true,
      autoClose: 5000,
    });
  }

  function hasError(toastId: any, message: string) {
    updateLoadingState();
    toast.update(toastId, {
      render: message,
      type: "error",
      isLoading: false,
      position: "top-left",
      closeButton: true,
      autoClose: 5000,
    });
  }

  const toastId: any = useRef(null);

  const loadToast = () => {
    toastId.current = toast.loading("Processing ...", {
      position: "top-left",
    });
  };

  const successToast = (text: string) =>
    toast.update(toastId.current, {
      render: text,
      type: "success",
      isLoading: false,
      position: "top-left",
      closeButton: true,
      autoClose: 5000,
    });

  const errorToast = (text: string) =>
    toast.update(toastId.current, {
      render: text,
      type: "error",
      isLoading: false,
      position: "top-left",
      closeButton: true,
      autoClose: 5000,
    });

  return {
    isLoading,
    isSuccessful,
    hasError,
    loadToast,
    successToast,
    errorToast,
  };
}
