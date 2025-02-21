import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
) {
    try {
        const users = await prisma.user.findMany();
        
        if(!users) return NextResponse.json(
            { error: "Usuarios no encontrados"},
            { status: 404 },
        )

        console.log(users)
        return NextResponse.json(users);
    } catch (e) {
        console.error("Error: ", e)
        return NextResponse.json(
            { error: "Error obteniendo los usuaros"},
            { status: 500 },
        )
    }
}