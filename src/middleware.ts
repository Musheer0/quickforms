import { NextResponse } from "next/server";
import { auth } from "./auth";
export const authRoutes = [
    '/auth'
]
export default auth((req)=>{
     const {nextUrl} = req
     const isLoggedIn = !!req.auth
     if(isLoggedIn){
        if(authRoutes.includes(nextUrl.pathname)){
            return NextResponse.redirect(new URL('/', req.nextUrl));  
        }
     }
      return NextResponse.next()
})