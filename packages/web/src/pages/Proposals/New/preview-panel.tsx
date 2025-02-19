import { AddressWithAvatar } from '@/components/address-with-avatar';
import { useAccount } from 'wagmi';
import { ActionPanelProps, ActionsPanel } from './action-panel';
import type { Action } from './type';
import { useMemo } from 'react';
import { CustomContentType } from './custom-panel';
import { TransferContentType } from './schema';
import { useConfig } from '@/hooks/useConfig';

interface PreviewPanelProps {
  title: string;
  html: string;
  actions: Action[];
}
// const actions = [
//   {
//     type: 'custom',
//     address: '0x3d6d...8ED5',
//     details: 'burn',
//     params: [
//       { name: 'amount', value: '12' },
//       { name: 'from', value: '0x3d6d656c1bf92f7028Ce4C352563E1C363C58ED5' }
//     ],
//     signature: 'burn(uint256)',
//     calldata: {
//       uint256: '12'
//     },
//     value: '0'
//   },
//   {
//     type: 'transfer',
//     address: '0x3d6d...8ED5',
//     details: 'transfer',
//     amount: '12',
//   }
// ];

export const PreviewPanel = ({ title, html, actions }: PreviewPanelProps) => {
  const { address } = useAccount();
  const daoConfig = useConfig();

  const actionPanelInfo = useMemo<ActionPanelProps[]>(() => {
    return actions
      ?.filter((action) => action?.type === 'custom' || action?.type === 'transfer')
      ?.filter((action) => {
        console.log('111', action);
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
  console.log('actionPanelInfo', actionPanelInfo);

  return (
    <div className="flex flex-col gap-[10px]">
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
