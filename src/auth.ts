import NextAuth from 'next-auth'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '../prisma/db'
export const {auth,handlers,signIn,signOut} = NextAuth({
    providers:[
        GoogleProvider
    ],
    session: {strategy: 'jwt'},
    adapter: PrismaAdapter(prisma),
    callbacks: {
          async session({session,token, }){
            session.user.id =token.sub!
            return session
          }
      },
})