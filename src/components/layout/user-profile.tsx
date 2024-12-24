/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import React from 'react'

const UserProfile = () => {
  const {data,status} = useSession()
if(status==='authenticated')
  return (
    <Avatar>
    <AvatarImage src={data.user?.image!}/>
    <AvatarFallback>{data.user?.name?.slice(0,2)}</AvatarFallback>
  </Avatar>
  
  )
if(status==='unauthenticated') 
  return (
<></>
  )
}

export default UserProfile