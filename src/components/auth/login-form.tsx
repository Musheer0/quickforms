'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2Icon } from 'lucide-react'
import { signIn } from 'next-auth/react'

export default function LoginForm() {
   const [loading ,setIsloading] = useState(false)
    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50/90 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#2a2a2a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />
      
      <Card className="w-full max-w-md relative z-10 shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="flex justify-center mb-4">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-10 object-cover  w-10"
            />
          </div>
          <CardTitle className="text-2xl font-semibold dark:text-white">Sign in to continue</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Welcome back! Please sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent>

          <Button 
          disabled={loading}
            variant="outline" 
            className="w-full h-12 text-base font-medium bg-white dark:bg-gray-700 hover:bg-gradient-to-br hover:from-blue-50 hover:via-purple-50 hover:to-blue-100 dark:hover:from-gray-600 dark:hover:via-gray-700 dark:hover:to-gray-600 transition-all duration-300 ease-in-out relative group overflow-hidden dark:text-white dark:border-gray-600"
            onClick={async() => {
              setIsloading(true);
              await signIn("google")
            }}
          >
            <span className="relative gap-2 flex items-center justify-center">
              {loading ? 
                         <Loader2Icon className='animate-spin'/>
            :
            <>
            <FcGoogle />Login with Google 
            </>
            }

            </span>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

