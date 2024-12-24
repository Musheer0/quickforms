import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
const Hero =() => {
  return (
    <div className='relative     flex items-center justify-center flex-col overflow-x-hidden w-full min-h-screen'>
      
      <div 
        className="absolute opacity-10 inset-0 bg-[linear-gradient(to_right,#a855f7_1px,transparent_1px),linear-gradient(to_bottom,#a855f7_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#2a2a2a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />
    <div className='flex flex-col items-center'>
    <h1 className='font-semibold text-[6vw] text-center  uppercase sm:text-[5vw]'><span className='p-0.5 bg-purple-500/20 border relative border-purple-500'>
      <div className="box absolute top-0 left-0 w-3 -translate-x-1/2 -translate-y-1/2 h-3 bg-purple-300"></div>
      <div className="box absolute top-full left-0 w-3 -translate-x-1/2 -translate-y-1/2 hidden sm:flex h-3 bg-purple-300"></div>
      <div className="box absolute top-0 right-0 w-3 translate-x-1/2 -translate-y-1/2 h-3 hidden sm:flex bg-purple-300"></div>
      <div className="box absolute bottom-0 right-0 w-3 translate-x-1/2 translate-y-1/2 hidden sm:flex h-3 bg-purple-300"></div>
      Revolutionizing 
      </span>How You Use Forms</h1>
      <p className='flex flex-col items-center text-center uppercase'>Empowering creators with <br/> powerfull tools</p>
      <div className="cta flex items-center gap-2 pt-7 relative">
<Link href={'/auth'}>
<Button className='bg-gradient-to-r text-zinc-50 from-purple-900 py-3  h-fit  shadow-inner shadow-purple-500 to-purple-600 px-7 border border-purple-400 rounded-full'>Get Started</Button>

</Link>
<Link href={'/demo'}>
<Button className='bg-gradient-to-r opacity-100 text-zinc-50 from-zinc-900 h-fit py-3 shadow-inner shadow-zinc-700 to-zinc-800 px-7 border border-zinc-700 rounded-full'>Try demo</Button>
</Link>
      </div>
      <p className='text-xs text-zinc-700 pt-4'>No credit card required &middot; Get started for free</p>
    </div>
      <div className="  px-10 relative pt-5 overflow-hidden">
        
        <img src="/hero.png" className=' rounded-xl p-0.5 min-w-[600px] shadow-xl shadow-purple-500/20 border-zinc-800 border bg-zinc-900 z-10  opacity-90 radial-top backdrop-blur-sm' alt="" />
    </div>
      </div>
  )
}

export default Hero