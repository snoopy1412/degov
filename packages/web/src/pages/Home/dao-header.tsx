import { Button } from '@/components/ui/button';
import { useConfig } from '@/hooks/useConfig';

export const DaoHeader = () => {
  const config = useConfig();
  return (
    <div className="grid grid-cols-2 items-end justify-between rounded-[14px] bg-card p-[20px]">
      <div className="flex flex-col gap-[10px]">
        <h1 className="flex items-center gap-[10px] text-[26px] font-extrabold">
          <img src={config?.logo} alt="logo" className="size-[35px] rounded-full" />
          {config?.daoName}
        </h1>
        <p className="line-clamp-2 text-[14px] text-card-foreground">{config?.description}</p>
        <div className="flex items-center gap-[10px]">
          <Button variant="outline" className="rounded-full border-border bg-card" size="sm">
            Parameters
          </Button>
          <Button variant="outline" className="rounded-full border-border bg-card" size="sm">
            Contracts
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-end gap-[20px]">
        {Object.entries(config?.links ?? {})
          .filter(([, value]) => value && value.trim() !== '')
          .map(([key, value]) => (
            <a
              key={key}
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-[24px] items-center justify-center rounded-full bg-white transition-colors hover:bg-white/80"
            >
              <img
                src={`/assets/image/user_social/${key}.svg`}
                alt={key}
                className="object-contain"
              />
            </a>
          ))}
      </div>
    </div>
  );
};
