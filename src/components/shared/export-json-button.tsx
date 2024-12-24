"use client"
import React from 'react'
import { Button } from '../ui/button';
import { HardDriveUpload } from 'lucide-react';
import { Form } from '@prisma/client';

const ExportJsonButton = ({data}:{data:Form}) => {
    const stringdata = JSON.stringify(data);
    const handleExport = ()=>{
        const  blobfile = new Blob([stringdata], {type:'application/json'});
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blobfile);
        link.download =     `${data.title}.json`;
        link.click();
        URL.revokeObjectURL(link.href)
    }
  return (
    <Button  onClick={handleExport} size={'sm'}>Export<HardDriveUpload/></Button>
  )
}

export default ExportJsonButton