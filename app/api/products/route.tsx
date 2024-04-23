import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export async function GET(request:NextRequest){
    const products = await prisma.product.findMany();
    if(products.length === 0){
        return NextResponse.json("No Products found.")
    }
    return NextResponse.json(products)
}

export async function POST(request: NextRequest){

    const body = await request.json();
    const validate = schema.safeParse(body)
    if(!validate.success){
        return NextResponse.json(validate.error.errors, {status:400})
    }

    const product = await prisma.product.create({
        data:{
            name:body.name,
            price:body.price
        }
    })
    return NextResponse.json(product)
}