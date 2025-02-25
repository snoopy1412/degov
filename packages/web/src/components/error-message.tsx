import Image from "next/image";

import { cn } from "@/lib/utils";
export const ErrorMessage = ({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) => {
  return (
    <span className={cn("flex items-center gap-[5px]", className)} role="alert">
      <Image
        src="/assets/image/error-message.svg"
        alt="Error"
        width={16}
        height={16}
        priority
      />
      <span className="text-[12px] text-foreground">{message}</span>
    </span>
  );
};
