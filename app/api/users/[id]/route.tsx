import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
interface Props{
    params:{id:string}
}
export async function GET (request:NextRequest, {params}:Props){
    const user = await prisma.user.findUnique({
        where:{id:parseInt(params.id)}
    })
    if(!user){
        return NextResponse.json({error:"User with the given id is not found."}, {status:404})
    }
    return NextResponse.json(user)
}

export async function DELETE(request: NextRequest, {params}:Props){

    let user = await prisma.user.findUnique({
        where:{id:parseInt(params.id)}
    })
    if(!user){
        return NextResponse.json("The user with the given id is not exist.", {status:404})
    }
    await prisma.user.delete({
        where:{id:parseInt(params.id)}
    })
    return NextResponse.json({})
}

export async function PUT(request:NextRequest, {params}:Props){
    const body = await request.json();
    const validate = schema.safeParse(body);
    if(!validate.success){
        return NextResponse.json(validate.error.errors, {status:400})
    }
    let user = await prisma.user.findUnique({
        where:{id: parseInt(params.id)}
    })
    if(!user){
        return NextResponse.json("The user with the given id is not found.")
    }
    user = await prisma.user.update({
        where:{id:parseInt(params.id)},
        data:{
            name:body.name,
            email:body.email
        }
    })
    return NextResponse.json(user)
}