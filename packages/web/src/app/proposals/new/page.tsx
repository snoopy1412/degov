"use client";
import Image from "next/image";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useAsync, usePrevious } from "react-use";
import { Button } from "@/components/ui/button";
import { markdownToHtml } from "@/utils/markdown";
import { NewProposalAction } from "./action";
import { ProposalPanel } from "./proposal-panel";
import { PreviewPanel } from "./preview-panel";
import { ReplacePanel } from "./replace-panel";
import { TransferPanel } from "./transfer-panel";
import { CustomPanel } from "./custom-panel";
import { WithConnect } from "@/components/with-connect";
import {
  generateCustomAction,
  generateProposalAction,
  generateTransferAction,
} from "./helper";
import type {
  Action,
  CustomContentType,
  ProposalContentType,
  TransferContentType,
} from "./type";
import { proposalSchema } from "./schema";

const DEFAULT_ACTIONS: Action[] = [generateProposalAction()];

export default function NewProposal() {
  const [actions, setActions] = useState<Action[]>(DEFAULT_ACTIONS);

  const [actionUuid, setActionUuid] = useState<string>(DEFAULT_ACTIONS[0].id);
  const previewActionUuid = usePrevious(actionUuid);

  const [tab, setTab] = useState<"edit" | "add" | "preview">("edit");
  const handleProposalContentChange = useCallback(
    (content: ProposalContentType) => {
      setActions(
        actions.map((action) =>
          action.type === "proposal" ? { ...action, content } : action
        )
      );
    },
    [actions, setActions]
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
    (content: TransferContentType) => {
      setActions(
        actions.map((action) =>
          action.id === actionUuid && action.type === "transfer"
            ? { ...action, content }
            : action
        )
      );
    },
    [actions, setActions, actionUuid]
  );

  const handleCustomContentChange = useCallback(
    (content: CustomContentType) => {
      setActions(
        actions.map((action) =>
          action.id === actionUuid && action.type === "custom"
            ? { ...action, content }
            : action
        )
      );
    },
    [actions, setActions, actionUuid]
  );

  const proposalContent = useMemo(() => {
    const proposalAction = actions.find((action) => action.type === "proposal");
    return (
      (proposalAction?.content as ProposalContentType) || {
        title: "",
        markdown: "\u200B",
      }
    );
  }, [actions]);

  const html = useAsync(async () => {
    const markdown = proposalContent?.markdown;
    if (markdown) {
      return await markdownToHtml(markdown.value || "");
    }
    return "";
  }, [proposalContent]);

  useEffect(() => {
    if (previewActionUuid && actionUuid && previewActionUuid !== actionUuid) {
      const action = actions.find((action) => action.id === actionUuid);
      switch (action?.type) {
        case "proposal": {
          const result = proposalSchema.safeParse({
            title: action?.content?.title.value,
            markdown: action?.content?.markdown.value,
          });

          setActions(
            actions.map((action) =>
              action.id === previewActionUuid && action.type === "proposal"
                ? {
                    ...action,
                    error: !result.success
                      ? result.error.flatten().fieldErrors
                      : null,
                  }
                : action
            )
          );
          break;
        }
        case "transfer": {
          // 校验transfer内容
          break;
        }
        case "custom": {
          // 校验custom内容
          break;
        }
      }
    }
  }, [previewActionUuid, actionUuid, actions]);

  useEffect(() => {
    return () => {
      setActions(DEFAULT_ACTIONS);
      setActionUuid(DEFAULT_ACTIONS[0].id);
      setTab("edit");
    };
  }, []);

  return (
    <WithConnect>
      <div className="flex flex-col gap-[20px] p-[30px]">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">New Proposal</h2>
          <Button className="gap-[5px] rounded-[100px]">
            <Image
              src="/assets/image/proposal/plus.svg"
              alt="plus"
              width={16}
              height={16}
            />
            <span>Publish</span>
          </Button>
        </header>

        <div className="flex gap-[30px]">
          <aside className="flex w-[300px] flex-shrink-0 flex-col gap-[10px] rounded-[14px]">
            {actions.map((action) => (
              <NewProposalAction
                key={action.id}
                type={action.type}
                onSwitch={() => handleSwitchAction(action.id)}
                active={action.id === actionUuid && tab === "edit"}
                error={Object.values(action?.content || {}).some(
                  (field) => field.error
                )}
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
                      content={action?.content as ProposalContentType}
                      onChange={handleProposalContentChange}
                    />
                  )}

                  {action?.type === "transfer" && (
                    <TransferPanel
                      visible={tab === "edit" && action.id === actionUuid}
                      index={actions.findIndex(
                        (action) => action.id === actionUuid
                      )}
                      content={action?.content as TransferContentType}
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
                      content={action?.content as CustomContentType}
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
            <PreviewPanel
              visible={tab === "preview"}
              title={proposalContent.title.value || ""}
              html={html?.value || ""}
              actions={actions}
            />
          </main>
        </div>
      </div>
    </WithConnect>
  );
}
