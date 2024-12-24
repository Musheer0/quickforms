"use client"
import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ModeToggle } from '../ui/mode-toggle'
import { usePathname } from 'next/navigation'
import UserProfile from './user-profile'
import { useSession } from 'next-auth/react'
import SearchBar from '../shared/search-bar'

const Navbar = () => {
    const pathname = usePathname();
    const {status}=  useSession()
if(!pathname.includes('/document') && !pathname.includes('/auth'))
  return (
    <nav className='flex border-b shadow-sm p-3 gap-2 justify-between items-center'>
        <Link href={status==='authenticated' ?'/dashboard':'/'}>
        <div className='flex items-center '>
            <Image src={'/logo.png'} width={50} height={50} alt='logo'/>
            <h1 className='font-black text-xl hidden sm:flex'>QuickForms</h1>
        </div>
        </Link>
        <SearchBar className='flex-1'>
        <div tabIndex={1} role='button' className="search text-sm text-muted-foreground flex items-center gap-1 flex-1 bg-muted-foreground/15 p-2 h-full rounded-lg">
         <SearchIcon size={19}/>
         <p>Search Documents</p>
        </div>
        </SearchBar>
       <UserProfile/>
        <ModeToggle/>
    </nav>
  )
}

export default Navbar