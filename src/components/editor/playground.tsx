"use client"
import React, { useEffect } from 'react'
import FormMetadata from './form-metadata'
import Field from './field'
import { FormData, useEditorStore } from '@/stores/use-editor-store'
import {Reorder} from 'framer-motion'
const PlayGround = ({form}:{form:FormData}) => {
     const {setFormData,formData,reOrderFields,setSaved} = useEditorStore();
     function deleteFormStorageItems() {
      // Loop through all the keys in localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
    
        // Check if the key starts with 'form-'
        if (key!.startsWith('form-')) {
          if(key!.split('form-')[1]!==form.id)
          localStorage.removeItem(key!); // Remove the item from localStorage
        }
      }
    }
    
     useEffect(() => {
     if(form.id!==formData?.id){
      deleteFormStorageItems()
      setFormData(null);
      setSaved(true)
      setFormData(form)
     }

  }, []);
  useEffect(()=>{

  localStorage.setItem('form-'+form.id,`${JSON.stringify( formData)},{time:${Date.now().toString()}}`);
  },[formData])
  if(formData)
  return (
    <div className='flex-1  print:hidden '>
      <div className="form-paper pb-20 flex flex-col gap-4 bg-background h-full max-w-[794px]  print:min-h-0 min-h-screen print:p-0 p-2  mx-auto">
        <FormMetadata/>
       <Reorder.Group  axis='y' values={formData.fields}
       onReorder={(e)=>{
        setSaved(false);
        reOrderFields(e)
       }}
       >

{formData?.fields.map((field)=><Field key={field.id} field={field}/>)}
       </Reorder.Group>
      </div>

    </div>
  )
}

export default PlayGround