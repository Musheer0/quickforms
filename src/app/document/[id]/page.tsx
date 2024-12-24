
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetFormById } from '@/actions/form-actions';
import Navbar from '@/components/editor/navbar';
import PlayGround from '@/components/editor/playground';
import Preview from '@/components/editor/preview';
import SaveFormButton from '@/components/editor/save-form-button';
import Toolbar from '@/components/editor/toolbar';
import { FormData } from '@/stores/use-editor-store';
import React from 'react';

const Page = async ({
  params,
}: {
  params: any;
}) => {
  const props = await params
  const { form, error } = await GetFormById(props.id);

  const formData =
    form && {
      id: form.id!,
      title: form.title,
      description: form.description,
      fields: form.data || [],
    };

  if (form && formData) {
    return (
      <>
      <Navbar/>
        <Toolbar />
      <div className='flex-1 bg-muted-foreground/20  w-full flex items-start gap-1'>
      <PlayGround form={formData as FormData} />
      
      <Preview/>
      </div>
        <SaveFormButton />
      </>
    );
  } else {
    return <div>{error || 'Form not found'}</div>;
  }
};

export default Page;
