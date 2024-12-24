/* eslint-disable @typescript-eslint/no-explicit-any */

import { GetFormById } from '@/actions/form-actions'
import DeleFormButton from '@/components/shared/delete-form'
import DisableFormSwitch from '@/components/shared/disable-switch'
import ExportJsonButton from '@/components/shared/export-json-button'
import LoginRequiredSwitch from '@/components/shared/login-required-swith'
import TogglePublishButton from '@/components/shared/publish-button'
import { Button } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'

import Link from 'next/link'
import React from 'react'

const page = async({params:{id}}:any) => {
  const {form, error} = await GetFormById(id);
if(form)
  return (
    <>
      <div className='header w-full border-b p-2 flex flex-col gap-1'>
        <Link href={'/dashboard'}>
        <Button variant={'ghost'} className='px-1'>Back to dashboard</Button>
        </Link>
        <CardTitle>Settings</CardTitle>
      </div>
      <div className="settings flex flex-col gap-1">
        <div className='w-full p-2 border-b flex justify-between items-center'>
        <div className="text">
            <p className='font-semibold text-lg'>Delete Form</p>
            <p className='text-xs text-muted-foreground '>note: this will permenetly delete form from our database its better to disable form if your not sure</p>
            </div> <DeleFormButton id={form.id}/>
            
        </div>
        <div className='w-full p-2 border-b flex justify-between items-center'>
            <div className="text">
            <p className='font-semibold text-lg'>Publish Form</p>
            <p className='text-xs text-muted-foreground '>note: anyone with link can submit your form but you can adjust which category of people can submit</p>
            </div>  <TogglePublishButton data={form}/>
           
        </div>
        <div className='w-full p-2 border-b flex justify-between items-center'>
        <div className="text">
            <p className='font-semibold text-lg'>Disable  Form</p>
            <p className='text-xs text-muted-foreground '>this is a muchi safer option to choose if your usure about deleting your form</p>
            </div>            <DisableFormSwitch data={form}/>
        </div>
        <div className="sub w-full py-2">
          <div className="settings flex flex-col gap-1">
          <div className='w-full p-2 border-b flex justify-between items-center'>
        <div className="text">
            <p className='font-semibold text-lg'>Members only</p>
            <p className='text-xs text-muted-foreground '>by enabling it only logged in users can submit the form</p>
            </div>          <LoginRequiredSwitch data={form}/>
        </div>
          </div>
        </div>
        <div className='w-full p-2 border-b flex justify-between items-center'>
        <div className="text">
            <p className='font-semibold text-lg'>Export Form</p>
            <p className='text-xs text-muted-foreground '>this will provide you a json data of your form to import it in another form</p>
            </div>     <ExportJsonButton data={form}/>
        </div>
        <p className='text-xs text-muted-foreground py-2 text-center'>Are you looking for <Link href={'/analythis/'+form.id} className='text-sky-500 hover:underline'>form analytics? ,click here</Link></p>
      </div>
    </>
  )
else return (
  <div>{error}</div>
)
}

export default page