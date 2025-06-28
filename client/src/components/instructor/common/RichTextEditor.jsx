import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

import { FaBold, FaItalic, FaUnderline, FaLink, FaHeading, FaListUl, FaListOl, FaUndo, FaRedo, FaParagraph } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3], // instead of importing Heading separately
      },
    }),
    Underline,
    Link,
  ],
  content: value || "<p>Write your course description here...</p>",
  onUpdate: ({ editor }) => {
    onChange?.(editor.getHTML());
  },
});


  if (!editor) return null;

  return (
    <div className="rounded-md border bg-white dark:bg-card shadow-sm">
      <div className="flex flex-wrap gap-2 border-b p-2 bg-secondary/5">
        <Button
          type="button"
          variant={editor.isActive("paragraph") ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <FaParagraph className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive("bold") ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <FaBold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive("italic") ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <FaItalic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive("underline") ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <FaUnderline className="h-4 w-4" />
        </Button>
                <Button
          type="button"
          variant={editor.isActive("heading", { level: 1 }) ? "default" : "outline"}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className="h-9"
        >
          <FaHeading className="mr-1 h-4 w-4" />H1
          
        </Button>
        <Button
          type="button"
          variant={editor.isActive("heading", { level: 2 }) ? "default" : "outline"}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className="h-9"
        >
          <FaHeading className="mr-1 h-4 w-4 text-sm" />H2
        </Button>

        <Button
          type="button"
          variant={editor.isActive("bulletList") ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <FaListUl className="h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          variant={editor.isActive("orderedList") ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <FaListOl className="h-4 w-4" />
        </Button>
                <Button
          type="button"
          variant={editor.isActive("link") ? "default" : "outline"}
          size="icon"
          onClick={() => {
            const url = prompt("Enter URL:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
        >
          <FaLink className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <FaUndo className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <FaRedo className="h-4 w-4" />
        </Button>
      </div>

      <EditorContent
        editor={editor}
        className="editor-content p-4 min-h-[180px]"
      />
    </div>
  );
};

export default RichTextEditor;
