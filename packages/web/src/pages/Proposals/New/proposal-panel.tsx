import { Input } from '@/components/ui/input';
import { Editor } from '@/components/editor';
import { useCallback } from 'react';

export type ProposalContentType = {
  title: string;
  markdown: string;
  snapshot: string;
};

interface ProposalPanelProps {
  content: ProposalContentType;
  onChange: (content: ProposalContentType) => void;
}

export const ProposalPanel = ({ content, onChange }: ProposalPanelProps) => {
  const handleChange = useCallback(
    async ({ key, value }: { key: keyof ProposalContentType; value: string }) => {
      onChange({ ...content, [key]: value });
    },
    [onChange, content]
  );

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[10px]">
        <label className="text-[14px] text-foreground" htmlFor="title">
          Title
        </label>
        <Input
          id="title"
          value={content.title}
          onChange={(e) => handleChange({ key: 'title', value: e.target.value })}
          placeholder="Enter the title of your proposal"
          className="border-border/20 bg-card"
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <label className="text-[14px] text-foreground" htmlFor="description">
          Description
        </label>
        <Editor
          markdown={content.markdown || '\u200B'}
          onChange={(markdown) => handleChange({ key: 'markdown', value: markdown })}
          placeholder="Enter the description of your proposal"
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <label className="text-[14px] text-foreground" htmlFor="action">
          Snapshot URL
        </label>
        <Input
          id="action"
          value={content.snapshot}
          onChange={(e) => handleChange({ key: 'snapshot', value: e.target.value })}
          placeholder="https://snapshot.org/#/s:dao.eth"
          className="border-border/20 bg-card"
        />
      </div>
    </div>
  );
};
