"use client"
import { Trash2Icon, UploadCloudIcon } from 'lucide-react'
import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { CardHeader, CardTitle } from '../ui/card'

const UploadImage = ({onUpload, prevurl}:{onUpload?:(url:string)=>void,prevurl:string|null}) => {
  const id = nanoid(4);
  const [file, setFile]= useState<File|null>(null);
  const [isOpen ,setIsopen] = useState(false)
  const [url ,setUrl] = useState(prevurl);

  return (
    <>
  
      {url ? 
    <div className='w-full  relative'>
      <Button  onClick={()=>{
        setFile(null)
        setIsopen(false)
      }} size={'icon'} className='print:hidden absolute left-1 top-1'>
        <Trash2Icon/>
      </Button>
    <img src={url} className='w-full rounded-md' alt="" />
    </div>
    :
    <Button 
    onClick={()=>{
      setIsopen(true);
    }} 
    className='mx-auto'
    >Add Image <UploadCloudIcon/></Button>
    }
    {(isOpen ) && <>
    
   <div className="backdrop z-50 fixed w-full h-screen  top-0 left-0 bg-background/50 flex items-center justify-center">
   <div className=' flex flex-col gap-2 w-full max-w-[500px] bg-background border shadow-md rounded-lg p-4'>
    <CardHeader className='flex p-0 justify-between items-center w-full flex-row'>
    <CardTitle>Upload Image</CardTitle>
    <Button variant={'destructive'} onClick={()=>{
      setIsopen(false);
      setFile(null)
    }}>Cancle</Button>
    </CardHeader>
    <label htmlFor={id} className='w-full'>
    {!file &&
    <div className='w-full h-20 bg-sky-500/15 border border-dashed border-sky-800 rounded-xl flex items-center justify-center'>
    <p className=' text-sky-500 text-sm  flex items-center gap-4'>Upload Image <UploadCloudIcon size={16}/></p>
        <input type="file" accept='image/*' onChange={(e)=>{
          if(e.target.files){
            setFile(e.target.files[0])
          }
        }} hidden id={id} />
        
        </div> 
    }
     {file &&
    <div className='w-full flex flex-col gap-2  relative'>
      <Button  onClick={()=>{
        setFile(null)
        setIsopen(false)
      }} size={'icon'} className='print:hidden absolute left-1 top-1'>
        <Trash2Icon/>
      </Button>
    <img src={URL.createObjectURL(file)} className='w-full rounded-md' alt="" />
    <Button
    onClick={()=>{
      setIsopen(false);
      if(onUpload) {
        onUpload(URL.createObjectURL(file));
        setUrl(URL.createObjectURL(file))
      }
    }}
    variant={'outline'} className='w-full'>Upload Image <UploadCloudIcon/></Button>
    </div>}
    </label>
    </div>
   </div>
    </>}
    </>
  )
}

export default UploadImage