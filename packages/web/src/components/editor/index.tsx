import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  diffSourcePlugin,
  InsertTable,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  Separator,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo
} from '@mdxeditor/editor';
import { headingsPlugin, DiffSourceToggleWrapper } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import './index.css';

interface EditorProps {
  markdown: string;
  placeholder?: string;
  onChange: (markdown: string) => void;
}

export function Editor({ markdown, placeholder, onChange }: EditorProps) {
  return (
    <MDXEditor
      markdown={markdown || '\u200B'}
      placeholder={placeholder}
      plugins={[
        headingsPlugin(),
        quotePlugin(),
        listsPlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        diffSourcePlugin(),
        toolbarPlugin({
          toolbarClassName: '!rounded-b-none !border-b-0',
          toolbarContents: () => (
            <>
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <Separator />
                <BlockTypeSelect />
                <Separator />
                <ListsToggle />
                <CreateLink />
                <CodeToggle />
                <Separator />
                <InsertTable />
              </DiffSourceToggleWrapper>
            </>
          )
        })
      ]}
      onChange={onChange}
      contentEditableClassName="prose bg-card border border-border/20 rounded-sm max-h-[500px] overflow-y-auto min-h-[200px]"
    />
  );
}
