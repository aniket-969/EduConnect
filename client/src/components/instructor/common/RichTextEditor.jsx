import React,{useState} from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

import { FaBold, FaItalic, FaUnderline, FaLink,FaUnlink, FaHeading, FaListUl, FaListOl, FaUndo, FaRedo, FaParagraph } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { z } from "zod";

const urlSchema = z.string().url("Please enter a valid URL");

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
const [showLinkModal, setShowLinkModal] = useState(false);
const [urlInput, setUrlInput] = useState("");
const [error, setError] = useState("");
const applyLink = () => {
    const parsed = urlSchema.safeParse(urlInput.trim());
    if (!parsed.success) {
      setError(parsed.error.errors[0].message);
      return;
    }

    editor?.chain().focus().setLink({ href: parsed.data }).run();
    setShowLinkModal(false);
    setUrlInput("");
    setError("");
  };


  if (!editor) return null;

  return (
    <div className="rounded-md border bg-white dark:bg-card shadow-sm">
      <div className="flex flex-wrap gap-2 border-b p-2 bg-secondary/5">
        <Button
          type="button"
          variant={editor.isActive("paragraph") ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().setParagraph().run()}
          title="Paragraph"
        >
          <FaParagraph className="h-4 w-4" />
         
        </Button>
 

        <Button
          type="button"
          variant={editor.isActive("bold") ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
        >
          <FaBold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive("italic") ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
        >
          <FaItalic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={editor.isActive("underline") ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        title="Underline">
          <FaUnderline className="h-4 w-4" />
        </Button>
                <Button
          type="button"
          variant={editor.isActive("heading", { level: 1 }) ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          title="Heading 1"
        >
          <span className="relative text-[10px] mr-1">
    <FaHeading className="h-4 w-4" />
    <span className="absolute text-[10px] font-bold -top-1 -right-1.75"> 1</span>
  </span>
          
        </Button>
        <Button
          type="button"
          variant={editor.isActive("heading", { level: 2 }) ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title="Heading 2"
        >
<span className="relative text-[10px] mr-1">
    <FaHeading className="h-4 w-4" />
    <span className="absolute text-[10px] font-bold -top-1 -right-1.75 ">2</span>
  </span>
          </Button>

        <Button
          type="button"
          variant={editor.isActive("bulletList") ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="Bullet List">
          <FaListUl className="h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          variant={editor.isActive("orderedList") ? "default" : "outline"}
          size="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title="Ordered List">
          <FaListOl className="h-4 w-4" />
        </Button>

<Button
  type="button"
  variant={editor.isActive("link") ? "default" : "outline"}
  size="icon"
  onClick={() => setShowLinkModal(true)}
title="Link"
>
  <FaLink className="h-4 w-4" />
</Button>

<Dialog open={showLinkModal} onOpenChange={setShowLinkModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="https://example.com"
            value={urlInput}
            onChange={(e) => {
              setUrlInput(e.target.value);
              setError("");
            }}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setShowLinkModal(false)}>
              Cancel
            </Button>
            <Button onClick={applyLink}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
<Button
  type="button"
  variant="outline"
  size="icon"
  onClick={() => editor.chain().focus().unsetLink().run()}
  disabled={!editor.isActive("link")}
  title="Remove Link"
>
  <FaUnlink className="h-4 w-4" />
</Button>


        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().undo().run()}
        title="Undo">
          <FaUndo className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().redo().run()}
        title="Redo">
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
