"use client"
import React from 'react'
import { Input } from '../ui/input'
import { useEditorStore } from '@/stores/use-editor-store'

const FormTitle = () => {
  const {formData ,setSaved,changeFormMetaData} = useEditorStore();
  return (
    <form action="" className='flex items-center gap-2 flex-1'>
        <Input
        onChange={(e)=>{
           setSaved(false);
           changeFormMetaData({title:e.target.value})
        }}
        value={formData?.title||''} className='border-transparent px-0  focus:border-muted-foreground focus:outline-none flex-1'/>
      
    </form>

  )
}

export default FormTitle