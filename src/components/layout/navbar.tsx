"use client"
import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ModeToggle } from '../ui/mode-toggle'
import { usePathname } from 'next/navigation'
import UserProfile from './user-profile'

const Navbar = () => {
    const pathname = usePathname()
if(!pathname.includes('/document') && !pathname.includes('/auth'))
  return (
    <nav className='flex border-b shadow-sm p-3 gap-2 justify-between items-center'>
        <Link href={'/'}>
        <div className='flex items-center '>
            <Image src={'/logo.png'} width={50} height={50} alt='logo'/>
            <h1 className='font-black text-xl hidden sm:flex'>QuickForms</h1>
        </div>
        </Link>
        <div tabIndex={1} role='button' className="search text-sm text-muted-foreground flex items-center gap-1 flex-1 bg-muted-foreground/15 p-2 h-full rounded-lg">
         <SearchIcon size={19}/>
         <p>Search Documents</p>
        </div>
       <UserProfile/>
        <ModeToggle/>
    </nav>
  )
}

export default Navbar