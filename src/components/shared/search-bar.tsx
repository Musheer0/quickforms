"use client"
import React, { ReactNode, useState } from 'react'
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,

  } from "@/components/ui/command"
import { getUserForms } from '@/actions/form-actions'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
  
const SearchBar = ({children, className}:{children:ReactNode, className?:string}) => {
    const [open, setOpen] = React.useState(false);
    const [isLoading ,setIsloading] = useState(false);
    const router = useRouter()
    const [userforms ,setForms] = useState<{
        title: string;
        id: string;
        createdAt: Date;
    }[]>([])
    const getData = async()=>{
        if(userforms.length===0){
            setIsloading(true)
        const {forms}= await getUserForms()
        if(forms) setForms(forms)
            setIsloading(false)
        }
    }
    React.useEffect(()=>{
        getData();
    },[userforms])
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])
  return (
    <>
    <button
    className={className}
    onClick={()=>{
        setOpen(true)
    }} >
        {children}
    </button>
    <CommandDialog open={open} onOpenChange={setOpen}>
        
        <CommandInput placeholder=" search Documens" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Your Forms">
            {userforms.map((form)=><CommandItem onSelect={()=>{
                router.push(`/document/${form.id}`)
            }}  key={form.id}>{form.title}</CommandItem>)}
            {isLoading && <Loader2Icon className='animate-spin'/>}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  
  )
}

export default SearchBar