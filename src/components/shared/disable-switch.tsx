"use client"
import React, { useState } from 'react'
import { Form } from '@prisma/client';
import { ToggleDisableForm } from '@/actions/form-actions';
import { Switch } from '../ui/switch';
import { cn } from '@/lib/utils';

const DisableFormSwitch = ({data}:{data:Form}) => {
  const [allowed,setAllowed] =useState(data.disabled);
  const [isLoading ,setIsloading] = useState(false)
     const handleclick =async ()=>{
      setIsloading(true)
      await ToggleDisableForm(data.id, allowed).then((res)=>{
        if(res.form){
          setAllowed(res.form.disabled);
        }
        setIsloading(false)
      })
    }
  return (
    <Switch checked={allowed} onClick={handleclick} disabled={isLoading} className={cn(isLoading && 'opacity-60')}/>
  )
}

export default DisableFormSwitch