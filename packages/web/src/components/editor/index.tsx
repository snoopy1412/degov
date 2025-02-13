import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  diffSourcePlugin,
  imagePlugin,
  InsertImage,
  InsertTable,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods,
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
import { useEffect, useRef } from 'react';

interface EditorProps {
  markdown: string;
  placeholder?: string;
  onChange: (markdown: string) => void;
}

export function Editor({ markdown, placeholder, onChange }: EditorProps) {
  const editorRef = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
      }
    }, 1000);
  }, []);

  return (
    <MDXEditor
      ref={editorRef}
      markdown={markdown || '\u200B'}
      placeholder={placeholder}
      plugins={[
        headingsPlugin(),
        quotePlugin(),
        listsPlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        imagePlugin(),
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
                <InsertImage />
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
