"use client"
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
const OptionInput = ({options, id}:{options:string[], id:string}) => {
    const [selectedOption ,setSelectedOption ]= useState('')
  return (
    <div className='flex flex-wrap gap-1'>
        {options.map((option,i)=>{
        return <label  key={i} htmlFor={option} className={cn(
            'flex items-center gap-1 bg-gradient-to-b from-background to-transparent  p-1 flex-shrink-0 border-b',
        )}>
             <input type="radio"  id={option}  className='print:hidden' value={option} name={id} onChange={(e)=>{
                setSelectedOption(e.target.value)
             }}/>
             <div className="box w-5 border hidden print:flex h-5"></div>
             <p className={cn(
                'font-semibold',
                selectedOption!==option && 'text-muted-foreground'
             )}>{option}</p>
        </label>
        })}
    </div>
  )
}

export default OptionInput