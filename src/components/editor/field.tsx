"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import ResizeAbleTextArea from '../ui/resizeable-text-area'
import FieldTypeToggleDropdown from './toggle-field-type';
import { Button } from '../ui/button';
import { Grid2x2Icon,PlusCircleIcon, Trash2Icon} from 'lucide-react';
import { useEditorStore } from '@/stores/use-editor-store';
import { Reorder, useDragControls } from 'framer-motion';
import { cn } from '@/lib/utils';
import UploadImage from './upload-image';
import { Switch } from '../ui/switch';
// Enum definition
export enum QuestionType {
    ShortAns = "shortans",
    LongAns = "longans",
    Rating = "ratings",
    Options = "options",
    MultipleOption = "multiple_option",
    Image = "image",
    Heading = "heading",
    Banner = 'banner'
  }
export type FormField = {
  id:string,
    title:string,
    description?:string,
    type: QuestionType,
    required?:boolean
    options :string[] ,
    image :string|null
}
  // Component for ShortAns
const ShortAnsComponent = () => <Input type="text" disabled />;

// Component for LongAns
const LongAnsComponent = () => <textarea  className='w-full min-h-[50px] print:h-[60px] border'/>;

// Component for Rating
const RatingComponent = () => <input type="number" min="1" max="5" />;

// Component for MultipleOption & Options
const OptionComponent = ({options,id}:{options?:string[],id:string}) =>{
  const {EditOption,setSaved,DeleteOption} = useEditorStore()

  return  (
    <>
     <div className={cn('flex-1 flex flex-wrap items-start  ')}>
     {(options||[]).map((option, i)=>
       <div className={cn(
        'flex  gap-2 w-fit  min-w-[300px] p-2 rounded-lg',
        option==='other'&& 'flex-col border w-full flex-1'
       )} key={i}>
      <div className='flex items-center gap-1'>
      <Input   onChange={(e)=>{
      setSaved(false);
      EditOption({name:e.target.value, index:i, id:id})
       }} 
      placeholder='option name' value={option}/>
      <button className='p-1 text-destructive hover:bg-muted-foreground/10 rounded'
      onClick={()=>{
        setSaved(false);
        DeleteOption({id, index:i})
      }}
      ><Trash2Icon size={14}/></button>
      </div>
      {option==='other' && 
      <div className='flex flex-col'>
      <p className='text-xs text-muted-foreground'>Your answer</p>
      <textarea className='w-full' />
    </div>
      }
     </div>
     )}
    </div>
    </>
   );
}

// Component for Image
const ImageComponent = () => <>
<input type="file" accept="image/*"  className='print:hidden'/>
<p className='print:block hidden text-sm text-muted-foreground'>
    Attach the image to form
</p>
</>;

// Function to render component based on question type
const renderComponent = (type: QuestionType, id:string,options?:string[]) => {
  switch (type) {
    case QuestionType.ShortAns:
      return <ShortAnsComponent />;
    case QuestionType.LongAns:
      return <LongAnsComponent />;
    case QuestionType.Rating:
      return <RatingComponent />;
    case QuestionType.Options:
      return <OptionComponent options={options} id={id}/>;
    case QuestionType.MultipleOption:
      return <OptionComponent options={options} id={id}/>;
    case QuestionType.Image:
      return <ImageComponent />;
    default:
      return null;
  }
};
const Field = ({field}:{field:FormField}) => {
  const controls = useDragControls();
  const isBanner = field.type===QuestionType.Banner;
  const isHeading =QuestionType.Heading===field.type;
  const isOption = field.type ===QuestionType.MultipleOption || field.type===QuestionType.Options
   const [isDraging ,setIsDragning] = useState(false)
      const {removeField,setSaved,changeFieldMetaData,addOptionField,changeFieldType, addOption,AddImageToField, ToggleFieldRequired}= useEditorStore()
  return (
    <Reorder.Item key={field.id} value={field} dragListener={false} dragControls={controls}>
      <div
    className={cn(
      'field flex flex-col gap-1  my-2 bg-background border rounded-lg p-2 ',
      field.type===QuestionType.Heading && 'print:border-none'
    )}
    >
    <div className='flex items-center gap-1'>
    <Button
      className={cn(
        'print:hidden',
        isDraging ? 'hover:cursor-grabbing':' hover:cursor-grab'
      )}
      variant={'link'}
      onPointerDown={(e) =>{
        controls.start(e)
        setIsDragning(true)
      }}
      onPointerUp={()=>{
        setIsDragning(false)
      }}
      >
       <Grid2x2Icon/>
      </Button>
    <Input 
    onChange={(e)=>{
    setSaved(false);
    changeFieldMetaData({id:field.id, title: e.target.value});
    }}
    value={field.title}
    className='font-bold print:p-0 print:h-fit print:border-0' placeholder='Enter Field Title'/>
      <Button
      className='print:hidden'
      variant={'outline'}
  
       onClick={()=>{
        setSaved(false)
        removeField(field.id)
       }}
      >
        <Trash2Icon/>
      </Button>
      <div className='flex items-center gap-1'>
        <p className='text-xs text-destructive'>required</p>
        <Switch checked={field.required} onClick={()=>{
          setSaved(false);
           ToggleFieldRequired({id:field.id})
        }}/>
      </div>
    </div>
{!isBanner &&        
 <ResizeAbleTextArea onchange={(e)=>{
              setSaved(false);
            changeFieldMetaData({id:field.id, description:e})
        }}
        defaultValue={field.description}
        />}
        {isOption &&       <Button onClick={()=>{
          addOption({id:field.id});
          setSaved(false);
        }} variant={'outline'} className=' w-full print:hidden'>Add Option <PlusCircleIcon/></Button>      }
       <div className="priview flex items-start gap-1">
  {isBanner&& <>
  <UploadImage onUpload={async(e)=>{
    AddImageToField({id:field.id, image:e})
  }} prevurl={field.image}/>
  </>}
 {(!isHeading && !isBanner) && <>
  <div className="user-input flex-1">
      {renderComponent(field.type,  field.id,field.options!)}
      </div>
        <FieldTypeToggleDropdown setType={(e)=>{
            if(e===(QuestionType.Options|| QuestionType.MultipleOption)){
             addOptionField({id:field.id, type:e});
             setSaved(false)
            }
            changeFieldType({id:field.id, type:e})
            setSaved(false)
        }}/>
 </>}
       </div>
    </div>
    </Reorder.Item>
  )
}

export default Field