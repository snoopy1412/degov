export const VOTE_CONFIG = {
  colors: {
    for: "bg-success",
    against: "bg-danger",
    abstain: "bg-muted-foreground",
  },
  icons: {
    for: "/assets/image/proposal/vote-for.svg",
    against: "/assets/image/proposal/vote-against.svg",
    abstain: "/assets/image/proposal/vote-abstain.svg",
  },
};

export enum VoteType {
  For = 1,
  Against = 0,
  Abstain = 2,
}

export const voteTypeLabel = [
  {
    label: "For",
    value: VoteType.For,
  },
  {
    label: "Against",
    value: VoteType.Against,
  },
  {
    label: "Abstain",
    value: VoteType.Abstain,
  },
];

export const VoteConfig = {
  [VoteType.For]: {
    bgColor: "bg-success",
    textColor: "text-success",
    icon: "/assets/image/proposal/vote-for.svg",
  },
  [VoteType.Against]: {
    bgColor: "bg-danger",
    textColor: "text-danger",
    icon: "/assets/image/proposal/vote-against.svg",
  },
  [VoteType.Abstain]: {
    bgColor: "bg-muted-foreground",
    textColor: "text-muted-foreground",
    icon: "/assets/image/proposal/vote-abstain.svg",
  },
};
