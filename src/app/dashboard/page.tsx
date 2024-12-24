import Navbar from '@/components/layout/navbar'
import CreateNewProjectButton from '@/components/shared/create-new-form-button'
import UserForms from '@/components/shared/user-forms'
import { PlusCircleIcon } from 'lucide-react'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <>
    <Navbar/>
    <main className='w-full flex-1 flex flex-col gap-2'>
        <div className="templates w-full bg-muted-foreground/10 pb-4 gap-3  p-2">
        <p className='text-lg font-semibold'>Check out these templates to start with</p>
        <div className="cards flex  origin-top-left overflow-auto p-2 mx-auto w-full items-start justify-start gap-4">
            {Array.from({length:4}).map((_,i)=><div key={i} className="card w-[150px] h-[200px] flex-shrink-0 rounded-md bg-muted-foreground/20"></div>)}
        </div>
        </div>
            <CreateNewProjectButton>
            <div className="card cursor-pointer w-full py-4 rounded-md bg-muted-foreground/15 flex flex-col justify-center items-center">
                <PlusCircleIcon/>
                <p className='text-sm font-semibold'>New Form</p>
            </div>
            </CreateNewProjectButton>
        <div className="projects p-2">
            <p className='text-lg font-semibold'>Your Projects</p>
            <div className="cards flex flex-wrap flex-col mx-auto w-full   gap-4">
           
             <Suspense fallback="loading">
              <UserForms/>
             </Suspense>
        </div>
        </div>
    </main>
    </>
  )
}

export default page