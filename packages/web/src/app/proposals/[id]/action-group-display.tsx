import { Button } from "@/components/ui/button";
import { ProposalState } from "@/types/proposal";

interface ActionGroupDisplayProps {
  status?: ProposalState;
  isLoading: boolean;
  isConnected: boolean;
  hasVoted?: boolean;
  canExecute: boolean;
  onClick: (action: "vote" | "queue" | "execute") => void;
}
export const ActionGroupDisplay = ({
  status,
  isLoading,
  onClick,
  isConnected,
  hasVoted,
  canExecute,
}: ActionGroupDisplayProps) => {
  if (status === ProposalState.Pending) {
    return <p>Voting starts soon</p>;
  }
  if (status === ProposalState.Active) {
    if (isConnected) {
      if (hasVoted) {
        return <p>You voted</p>;
      }
      return (
        <Button
          className="h-[37px] rounded-[100px] focus-visible:ring-0"
          onClick={() => onClick("vote")}
          isLoading={isLoading}
        >
          Vote Onchain
        </Button>
      );
    }
    return null;
  }
  if (status === ProposalState.Succeeded) {
    return (
      isConnected && (
        <Button
          className="h-[37px] rounded-[100px] focus-visible:ring-0"
          isLoading={isLoading}
          onClick={() => onClick("queue")}
        >
          Queue
        </Button>
      )
    );
  }
  if (status === ProposalState.Queued) {
    return (
      <Button
        className="h-[37px] rounded-[100px] focus-visible:ring-0"
        isLoading={isLoading}
        disabled={!canExecute}
        onClick={() => onClick("execute")}
      >
        Execute
      </Button>
    );
  }
  if (status === ProposalState.Executed) {
    return <p>Proposal executed</p>;
  }
  if (status === ProposalState.Canceled) {
    return <p>Proposal canceled</p>;
  }
  if (status === ProposalState.Expired) {
    return <p>Proposal expired</p>;
  }
  if (status === ProposalState.Defeated) {
    return <p>Proposal defeated</p>;
  }

  return null;
};
