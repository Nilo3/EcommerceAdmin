import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs"

import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string }}
) {
    try {
        const { userId } = auth();
        const body = await req.json()

        const { name, value } = body; 

        if(!userId){
            return new NextResponse("Unauthenticated", {status:401})
        }

        if(!name) {
            return new NextResponse("Name is required", {status: 400})
        }

        if(!value) {
            return new NextResponse("Value is required", {status: 400})
        }

        if(!params.storeId) {
            return new NextResponse("Store id is required", {status: 400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId) {
            return new NextResponse("Unauthorize", {status: 403})
        }

        const fragrance = await prismadb.fragrance.create({
            data: {
                name,
                value,
                storeId: params.storeId
            }
        })

        return NextResponse.json(fragrance)
    } catch (error) {
        console.log("[FRAGRANCES_POST]", error);
        return new NextResponse("Internal error", {status: 500})
        
    }
}

export async function GET(
    req: Request,
    { params }: { params: { storeId: string }}
) {
    try {
    
        if(!params.storeId) {
            return new NextResponse("Store id is required", {status: 400})
        }

        const fragrance = await prismadb.fragrance.findMany({
           where: {
            storeId: params.storeId
           }
        })

        return NextResponse.json(fragrance)
    } catch (error) {
        console.log("[FRAGRANCES_GET]", error);
        return new NextResponse("Internal error", {status: 500})
        
    }
}