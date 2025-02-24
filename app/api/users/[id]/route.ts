import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);

        if (!id) {
            return NextResponse.json({ error: "ID de usuario no proporcionado" }, { status: 400 });
        }

        const deletedUser = await prisma.user.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Usuario eliminado", deletedUser }, { status: 200 });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        return NextResponse.json({ error: "Error al eliminar el usuario" }, { status: 500 });
    }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const userId = parseInt(params.id);

        if (!userId) {
            return NextResponse.json({ error: "ID de usuario no proporcionado" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { posts: true },
        });

        if (!user) {
            return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error obteniendo el usuario:", error);
        return NextResponse.json({ message: "Error al obtener el usuario" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const userId = parseInt(params.id);

        if (!userId) {
            return NextResponse.json({ error: "ID de usuario no proporcionado" }, { status: 400 });
        }

        const body = await request.json();

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name: body.name,
                firstSurname: body.firstSurname,
                secondSurname: body.secondSurname || null,
                email: body.email,
                phone: body.phone,
            },
        });

        return NextResponse.json({ message: "Usuario actualizado", updatedUser }, { status: 200 });
    } catch (error) {
        console.error("Error actualizando el usuario:", error);
        return NextResponse.json({ error: "Error al actualizar el usuario" }, { status: 500 });
    }
}
