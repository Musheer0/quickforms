"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { GlobeIcon,Loader2Icon } from 'lucide-react';
import { Form } from '@prisma/client';
import {  TogglePublishForm } from '@/actions/form-actions';
const TogglePublishButton = ({data}:{data:Form}) => {
  const [allowed,setAllowed] =useState(data.isPublished);
  const [isLoading ,setIsloading] = useState(false)
     const handleclick =async ()=>{
      setIsloading(true)
      await TogglePublishForm(data.id, allowed).then((res)=>{
        if(res.form){
          setAllowed(res.form.isPublished);
        }
        setIsloading(false)
      })
    }
  return (
    <Button onClick={handleclick} variant={'outline'} disabled={isLoading}>
      {isLoading ? <Loader2Icon className='animate-spin'/> : <>  
       {allowed ? 'Un-publish': 'publish'}
      <GlobeIcon/></>}
    </Button>
  )
}

export default TogglePublishButton