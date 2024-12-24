"use client"
import { useState } from 'react';
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { QuestionType } from './field';
import {  LucideArrowDownWideNarrow } from 'lucide-react';

const FieldTypeToggleDropdown = ({setType}:{setType:(field:QuestionType)=>void}) => {
  const [selectedType, setSelectedType] = useState<QuestionType>(QuestionType.ShortAns);
  
  const handleSelectType = (type: QuestionType) => {
  setSelectedType(type);
  setType(type)
  };

  return (
    <div>
      <DropdownMenu >
        <DropdownMenuTrigger>
        <div  className='text-sm print:hidden border  flex-shrink-0 text-nowrap h-10 flex items-center p-1 rounded-md hover:bg-muted-foreground/15 cursor-pointer'> <LucideArrowDownWideNarrow size={14}/>type:{selectedType}</div>

        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleSelectType(QuestionType.ShortAns)}>
            Short Answer
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelectType(QuestionType.LongAns)}>
            Long Answer
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelectType(QuestionType.Rating)}>
            Rating
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelectType(QuestionType.Options)}>
            Options
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelectType(QuestionType.MultipleOption)}>
            Multiple Options
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelectType(QuestionType.Image)}>
            Image Upload
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FieldTypeToggleDropdown;
