"use client"
import React, { useEffect } from 'react'
import FormMetadata from './form-metadata'
import Field from './field'
import { FormData, useEditorStore } from '@/stores/use-editor-store'
import {Reorder} from 'framer-motion'
const Editor = ({form}:{form:FormData}) => {
     const {setFormData,formData,reOrderFields,setSaved} = useEditorStore()
     useEffect(() => {
      if (!formData) setFormData(form);
  }, [formData, setFormData, form]);
  if(formData)
  return (
    <div className='flex-1 bg-muted-foreground/20 w-full print:bg-transparent  print:p-0 '>
      <div className="form-paper pb-20 flex flex-col gap-4 bg-background h-full max-w-[794px]  print:min-h-0 min-h-screen print:p-0 p-2  mx-auto">
        <FormMetadata/>
       <Reorder.Group  axis='y' values={formData.fields}
       onReorder={(e)=>{
        setSaved(false)
        reOrderFields(e)
       }}
       >

{formData?.fields.map((field)=><Field key={field.id} field={field}/>)}
       </Reorder.Group>
      </div>

    </div>
  )
}

export default Editor