"use client"
import {  Eye, EyeClosed, HeadingIcon, ImagePlusIcon, LucideIcon, PlusSquare, PrinterIcon, SettingsIcon } from 'lucide-react'
import React, { useEffect }  from 'react'
import { Button } from '../ui/button'
import { useEditorStore } from '@/stores/use-editor-store'
import { QuestionType } from './field'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
interface ToolbarButton {
  label:string,
  icon :LucideIcon,
  onclick : ()=>void,
  isActive?: boolean
}
const Toolbar = () => {
  const {addField,setSaved, formData, TogglePreview, preview} =useEditorStore();
   const handleKeyEvent = (e:KeyboardEvent)=>{
    if(formData)
    if(e.ctrlKey){
      if(e.key==='n'){
        e.preventDefault();
        addField();
        setSaved(false);
      }
      if(e.key==='b'){
        e.preventDefault();
        addField(QuestionType.Banner);
        setSaved(false);
      }
      if(e.key==='h'){
        e.preventDefault();
        addField(QuestionType.Heading);
        setSaved(false);
      }
      if(e.key==='q'){
        e.preventDefault();
       TogglePreview();
      }

    }
  }
  useEffect(()=>{
     window.addEventListener("keydown", handleKeyEvent);
     return(()=>{
      window.removeEventListener("keydown",handleKeyEvent)
     })
  },[])
  const buttons:ToolbarButton[] = [
    {
      label: 'add field',
      icon: PlusSquare,
      onclick: async()=>{
        addField();
        setSaved(false)
      }
    },
    {
      label: 'add banner',
      icon: ImagePlusIcon,
      onclick: async()=>{
        addField(QuestionType.Banner);
        setSaved(false)
      }
    },
    {
      label: 'add heading',
      icon: HeadingIcon,
      onclick: async()=>{
        addField(QuestionType.Heading);
        setSaved(false)
      }
      },
    {
      label: 'print form',
      icon: PrinterIcon,
      onclick :()=> {
        window.print()
      }
    },
 
  ]
     if(formData)
    return (
  <div className='w-full sticky top-0 bg-background z-50 shadow-lg print:hidden flex-wrap gap-2  p-2  border-b  flex items-center justify-between'>
       <div className="actions flex flex-wrap items-center gap-2">
       {buttons.map(({icon:Icon, label,onclick},i)=>{
        return<Button key={i}
        variant={'outline'}
        title={label}
        className='flex-1'
        onClick={onclick}
        >
          <Icon/>
          <span className='text-sm'>{label}</span>
        </Button>
       })}
           <Link href={`/document/${formData.id}/settings`}>
                 <Button size={'icon'} variant={'outline'}><SettingsIcon/></Button>
                 </Link>
            

       </div>
    </div>
  )
}

export default Toolbar