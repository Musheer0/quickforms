"use client"
import React, { useState } from 'react'
import { forms } from './user-forms'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import {  MoreVertical, SettingsIcon } from 'lucide-react'
import Link from 'next/link'
import { Deleteform } from '@/actions/form-actions'
  
const UserFormData = ({data}:{data:forms[]}) => {
  const [forms, setForms] = useState(data);
  const [isLoading ,setIsloading] = useState(false)
  const deleteform = async(id:string)=>{
    setIsloading(true)
    const updatedForms = forms.filter((form)=>form.id!==id);
    await Deleteform(id);
    setForms(updatedForms);
    setIsloading(false)
  }
  return (
<div className='flex flex-col  w-full'>
{forms.map((form,i)=><div key={form.id} className='flex  hover:bg-muted-foreground/15 cursor-pointer p-1 py-2 border-b items-center justify-between'>
    <Link href={`/document/${form.id}`} className='flex-1 flex items-center gap-2'>
    <p>{i+1}</p>
    <p>{form.title}</p>
    </Link>
    <>
    <DropdownMenu>
  <DropdownMenuTrigger asChild className='w-10 p-2 h-10 rounded-lg hover:bg-muted-foreground/20 cursor-pointer'><MoreVertical  size={18}/></DropdownMenuTrigger>
  <DropdownMenuContent >
    
    <DropdownMenuItem
    disabled={isLoading}
     onClick={async()=>{
     await deleteform(form.id)
     }}
    >{isLoading ? 'Deleting': 'Delete Form'}</DropdownMenuItem>
    <DropdownMenuSeparator />
    <Link href={`/document/${form.id}/settings`}>
    <DropdownMenuItem>Settings <SettingsIcon/></DropdownMenuItem>
    </Link>
  </DropdownMenuContent>
</DropdownMenu>
    </>
 </div>)}
</div>
  )
}

export default UserFormData