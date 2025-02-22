import { useWaitForTransactionReceipt } from "wagmi";
import { TransactionStatus } from "./transaction-status";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";

interface TransactionToastProps {
  hash: `0x${string}`;
}

export function TransactionToast({ hash }: TransactionToastProps) {
  const toastIdRef = useRef<string | number>(0);

  const {
    isLoading: isPending,
    isSuccess,
    isError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isPending && !toastIdRef.current) {
      toastIdRef.current = toast.loading(
        <TransactionStatus status="pending" transactionHash={hash} />,
        {
          position: "top-right",
          autoClose: false,
          closeButton: false,
        }
      );
    }

    if (isSuccess && toastIdRef.current) {
      if (toast.isActive(toastIdRef.current)) {
        toast.update(toastIdRef.current, {
          render: <TransactionStatus status="success" transactionHash={hash} />,
          type: "success",
          isLoading: false,
          autoClose: 5000,
          closeButton: true,
        });
      }
    }

    if (isError && toastIdRef.current) {
      if (toast.isActive(toastIdRef.current)) {
        toast.update(toastIdRef.current, {
          render: <TransactionStatus status="failed" transactionHash={hash} />,
          type: "error",
          isLoading: false,
          autoClose: 5000,
          closeButton: true,
        });
      }
    }

    return () => {
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }
    };
  }, [hash, isPending, isSuccess, isError]);

  return null;
}
