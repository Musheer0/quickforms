
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetFormById } from '@/actions/form-actions';
import Navbar from '@/components/editor/navbar';
import Editor from '@/components/editor/playground';
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
        <Editor form={formData as FormData} />
        <SaveFormButton />
      </>
    );
  } else {
    return <div>{error || 'Form not found'}</div>;
  }
};

export default Page;
