import Image from "next/image";

import { PROPOSAL_ACTIONS, type ProposalActionType } from "@/config/proposals";
import { cn } from "@/lib/utils";
interface NewProposalActionProps {
  type: Omit<ProposalActionType, "add">;
  onSwitch?: (type: Omit<ProposalActionType, "add">) => void;
  active?: boolean;
  error?: boolean;
}

export const NewProposalAction = ({
  type,
  onSwitch,
  active,
  error,
}: NewProposalActionProps) => {
  if (type === "proposal") {
    return (
      <div
        className={cn(
          "relative flex cursor-pointer items-center gap-[10px] rounded-[14px] border border-border/20 bg-card px-[20px] py-[15px] transition-opacity hover:opacity-80",
          active && "border-border"
        )}
        onClick={() => onSwitch?.("proposal")}
      >
        <Image
          src={PROPOSAL_ACTIONS["proposal"]}
          alt="proposal"
          width={24}
          height={24}
        />
        <span className="text-[14px] font-normal text-foreground">
          Proposal
        </span>
        {error && (
          <span className="absolute right-[20px] top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full bg-danger"></span>
        )}
      </div>
    );
  }
  if (type === "transfer") {
    return (
      <div
        className={cn(
          "relative flex cursor-pointer items-center gap-[10px] rounded-[14px] border border-border/20 bg-card px-[20px] py-[15px] transition-opacity hover:opacity-80",
          active && "border-border"
        )}
        onClick={() => onSwitch?.("transfer")}
      >
        <Image
          src={PROPOSAL_ACTIONS["transfer"]}
          alt="transfer"
          width={24}
          height={24}
        />
        <span className="text-[14px] font-normal text-foreground">
          Transfer
        </span>
        {error && (
          <span className="absolute right-[20px] top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full bg-danger"></span>
        )}
      </div>
    );
  }
  if (type === "custom") {
    return (
      <div
        className={cn(
          "relative flex cursor-pointer items-center gap-[10px] rounded-[14px] border border-border/20 bg-card px-[20px] py-[15px] transition-opacity hover:opacity-80",
          active && "border-border"
        )}
        onClick={() => onSwitch?.("custom")}
      >
        <Image
          src={PROPOSAL_ACTIONS["custom"]}
          alt="custom"
          width={24}
          height={24}
        />
        <span className="text-[14px] font-normal text-foreground">Custom</span>
        {error && (
          <span className="absolute right-[20px] top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full bg-danger"></span>
        )}
      </div>
    );
  }
  if (type === "preview") {
    return (
      <div
        className={cn(
          "flex cursor-pointer items-center gap-[10px] rounded-[14px] border border-border/20 bg-card px-[20px] py-[15px] transition-opacity hover:opacity-80",
          active && "border-border"
        )}
        onClick={() => onSwitch?.("preview")}
      >
        <Image
          src={PROPOSAL_ACTIONS["preview"]}
          alt="preview"
          width={24}
          height={24}
        />
        <span className="text-[14px] font-normal text-foreground">Preview</span>
      </div>
    );
  }
  return null;
};
