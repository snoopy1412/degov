import { AddressAvatar } from '@/components/address-avatar';
import { AddressResolver } from '@/components/address-resolver';
import { Separator } from '@/components/ui/separator';
import React from 'react';

interface ProposalStage {
  title: string;
  timestamp: string;
  icon: React.ReactNode;
  isActive?: boolean;
  tag?: string;
}

const Status: React.FC = () => {
  const stages: ProposalStage[] = [
    {
      title: 'Publish onChain',
      timestamp: 'Mon Apr 22, 09:13 pm',
      icon: <img src="/assets/image/proposal/status-published.svg" alt="published" />,
      isActive: true,
      tag: 'Bear'
    },
    {
      title: 'Start voting period',
      timestamp: 'Mon Apr 22, 09:13 pm',
      icon: <img src="/assets/image/proposal/status-started.svg" alt="started" />,
      isActive: true
    },
    {
      title: 'End voting period',
      timestamp: 'Mon Apr 22, 09:13 pm',
      icon: <img src="/assets/image/proposal/status-ended.svg" alt="ended" />
    },
    {
      title: 'Queue proposal',
      timestamp: 'Mon Apr 22, 09:13 pm',
      icon: <img src="/assets/image/proposal/status-queued.svg" alt="queued" />
    },
    {
      title: 'Execute proposal',
      timestamp: 'Mon Apr 22, 09:13 pm',
      icon: <img src="/assets/image/proposal/status-executed.svg" alt="executed" />
    }
  ];

  return (
    <div className="flex flex-col gap-[20px] rounded-[14px] bg-card p-[20px]">
      <h3 className="text-[18px] text-white">Status</h3>
      <Separator className="bg-border/20" />
      <div className="relative">
        {/* Timeline connector line */}
        <div className="absolute bottom-0 left-[10px] top-3 w-0.5 bg-white/10" />

        {stages.map((stage, index) => (
          <div
            key={index}
            className={`mb-6 flex w-full items-center justify-between ${stage.isActive ? 'opacity-100' : 'opacity-50'}`}
          >
            <div className="flex items-center gap-[10px]">
              {/* Icon */}
              <div className="z-10 mr-[13px] h-[28px] w-[28px] text-white">{stage.icon}</div>

              {/* Content */}
              <div className="flex items-center justify-between gap-[10px]">
                <div>
                  <div className="text-[10px] text-muted-foreground">{stage.timestamp}</div>
                  <span className="text-[16px] font-semibold text-white">{stage.title}</span>
                  <div className="flex items-center gap-[5px]">
                    <AddressAvatar
                      address="0x1234567890123456789012345678901234567890"
                      className="h-[14px] w-[14px] rounded-full"
                    />
                    <AddressResolver
                      address="0x1234567890123456789012345678901234567890"
                      showShortAddress
                    >
                      {(value) => {
                        return <span className="text-[10px]">{value}</span>;
                      }}
                    </AddressResolver>
                  </div>
                </div>
              </div>
            </div>

            <img src="/assets/image/external-link.svg" alt="arrow" className="h-[16px] w-[16px]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Status;
