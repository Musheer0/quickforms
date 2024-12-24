"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button';
import { useEditorStore } from '../../stores/use-editor-store';
import { cn } from '@/lib/utils';
import { FileWarning, Loader2Icon } from 'lucide-react';
import { UpdateForm } from '@/actions/form-actions';

const SaveFormButton = () => {
    const {isSaved, setSaved ,formData  } =useEditorStore();
    const [saving, setSaving] = useState(false);
    const handleClick = async()=>{
      setSaving(true);
     try {
      await UpdateForm(formData!).then((res)=>{
        console.log(res);
      })
     } catch (error) {
       console.log(error)
     }
      setSaved(true);
      setSaving(false)
    };
    const btn = useRef<HTMLButtonElement|null>(null)
    useEffect(()=>{
     const handlesave =async (e:KeyboardEvent)=>{
           if(e.ctrlKey && e.key==='s'){
            e.preventDefault()
            if(btn.current) btn.current.click()
           }
     }
     window.addEventListener("keydown",handlesave)
     return ()=>{
      window.removeEventListener("keydown",handlesave)
     }
    },[])
  return (
   <>
    <Button
    ref={btn}
    className={cn(
      'fixed bottom-5 left-1/2 px-10 rounded-full border-2 shadow-lg hover:to-red-500 border-red-500 bg-gradient-to-b from-destructive to-red-700 transition-all duration-300 ease-in-out  -translate-x-1/2',
      isSaved && '-bottom-full'
    )} disabled={isSaved || saving}
    onClick={handleClick}
    >
      {saving ? <Loader2Icon className='animate-spin'/>: <><FileWarning/> Unsaved Changes! Click Here to save</>}
    </Button>
    {!isSaved&& <div className='fixed top-0 left-1/2 z-50 translate-x-1/2 bg-muted-foreground/50 text-xs rounded-b-xl px-2 py-1'>ctrl+s to save</div>}

   </>
  )
}

export default SaveFormButton