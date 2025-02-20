import { ReactNode } from "react";
import Image from "next/image";
interface OverviewItemProps {
  title: string;
  icon: string;
  children: ReactNode;
}

export const OverviewItem = ({ title, icon, children }: OverviewItemProps) => {
  return (
    <div
      className="flex w-full items-center justify-between rounded-[14px] bg-card p-[20px]"
      style={{ aspectRatio: "342/105" }}
    >
      <div className="flex flex-col gap-[10px]">
        <p className="!m-0 text-[14px] text-card-foreground">{title}</p>
        <div className="!m-0 text-[28px] font-bold text-white">{children}</div>
      </div>
      <Image
        src={icon}
        alt={title}
        className="size-[60px]"
        width={60}
        height={60}
      />
    </div>
  );
};
