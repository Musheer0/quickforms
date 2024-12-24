"use client"
import React from 'react'
import ResizeAbleTextArea from '@/components/ui/resizeable-text-area'
import { Input } from '@/components/ui/input'
import { useEditorStore } from '@/stores/use-editor-store'

const FormMetadata = () => {
  const {formData,changeFormMetaData,setSaved} =useEditorStore()
  return (
    <div className='w-full'>
      <Input 
          onChange={(e)=>{
            setSaved(false);
            changeFormMetaData({title:e.target.value})
         }}
      className='font-bold text-[32px] h-full p-0 border-0' value={formData?.title||''}/>
      <ResizeAbleTextArea 
      onchange={(e)=>{
        changeFormMetaData({description:e});
        setSaved(false)
      }}
      />
    </div>
  )
}

export default FormMetadata