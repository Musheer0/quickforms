"use client"
import React from 'react'
import Image from 'next/image'

const About = () => {
  return (
    <div className='flex flex-col py-5 min-h-screen items-center justify-center  relative'>
            
            <div 
        className="absolute opacity-10 inset-0 bg-[linear-gradient(to_right,#a855f7_1px,transparent_1px),linear-gradient(to_bottom,#a855f7_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#2a2a2a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />
   
     <Image src={'/logo.png'} width={200}  height={200} alt='logo'/>
        <p hidden>about section</p>
        <h2 className='text-[6vw] relative sm:text-[5vw] text-center'>Redefining Forms, Simplifying Life</h2>
        <p className='text-sm text-zinc-300 relative text-center max-w-4xl mx-auto'>
            At  QuickForms, 
            we believe in empowering everyone to 
            create with ease.
             Our form builder combines 
             simplicity with powerful
              customization, enabling users of
               all skill levels to design, customize,
                and print forms effortlessly.
                 Whether you&apos;re creating for
                  personal, professional, or organizational needs, 
                  our tools ensure your vision comes 
                  to life with precision and clarity</p>
    </div>
  )
}

export default About