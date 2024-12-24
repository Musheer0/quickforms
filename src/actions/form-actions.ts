"use server"

import { auth } from "@/auth"
import prisma from "../../prisma/db";
import { FormData } from "@/stores/use-editor-store";

export const CreateForm = async()=>{
    const session = await auth();
    if(session?.user?.id){
       const form = await prisma.form.create({
        data:{
            userId: session.user.id
        },
        select:{
            id:true
        }
       });
       return {id: form.id}
    }
    else {
        
           return {error:'Un-authorized'}
    }
}
export const GetFormById = async(id:string)=>{
    const session = await auth();
    if(session?.user?.id){
       const form = await prisma.form.findFirst({
        where:{
            id,
        }
       })
       return {form}
    }
    else return {error:'Un-authorized'}
}
export const GetFormUserById = async(id:string)=>{
    const session = await auth();
    if(session?.user?.id){
       const form = await prisma.form.findFirst({
        where:{
            id,
            userId: session.user.id
        }
       })
       return {form}
    }
    else return {error:'Un-authorized'}
}

export const UpdateForm = async(form:FormData)=>{
    const session = await auth();
    if(session?.user?.id){
       const updatedform = await prisma.form.update({
        where:{
            id:form.id,
        },
        data:{
            title: form.title,
            description: form.description,
            data: form.fields
        }
       })
       return {updatedform}
    }
    else return {error:'Un-authorized'}
}
export const getUserForms =async()=>{
    const session = await auth();
    if(session?.user?.id){
    const forms = await prisma.form.findMany({
        where:{
            userId: session.user.id
        },
        select:{
            title: true,
            id:true,
            createdAt: true
        }
    })
    return {forms}
    }
    return {error: 'unauthorized'}
}

export const Deleteform = async(id:string)=>{
    const session = await auth();
    if(session?.user?.id){
       const form = await prisma.form.delete({
        where:{
            id,
        }
       })
       return {form}
    }
    else return {error:'Un-authorized'}
}
export const ToggleLoginRequiredForm = async(id:string, prev:boolean)=>{
    const session = await auth();
    if(session?.user?.id){
        const form = await prisma.form.update({
            where:{
                id,
                LoginRequired: prev,
                userId: session.user.id
            },
            data:{
                LoginRequired: !prev
            },
            select:{
                LoginRequired:true,
                id:true,
                userId: true
            }
        });
        return {form}
    }
    return {error: 'unauthorized'}
}
export const ToggleDisableForm = async(id:string, prev:boolean)=>{
    const session = await auth();
    if(session?.user?.id){
        const form = await prisma.form.update({
            where:{
                id,
                disabled: prev,
                userId: session.user.id
            },
            data:{
                disabled: !prev
            },
            select:{
                disabled:true,
                id:true,
                userId: true
            }
        });
        return {form}
    }
    return {error: 'unauthorized'}
}
export const TogglePublishForm = async(id:string, prev:boolean)=>{
    const session = await auth();
    if(session?.user?.id){
        const form = await prisma.form.update({
            where:{
                id,
                isPublished: prev,
                userId: session.user.id
            },
            data:{
                isPublished: !prev,
                disabled: false
            },
            select:{
                isPublished:true,
                id:true,
                userId: true
            }
        });
        return {form}
    }
    return {error: 'unauthorized'}
}