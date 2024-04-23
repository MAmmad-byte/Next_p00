import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export async function GET(request: NextRequest){
    const users = await prisma.user.findMany();
    if(!users){
        return NextResponse.json("No users found.")    
    }
    return NextResponse.json(users)
}


export async function POST(request: NextRequest){
    const body = await request.json();
    const validate = schema.safeParse(body)
    if(!validate.success){
        return NextResponse.json(validate.error.errors, {status:400})
    }
    let user = await prisma.user.findUnique({
        where:{email:body.email}
    })
    if(user){
        return NextResponse.json("email is already exist.", {status:400})
    }
    user = await prisma.user.create({
    data:{
        name:body.name,
        email:body.email
    }
    })
    return NextResponse.json(user)
}