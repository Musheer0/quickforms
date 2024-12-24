"use client"
import React, { useState } from 'react'
import { Form } from '@prisma/client';
import { ToggleLoginRequiredForm } from '@/actions/form-actions';
import { Switch } from '../ui/switch';
import { cn } from '@/lib/utils';

const LoginRequiredSwitch = ({data}:{data:Form}) => {
  const [allowed,setAllowed] =useState(data.LoginRequired);
  const [isLoading ,setIsloading] = useState(false)
     const handleclick =async ()=>{
      setIsloading(true)
      await ToggleLoginRequiredForm(data.id, allowed).then((res)=>{
        if(res.form){
          setAllowed(res.form.LoginRequired);
        }
        setIsloading(false)
      })
    }
  return (
    <Switch checked={allowed} onClick={handleclick} disabled={isLoading} className={cn(isLoading && 'opacity-60')}/>
  )
}

export default LoginRequiredSwitch