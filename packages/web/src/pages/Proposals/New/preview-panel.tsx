import { AddressWithAvatar } from '@/components/address-with-avatar';
import { useAccount } from 'wagmi';
import { ActionPanelProps, ActionsPanel } from './action-panel';
import { useMemo } from 'react';
import { useConfig } from '@/hooks/useConfig';
import type { Action, CustomContentType, TransferContentType } from './type';
import { cn } from '@/lib/utils';

interface PreviewPanelProps {
  title: string;
  visible: boolean;
  html: string;
  actions: Action[];
}

export const PreviewPanel = ({ title, visible, html, actions }: PreviewPanelProps) => {
  const { address } = useAccount();
  const daoConfig = useConfig();

  const actionPanelInfo = useMemo<ActionPanelProps[]>(() => {
    return actions
      ?.filter((action) => action?.type === 'custom' || action?.type === 'transfer')
      ?.filter((action) => {
        return Object.values(action.content).every((content) => {
          if (Array.isArray(content.error)) {
            return content.error.every((error: string) => error === '');
          }
          return !content.error;
        });
      })
      ?.filter((action) => {
        console.log('233', action);

        if (action.type === 'custom') {
          return !!(action.content as CustomContentType).target?.value;
        } else {
          return !!(action.content as TransferContentType).recipient?.value;
        }
      })
      .map((action) => {
        const info: ActionPanelProps = {
          type: action.type
        };
        const address =
          action.type === 'custom'
            ? (action.content as CustomContentType).target?.value
            : (action.content as TransferContentType).recipient?.value;

        info.address = address as `0x${string}`;

        if (action.type === 'transfer') {
          info.value = (action.content as TransferContentType).amount?.value;
          info.details = `${info.value} ${daoConfig?.tokenInfo?.symbol}`;
        }

        if (action.type === 'custom') {
          info.details = (action?.content as CustomContentType).abiMethod?.value;
          info.params = (action?.content as CustomContentType).calldata?.value?.map((param) => ({
            name: param?.name,
            value: param.value,
            type: param.type
          }));
          info.signature = `${(action.content as CustomContentType)?.abiMethod?.value}(${info.params?.map((param) => param.name).join(',')})`;
          info.calldata = info.params?.reduce(
            (acc, param) => {
              acc[param.name] = param.value;
              return acc;
            },
            {} as { [key: string]: string }
          );
        }

        return info;
      });
  }, [actions, daoConfig?.tokenInfo?.symbol]);

  return (
    <div className={cn('flex flex-col gap-[10px]', !visible && 'hidden')}>
      <div className="flex flex-col gap-[20px] rounded-[14px] bg-card p-[20px]">
        <header className="flex flex-col">
          <h2 className="text-[26px] font-semibold">{title || 'Untitled'}</h2>

          <div className="flex items-center gap-[5px]">
            <span>Proposed by </span>
            {address && (
              <AddressWithAvatar address={address} avatarSize={24} className="gap-[5px]" />
            )}
          </div>
        </header>
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      {actionPanelInfo.length > 0 && (
        <div className="flex flex-col gap-[20px] rounded-[14px] bg-card p-[20px]">
          <ActionsPanel actions={actionPanelInfo} />
        </div>
      )}
    </div>
  );
};
