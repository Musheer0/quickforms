"use client"
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import {UpdateFormTitle } from '@/actions/form-actions'
import { Input } from '../ui/input'
import { toast } from 'sonner'
  
const RenameForm = ({id,children, prev ,onUpdate}:{id:string,children:React.ReactNode,prev:string, onUpdate?:(title:string, id:string)=>void}) => {
    const [title, setTitle] =useState(prev)
    const handleClick =async()=>{

      toast.loading('updating')
        await UpdateFormTitle(id, title).then(async(res)=>{
          toast.dismiss()
          if(res.new_title && res.id){
            if(onUpdate) await onUpdate(res.new_title, res.id);
          }
          else{
            toast.error(res.error)
          }
        })
    }
  return (
<AlertDialog>
  <AlertDialogTrigger asChild>
  {children}
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Rename your form</AlertDialogTitle>
    </AlertDialogHeader>
        <Input value={title} onChange={(e)=>{
            setTitle(e.target.value)
        }} placeholder='Enter new title'/>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleClick}>Save Changes</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

)
}

export default RenameForm