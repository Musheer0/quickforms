"use client"
import React from 'react'
import { Button } from '../ui/button'
import { Trash2Icon } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Deleteform } from '@/actions/form-actions'
import { useRouter } from 'next/navigation'
  
const DeleFormButton = ({id}:{id:string}) => {
    const router = useRouter()
    const handleClick =async()=>{
        await Deleteform(id);
        router.push('/')
    }
  return (
<AlertDialog>
  <AlertDialogTrigger asChild>
  <Button variant={'destructive'} size={'sm'}>Delete <Trash2Icon/></Button> 
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleClick}>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

)
}

export default DeleFormButton