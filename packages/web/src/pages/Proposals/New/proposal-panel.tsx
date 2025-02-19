import { Input } from '@/components/ui/input';
import { Editor } from '@/components/editor';
import { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ProposalContent, proposalSchema } from './schema';

export type ProposalContentType = {
  [K in keyof ProposalContent]: {
    value?: string;
    error?: string;
  };
};

interface ProposalPanelProps {
  content: ProposalContentType;
  onChange: (content: ProposalContentType) => void;
}

export const ProposalPanel = ({ content, onChange }: ProposalPanelProps) => {
  const handleChange = useCallback(
    ({ key, value }: { key: keyof ProposalContentType; value: string }) => {
      const result = proposalSchema.shape[key].safeParse(value);
      onChange({
        ...content,
        [key]: {
          value,
          error: result.success ? '' : result.error.errors[0].message
        }
      });
    },
    [onChange, content]
  );

  return (
    <div className="flex flex-col gap-[20px] rounded-[14px] bg-card p-[20px]">
      <div className="flex flex-col gap-[10px]">
        <label className="text-[14px] text-foreground" htmlFor="title">
          Title
        </label>
        <Input
          id="title"
          value={content.title.value}
          onChange={(e) => handleChange({ key: 'title', value: e.target.value })}
          placeholder="Enter the title of your proposal"
          className={cn(
            'border-border/20 bg-card focus-visible:shadow-none focus-visible:ring-0',
            content.title.error && 'border-red-500'
          )}
        />
        {content.title.error && <p className="text-[12px] text-red-500">{content.title.error}</p>}
      </div>
      <div className="flex flex-col gap-[10px]">
        <label className="text-[14px] text-foreground" htmlFor="description">
          Description
        </label>
        <Editor
          markdown={content.markdown.value || '\u200B'}
          onChange={(markdown) => handleChange({ key: 'markdown', value: markdown })}
          placeholder="Enter the description of your proposal"
          className={cn(
            'border-border/20 bg-card focus-visible:shadow-none focus-visible:ring-0',
            content.markdown.error && 'border-red-500'
          )}
        />
        {content.markdown.error && (
          <p className="text-[12px] text-red-500">{content.markdown.error}</p>
        )}
      </div>
    </div>
  );
};
