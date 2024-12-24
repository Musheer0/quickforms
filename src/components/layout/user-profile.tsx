/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { LogOutIcon } from 'lucide-react'

const UserProfile = () => {
  const {data,status} = useSession()
if(status==='authenticated')
  return (
   <DropdownMenu>
    <DropdownMenuTrigger>
    <Avatar>
    <AvatarImage src={data.user?.image!}/>
    <AvatarFallback>{data.user?.name?.slice(0,2)}</AvatarFallback>
  </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <Button variant={'ghost'} className='w-full' onClick={()=>{
        signOut();
      }}>Logout <LogOutIcon/></Button>
    </DropdownMenuContent>
   </DropdownMenu>
  
  )
if(status==='unauthenticated') 
  return (
<><Link href={'/auth'}><Button >Sigin in</Button></Link></>
  )
}

export default UserProfile