"use client"
import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { BoldIcon, ItalicIcon, LucideIcon, StrikethroughIcon, UnderlineIcon } from 'lucide-react'
import {Underline} from '@tiptap/extension-underline'
interface ToolbarButton {
  label:string,
  icon :LucideIcon,
  onclick : ()=>void,
  isActive?: boolean
}
const ResizeAbleTextArea = ({onchange, defaultValue}:{onchange?:(data:string)=>void,defaultValue?:string}) => {
    const editor = useEditor({
        extensions: [StarterKit,Underline],
        content: defaultValue,
        editorProps:{
            attributes:{
                class: 'p-2 print:p-0'
            }
        },
         onUpdate:(e)=>{
         if(onchange){
          onchange(e.editor.getHTML())
         }
         }
         
    })
    const tools:ToolbarButton[] = [
        {
          label: 'bold',
          icon: BoldIcon,
          onclick: ()=>{
            editor?.chain().focus().toggleBold().run()
          },
          isActive: editor?.isActive('bold')
        },
        {
          label: 'italic',
          icon: ItalicIcon,
          onclick: ()=>{
            editor?.chain().focus().toggleItalic().run()
          },
          isActive: editor?.isActive('italic')
        },
        {
          label: 'underline',
          icon: UnderlineIcon,
          onclick: ()=>{
            editor?.chain().focus().toggleUnderline().run()
          },
          isActive: editor?.isActive('underline')
        },
        {
          label: 'strike through',
          icon: StrikethroughIcon,
          onclick: ()=>{
            editor?.chain().focus().toggleStrike().run()
          },
          isActive: editor?.isActive('strike')
        },
      ]
  return (
    <div className='w-full  print:border-none border rounded-md '>
        <div className="toolbar print:hidden w-full p-1 flex gap-1 items-center  border-b">
        {tools.map(({icon:Icon, label,onclick},i)=>{
        return<button key={i}
        title={label}
        className='p-1 rounded-md hover:bg-muted-foreground/15 border'
        onClick={onclick}
        >
          <Icon  size={16}/>
        </button>
       })}
        </div>
        <EditorContent editor={editor}/>
    </div>
  )
}

export default ResizeAbleTextArea