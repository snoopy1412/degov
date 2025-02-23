"use client";
import Image from "next/image";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { markdownToHtml } from "@/utils/markdown";
import { NewProposalAction } from "./action";
import { ProposalPanel } from "./proposal-panel";
import { PreviewPanel } from "./preview-panel";
import { ReplacePanel } from "./replace-panel";
import { TransferPanel } from "./transfer-panel";
import { CustomPanel } from "./custom-panel";
import { WithConnect } from "@/components/with-connect";
import { useImmer } from "use-immer";
import {
  generateCustomAction,
  generateProposalAction,
  generateTransferAction,
  MOCK_ACTIONS,
} from "./helper";
import type { Action } from "./type";
import {
  proposalSchema,
  ProposalContent,
  TransferContent,
  CustomContent,
  customActionSchema,
  transferSchema,
} from "./schema";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useVotes } from "@/hooks/useVotes";

const DEFAULT_ACTIONS: Action[] = [generateProposalAction()];

const PublishButton = ({
  disabled,
  isLoading,
  onClick,
}: {
  disabled: boolean;
  isLoading: boolean;
  onClick?: (e: React.MouseEvent) => void;
}) => {
  return (
    <Button
      className="gap-[5px] rounded-[100px]"
      onClick={onClick}
      disabled={disabled}
      isLoading={isLoading}
    >
      <Image
        src="/assets/image/proposal/plus.svg"
        alt="plus"
        width={16}
        height={16}
      />
      <span>Publish</span>
    </Button>
  );
};

export default function NewProposal() {
  const panelRefs = useRef<Map<string, HTMLFormElement>>(new Map());

  const [actions, setActions] = useImmer<Action[]>(DEFAULT_ACTIONS);
  const [publishLoading, setPublishLoading] = useState(false);
  const [actionUuid, setActionUuid] = useState<string>(DEFAULT_ACTIONS[0].id);
  const [tab, setTab] = useState<"edit" | "add" | "preview">("edit");

  const result = useVotes();
  console.log("votes", result);

  const handleProposalContentChange = useCallback(
    (content: ProposalContent) => {
      setActions((draft) => {
        const action = draft.find((action) => action.id === actionUuid);
        if (action?.type === "proposal") {
          action.content = content;
        }
      });
    },
    [setActions, actionUuid]
  );

  const handleAddAction = useCallback(() => {
    setTab("add");
  }, []);

  const handleSwitchAction = useCallback(
    (id: string) => {
      setTab("edit");
      setActionUuid(id);
    },
    [setActionUuid]
  );

  const handleRemoveAction = useCallback(
    (index: number) => {
      setActions(actions.filter((_, i) => i !== index));
      setActionUuid(actions[index - 1].id);
    },
    [actions, setActions]
  );

  const handleReplaceAction = useCallback(
    (type: "transfer" | "custom") => {
      if (type === "transfer") {
        const transferAction = generateTransferAction();
        setActions([...actions, transferAction]);
        setActionUuid(transferAction.id);
      } else if (type === "custom") {
        const customAction = generateCustomAction();
        setActions([...actions, customAction]);
        setActionUuid(customAction.id);
      }
      setTab("edit");
    },
    [actions, setActions]
  );

  const handleTransferContentChange = useCallback(
    (content: TransferContent) => {
      setActions((draft) => {
        const action = draft.find((action) => action.id === actionUuid);
        if (action?.type === "transfer") {
          action.content = content;
        }
      });
    },
    [setActions, actionUuid]
  );

  const handleCustomContentChange = useCallback(
    (content: CustomContent) => {
      setActions((draft) => {
        const action = draft.find((action) => action.id === actionUuid);
        if (action?.type === "custom") {
          action.content = content;
        }
      });
    },
    [setActions, actionUuid]
  );

  const validationState = useMemo(() => {
    const state = new Map<string, boolean>();
    actions.forEach((action) => {
      if (action.type === "proposal") {
        const result = proposalSchema.safeParse({
          title: action.content?.title,
          markdown: action.content?.markdown,
        });
        state.set(action.id, result.success);
      } else if (action.type === "transfer") {
        const result = transferSchema.safeParse({
          recipient: action.content?.recipient,
          amount: action.content?.amount,
        });
        state.set(action.id, result.success);
      } else if (action.type === "custom") {
        const result = customActionSchema.safeParse({
          target: action.content?.target,
          contractType: action.content?.contractType,
          contractMethod: action.content?.contractMethod,
          calldata: action.content?.calldata,
          value: action.content?.value,
        });
        state.set(action.id, result.success);
      }
    });

    return state;
  }, [actions]);

  const handlePublish = useCallback(async () => {
    try {
      panelRefs.current.forEach((form) => {
        const result = form.requestSubmit();
        console.log("result", result);
      });

      setPublishLoading(true);
      const title =
        actions[0]?.type === "proposal"
          ? (actions[0]?.content as ProposalContent).title
          : "Untitled";
      const markdown =
        actions[0]?.type === "proposal"
          ? (actions[0]?.content as ProposalContent).markdown
          : "";
      const html = await markdownToHtml(markdown);
      console.log(title, html);
    } catch (error) {
      console.error(error);
    } finally {
      setPublishLoading(false);
    }
  }, [actions]);

  useEffect(() => {
    return () => {
      setActions(DEFAULT_ACTIONS);
      setActionUuid(DEFAULT_ACTIONS[0].id);
      setTab("edit");
    };
  }, [setActions]);

  return (
    <WithConnect>
      <div className="flex flex-col gap-[20px] p-[30px]">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">New Proposal</h2>
          {actions.length === 0 ||
          [...validationState.values()].some((v) => !v) ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <PublishButton disabled isLoading={publishLoading} />
                </div>
              </TooltipTrigger>
              <TooltipContent>Please fix all errors</TooltipContent>
            </Tooltip>
          ) : (
            <Button
              className="gap-[5px] rounded-[100px]"
              onClick={handlePublish}
              isLoading={publishLoading}
            >
              <Image
                src="/assets/image/proposal/plus.svg"
                alt="plus"
                width={16}
                height={16}
              />
              <span>Publish</span>
            </Button>
          )}
        </header>

        <div className="flex gap-[30px]">
          <aside className="flex w-[300px] flex-shrink-0 flex-col gap-[10px] rounded-[14px]">
            {actions.map((action) => (
              <NewProposalAction
                key={action.id}
                type={action.type}
                onSwitch={() => handleSwitchAction(action.id)}
                active={action.id === actionUuid && tab === "edit"}
                error={!validationState.get(action.id)}
              />
            ))}
            <NewProposalAction
              type="preview"
              onSwitch={() => setTab("preview")}
              active={tab === "preview"}
            />

            <Button
              className="gap-[5px] rounded-[100px]"
              onClick={handleAddAction}
            >
              <Image
                src="/assets/image/proposal/plus.svg"
                alt="plus"
                width={16}
                height={16}
              />
              <span>Add Action</span>
            </Button>
          </aside>
          <main className="flex-1">
            {actions.map((action) => {
              return (
                <Fragment key={action.id}>
                  {action?.type === "proposal" && (
                    <ProposalPanel
                      visible={tab === "edit" && action.id === actionUuid}
                      content={action?.content as ProposalContent}
                      onChange={handleProposalContentChange}
                      ref={(el: HTMLFormElement | null) => {
                        if (el) {
                          panelRefs.current.set(action.id, el);
                        }
                      }}
                    />
                  )}

                  {action?.type === "transfer" && (
                    <TransferPanel
                      visible={tab === "edit" && action.id === actionUuid}
                      index={actions.findIndex(
                        (action) => action.id === actionUuid
                      )}
                      content={action?.content as TransferContent}
                      onChange={handleTransferContentChange}
                      onRemove={handleRemoveAction}
                    />
                  )}

                  {action?.type === "custom" && (
                    <CustomPanel
                      visible={tab === "edit" && action.id === actionUuid}
                      index={actions.findIndex(
                        (action) => action.id === actionUuid
                      )}
                      content={action?.content as CustomContent}
                      onChange={handleCustomContentChange}
                      onRemove={handleRemoveAction}
                    />
                  )}
                </Fragment>
              );
            })}

            <ReplacePanel
              visible={tab === "add"}
              index={actions.length}
              onReplace={handleReplaceAction}
              onRemove={handleRemoveAction}
            />
            <PreviewPanel visible={tab === "preview"} actions={actions} />
          </main>
        </div>
      </div>
    </WithConnect>
  );
}
