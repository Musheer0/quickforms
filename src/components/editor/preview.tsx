"use client"
import React, { useRef } from 'react'
import { CardTitle } from '../ui/card'
import { useEditorStore } from '@/stores/use-editor-store'
import { Input } from '../ui/input'
import { QuestionType } from './field'
import { Textarea } from '../ui/textarea'
import StarRating from './star-rating'
import OptionInput from './options-input'
import MultipleOptionInput from './multiple-options'
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { Button } from '../ui/button'
const Preview = () => {
     const {formData: form,} = useEditorStore();
     
     const fomrRef = useRef<HTMLFormElement|null>(null)
if(form)
  return (
    <div className='flex-1 flex-col sticky top-14 items-center h-full  print:w-full  gap-2 bg-background min-h-screen p-2 lg:flex hidden print:flex '>
        <div className="header flex flex-col gap-1 items-center">
        <p className='absolute top-2 left-2 print:hidden bg-foreground shadow-md px-2 py-1 text-background text-xs rounded-full'>Preview</p>
      <CardTitle className='mx-auto'>{form.title}</CardTitle>
      <p className='text-destructive text-xs'>* indicates required field</p>
      <div
      className='w-full items-center text-center pt-2'
      dangerouslySetInnerHTML={{__html:form.description!}}
      style={{
        color: 'gray',
        fontSize: '14px'
      }}
      />
        </div>
    <form action="" ref={fomrRef} className='flex flex-col gap-2 p-2 items-center w-full border-t'>
    {form.fields.map((field)=>{
        return <div key={field.id} className='w-full'>
           <label htmlFor={field.id} className='text-lg font-semibold capitalize'>
           {field.title}            
           </label>
            {field.required && <p className='text-destructive text-sx'>* required field</p>}
           <div
      className='w-full'
      dangerouslySetInnerHTML={{__html:field.description!}}
      style={{
        color: 'gray',
        fontSize: '14px'
      }}
      />
      {field.type===QuestionType.Options && <p className='text-xs text-muted-foreground'>select any one option</p>}
          {field.type===QuestionType.ShortAns &&   <Input type="text" id={field.id} name={field.id} placeholder='' />}
          {field.type===QuestionType.LongAns &&  <Textarea  id={field.id} className='w-full min-h-[200px]' name={field.id} placeholder='' />}
          {field.type===QuestionType.Rating &&  <StarRating id={field.id} name={field.id} onUpdate={()=>{}}/>}
          {field.type===QuestionType.Options && <OptionInput options={field.options} id={field.id}/>}
          {field.type===QuestionType.MultipleOption && <MultipleOptionInput options={field.options} id={field.id}/>}
          {field.type===QuestionType.Image && 
            <div className=' w-full h-full'>
                <input type="file"  className='print:hidden'/>
            <ResizableBox
         
         width={fomrRef.current?.getBoundingClientRect().width}
         height={200}
         minConstraints={[200, 100]}
         
         axis="y" // allows resizing on both axis (horizontal and vertical)
       >
         <div className='bg-muted-foreground/15 border flex flex-col items-center justify-center w-full h-full'>
           <p className='print:hidden '>Resize this div to adjust according to the picture , this div is only visible during previe</p>
           <p className='text-muted-foreground text-xs'>paste here or staple with the form</p>
         </div>
       </ResizableBox>
            </div>
          }
        </div>
      })}
      <div className="footer  border-t mt-5 py-3 gap-4 flex  w-full flex-col">
        <div className="cta flex print:hidden items-center w-full gap-5 ">
        <Button variant={'outline'} className=''>Submit</Button>
        <label htmlFor="reset" className='cursor-pointer'>
        <Button variant={'outline'} asChild slot='div' className=''>Clear Form</Button>
        <Input type='reset' hidden id='reset' className='cursor-pointer'/>
        </label>
        </div>
        <p className='text-sm max-w-xlmx-auto text-center text-zinc-500'>
        This content is neither created nor endorsed by QuickForms. <span className='print:hidden'>Terms of Service</span> - <span className='print:hidden'>Privacy Policy</span>

Does this form look suspicious? Report at qucikforms@mail.com
        </p>
        <div className="logo flex items-center mx-auto">
          <img src="/logo.png" alt="logo" className='w-7 object-cover h-7 ' />
          <p className='text-xl font-semibold text-muted-foreground'>QuickForms</p>
        </div>
      </div>
    </form>
    </div>
  )
}

export default Preview