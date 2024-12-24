"use client"
import { CreateForm } from '@/actions/form-actions';
import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CreateNewProjectButton = ({
    children,
    className
  }: {
    children: React.ReactNode;
    className?:string
  }) => {
    const router = useRouter()
    const [isloading ,setIsloading] = useState(false)
  return (
    <button className={cn(
        className,
        'relative'
    )} 
    disabled={isloading}
    onClick={async()=>{
        setIsloading(true)
        await CreateForm().then((res)=>{
         if(res.id){
            router.push('/document/'+res.id);
        } 
    }) 
    setIsloading(false)
    }}>{isloading ?<>
     <div className='flex items-center justify-center w-full h-full absolute top-0 left-0 bg-background/50'>
     <Loader2Icon className='animate-spin '/>
     </div>
     {children}
    </>: children}</button>
  )

}

export default CreateNewProjectButton