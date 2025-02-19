import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAsync } from 'react-use';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { markdownToHtml } from '@/utils/markdown';
import { NewProposalAction } from './action';
import { ProposalContentType, ProposalPanel } from './proposal-panel';
import { PreviewPanel } from './preview-panel';
import { ReplacePanel } from './replace-panel';
import { TransferContentType, TransferPanel } from './transfer-panel';
import { CustomContentType, CustomPanel } from './custom-panel';
import { WithConnect } from '@/components/with-connect';
import type { ProposalActionType } from '@/config/proposals';
import type { Address } from 'viem';
import { Action } from './type';

const DEFAULT_ACTIONS = [
  {
    id: uuidv4(),
    type: 'proposal' as ProposalActionType,
    content: {
      title: {
        value: '',
        error: ''
      },
      markdown: {
        value: '\u200B',
        error: ''
      }
    } as ProposalContentType
  },
  {
    id: uuidv4(),
    type: 'preview' as ProposalActionType
  }
];

export const NewProposal = () => {
  const [actions, setActions] = useState<Action[]>(DEFAULT_ACTIONS);
  const [actionUuid, setActionUuid] = useState<string>(DEFAULT_ACTIONS[0].id);
  console.log('actions', actions);

  const handleProposalContentChange = useCallback(
    (content: ProposalContentType) => {
      setActions(
        actions.map((action) => (action.type === 'proposal' ? { ...action, content } : action))
      );
    },
    [actions, setActions]
  );

  const handleAddAction = useCallback(() => {
    if (actions.findIndex((action) => action.type === 'add') === -1) {
      const previewIndex = actions.findIndex((action) => action.type === 'preview');
      const newActions = [
        ...actions.slice(0, previewIndex),
        { id: uuidv4(), type: 'add' as ProposalActionType },
        ...actions.slice(previewIndex)
      ];
      setActions(newActions);
      setActionUuid(newActions[newActions.length - 2].id);
    }
  }, [actions, setActions]);

  const handleSwitchAction = useCallback(
    (id: string) => {
      setActionUuid(id);
      setActions(actions.filter((action) => action.type !== 'add'));
    },
    [setActionUuid, actions]
  );

  const handleRemoveAction = useCallback(
    (index: number) => {
      setActions(actions.filter((_, i) => i !== index));
      setActionUuid(actions[index - 1].id);
    },
    [actions, setActions]
  );

  const handleReplaceAction = useCallback(
    (type: Omit<ProposalActionType, 'add'>, index: number) => {
      let content: TransferContentType | CustomContentType | undefined;
      if (type === 'transfer') {
        content = {
          recipient: {
            value: '' as Address,
            error: ''
          },
          amount: {
            value: '',
            error: ''
          }
        } as TransferContentType;
      } else if (type === 'custom') {
        content = {
          target: {
            value: '' as Address,
            error: ''
          },
          abiType: {
            value: '',
            error: ''
          },
          abiMethod: {
            value: '',
            error: ''
          },
          calldata: {
            value: [],
            error: []
          },
          value: {
            value: '',
            error: ''
          }
        } as CustomContentType;
      }

      setActions(
        actions.map((action, i) => {
          if (i === index) {
            return { id: action.id, type: type as ProposalActionType, content };
          }
          return action;
        })
      );
    },
    [actions, setActions]
  );

  const handleTransferContentChange = useCallback(
    (content: TransferContentType) => {
      setActions(
        actions.map((action) => (action.id === actionUuid ? { ...action, content } : action))
      );
    },
    [actions, setActions, actionUuid]
  );

  const handleCustomContentChange = useCallback(
    (content: CustomContentType) => {
      setActions(
        actions.map((action) => (action.id === actionUuid ? { ...action, content } : action))
      );
    },
    [actions, setActions, actionUuid]
  );

  const html = useAsync(async () => {
    const proposalAction = actions.find((action) => action.type === 'proposal');
    const markdown = (proposalAction?.content as ProposalContentType)?.markdown;
    if (markdown) {
      return await markdownToHtml(markdown.value || '');
    }
    return '';
  }, [actions]);

  useEffect(() => {
    return () => {
      setActions(DEFAULT_ACTIONS);
    };
  }, []);

  const proposalContent = useMemo(() => {
    const proposalAction = actions.find((action) => action.type === 'proposal');
    return (proposalAction?.content as ProposalContentType) || { title: '', markdown: '\u200B' };
  }, [actions]);

  const currentAction = useMemo(() => {
    return actions.find((action) => action.id === actionUuid);
  }, [actions, actionUuid]);

  return (
    <WithConnect>
      <div className="flex flex-col gap-[20px] p-[30px]">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">New Proposal</h2>
          <Button className="gap-[5px] rounded-[100px]">
            <img src="/assets/image/proposal/plus.svg" alt="plus" />
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
                active={action.id === actionUuid}
              />
            ))}

            <Button className="gap-[5px] rounded-[100px]" onClick={handleAddAction}>
              <img src="/assets/image/proposal/plus.svg" alt="plus" />
              <span>Add Action</span>
            </Button>
          </aside>
          <main className="flex-1">
            {currentAction?.type === 'proposal' && (
              <ProposalPanel content={proposalContent} onChange={handleProposalContentChange} />
            )}

            {currentAction?.type === 'add' && (
              <ReplacePanel
                index={actions.findIndex((action) => action.id === actionUuid)}
                onReplace={handleReplaceAction}
                onRemove={handleRemoveAction}
              />
            )}
            {currentAction?.type === 'transfer' && (
              <TransferPanel
                index={actions.findIndex((action) => action.id === actionUuid)}
                content={currentAction?.content as TransferContentType}
                onChange={handleTransferContentChange}
                onReplace={handleReplaceAction}
                onRemove={handleRemoveAction}
              />
            )}
            {currentAction?.type === 'custom' && (
              <CustomPanel
                index={actions.findIndex((action) => action.id === actionUuid)}
                content={currentAction?.content as CustomContentType}
                onChange={handleCustomContentChange}
                onReplace={handleReplaceAction}
                onRemove={handleRemoveAction}
              />
            )}

            {currentAction?.type === 'preview' && (
              <PreviewPanel
                title={proposalContent.title.value || ''}
                html={html?.value || ''}
                actions={actions}
              />
            )}
          </main>
        </div>
      </div>
    </WithConnect>
  );
};
