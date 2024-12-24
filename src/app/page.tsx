import About from '@/components/landing/about'
import Hero from '@/components/landing/hero'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div  className=' min-h-screen overflow-x-hidden w-full max-w-[100vw] bg-zinc-950 text-zinc-50 '>
      <div className="spotlight w-4 h-full z-50 bg-purple-500 absolute rotate-45  opacity-70 -top-60 blur-xl translate-x-1/2 left-1/2"></div>
      <div className="spotlight w-4 h-full z-50 bg-purple-500 absolute rotate-45 opacity-40 -top-40 blur-xl translate-x-1/2 left-10"></div>
      <div className="spotlight w-4 h-full z-50 bg-purple-500 absolute rotate-45 -top-40 opacity-30 blur-xl translate-x-1/2 left-1/4"></div>
      <div className="spotlight w-4 h-full z-50 bg-purple-500 absolute rotate-45 -top-40 opacity-30 blur-xl translate-x-1/2 right-1/4"></div>
      <div className="spotlight w-4 h-full z-50 bg-purple-500 absolute rotate-45 -top-80 opacity-35 blur-xl translate-x-1/2 right-0"></div>
       <div className="glow opacity-25 absolute top-2 left-1/2 -translate-x-1/2 w-[80%] mix-blend-screen z-20 blur-3xl bg-blend-lighten h-10 bg-purple-300  rounded-full"></div>
      <nav className='w-full p-2 mb-5  flex  items-center justify-between'>
      <div className='flex items-center '>
                <Image src={'/logo.png'} width={50} height={50} alt='logo'/>
                <h1 className='font-black text-xl '>QuickForms</h1>
            </div>
      <Link href={'/auth'}>
      <Button>Login</Button>
      </Link>
      </nav>
      <Hero/>
      <About/>
    </div>
  )
}

export default page