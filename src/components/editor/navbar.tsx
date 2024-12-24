'use client'
import Image from 'next/image'
import React from 'react'
import FormTitle from './form-title'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Navbar = () => {
  const pathname = usePathname()
  return (
    <nav className='w-full print:hidden p-2 flex items-center justify-between'>
       <div className="left flex  flex-1 items-center gap-2">
     <Link href={'/dashboard'}>
     <div className="logo flex items-center ">
            <Image src={'/logo.png'} width={50} height={50} className='object-cover' alt='logo'/>
            <h1 className='font-black  hidden md:flex'>Quick Forms</h1>
        </div>
     </Link>
        {pathname.includes('/document') && <>
          <FormTitle/>
        </>}
       </div>
    </nav>
  )
}

export default Navbar