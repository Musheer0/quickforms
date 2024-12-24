import { getUserForms } from '@/actions/form-actions'
import React from 'react'
import UserFormData from './user-forms-table'
export type forms = {
    id: string
    title: string
    createdAt :string
  }
  export const dynamic = 'force-dynamic'; // Ensure no caching
const UserForms = async() => {
    const {forms, error}= await getUserForms();
  if(!error)
    return (
        <div className="w-full mx-auto py-10">
        <UserFormData  data={forms!.map((form)=>({...form, createdAt: `${ form.createdAt.toLocaleDateString()} at ${ form.createdAt.toLocaleTimeString()}`}))} />
      </div>  )
}

export default UserForms