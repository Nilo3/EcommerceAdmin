import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET(
    req: Request,
    { params }: { params: { fragranceId: string } }
  ) {
    try {
      if (!params.fragranceId) {
        return new NextResponse("Fragrance id is required", { status: 400 });
      }

      const fragrance = await prismadb.fragrance.findUnique({
        where: {
          id: params.fragranceId,
        },
      });
  
      return NextResponse.json(fragrance);
    } catch (error) {
      console.log("[FRAGRANCE_GET]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
  

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; fragranceId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }

    if (!params.fragranceId) {
      return new NextResponse("Fragrance id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorize", { status: 403 });
    }

    const fragrance = await prismadb.fragrance.updateMany({
      where: {
        id: params.fragranceId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(fragrance);
  } catch (error) {
    console.log("[FRAGRANCE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; fragranceId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.fragranceId) {
      return new NextResponse("Fragrance id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorize", { status: 403 });
    }

    const fragrance = await prismadb.fragrance.deleteMany({
      where: {
        id: params.fragranceId,
      },
    });

    return NextResponse.json(fragrance);
  } catch (error) {
    console.log("[FRAGRANCE_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
