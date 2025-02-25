import Image from "next/image";

import { Separator } from "@/components/ui/separator";

export const CurrentVotes = () => {
  return (
    <div className="flex flex-col gap-[20px] rounded-[14px] bg-card p-[20px]">
      <h3 className="text-[18px] font-semibold">Current Votes</h3>
      <Separator className="!my-0 bg-border/20" />

      <div className="flex flex-col gap-[20px]">
        <div className="flex items-center justify-between gap-[10px]">
          <div className="flex items-center gap-[5px]">
            <Image
              src="/assets/image/proposal/error.svg"
              alt="error"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="text-[14px] font-normal">Quorum</span>
          </div>

          <span>167.8M of 201.55M</span>
        </div>

        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center justify-between gap-[10px]">
            <div className="flex items-center gap-[5px]">
              <Image
                src="/assets/image/proposal/check.svg"
                alt="check"
                width={20}
                height={20}
                className="rounded-full"
              />
              <span className="text-[14px] font-normal">Majority support</span>
            </div>

            <span>Yes</span>
          </div>

          <div className="relative h-[6px] w-full rounded-[2px] bg-danger">
            <div
              className="absolute left-0 top-0 h-full rounded-[2px] bg-success"
              style={{ width: "50%" }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-[10px]">
          <div className="flex items-center gap-[5px]">
            <span className="inline-block h-[16px] w-[16px] rounded-full bg-success" />
            <span className="text-[14px] font-normal">For</span>
          </div>

          <span>167.79M</span>
        </div>

        <div className="flex items-center justify-between gap-[10px]">
          <div className="flex items-center gap-[5px]">
            <span className="inline-block h-[16px] w-[16px] rounded-full bg-danger" />
            <span className="text-[14px] font-normal">Against</span>
          </div>

          <span>5.62K</span>
        </div>

        <div className="flex items-center justify-between gap-[10px]">
          <div className="flex items-center gap-[5px]">
            <span className="inline-block h-[16px] w-[16px] rounded-full bg-muted-foreground" />
            <span className="text-[14px] font-normal">Abstain</span>
          </div>

          <span>8.8K</span>
        </div>
      </div>
    </div>
  );
};
