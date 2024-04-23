import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

interface Props{
    params:{id:string}
}

export async function GET(request:NextRequest, {params}:Props){
    const product = await prisma.product.findUnique({
        where:{id:parseInt(params.id)}
    })
    if(!product){
        return NextResponse.json("The product with the given id is not found.", {status:404})
    }
    return NextResponse.json(product)
}

export async function DELETE(request:NextRequest, {params}:Props){
    const product = await prisma.product.findUnique({
        where:{id:parseInt(params.id)}
    })
    if(!product){
        return NextResponse.json("The product with the given id is not found.", {status:404})
    }
    await prisma.product.delete({
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
    let product = await prisma.product.findUnique({
        where:{id:parseInt(params.id)}
    })

    if(!product){
        return NextResponse.json("The product with the given id is not found.", {status:404})
    }

    product = await prisma.product.update({
        where:{id:parseInt(params.id)},
        data:{
            name:body.name,
            price:body.price
        }
    })

    return NextResponse.json(product)
}