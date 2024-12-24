"use client"
import {  HeadingIcon, ImagePlusIcon, LucideIcon, PlusSquare, PrinterIcon, SettingsIcon } from 'lucide-react'
import React  from 'react'
import { Button } from '../ui/button'
import { useEditorStore } from '@/stores/use-editor-store'
import { QuestionType } from './field'
import Link from 'next/link'
interface ToolbarButton {
  label:string,
  icon :LucideIcon,
  onclick : ()=>void,
  isActive?: boolean
}
const Toolbar = () => {
  const {addField,setSaved, formData} =useEditorStore();

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