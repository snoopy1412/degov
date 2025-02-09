import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface ViewOnExplorerProps {
  explorerUrl: string;
  className?: string;
  imgClassName?: string;
}
export const ViewOnExplorer = ({ explorerUrl, className, imgClassName }: ViewOnExplorerProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'inline-block h-[16px] w-[16px] cursor-pointer transition-opacity hover:opacity-80',
            className
          )}
        >
          <img
            src="/assets/image/external-link.svg"
            alt="external-link"
            className={cn('h-full w-full', imgClassName)}
          />
        </a>
      </TooltipTrigger>
      <TooltipContent>View on explorer</TooltipContent>
    </Tooltip>
  );
};
