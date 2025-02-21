import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id; // Obtén el ID de los parámetros de la ruta

        if (!id) {
            return NextResponse.json({ error: "ID de usuario no proporcionado" }, { status: 400 });
        }

        const deletedUser = await prisma.user.delete({
            where: { id: parseInt(id) }, // Convierte a entero
        });

        return NextResponse.json({ message: "Usuario eliminado", deletedUser }, { status: 200 }); // Status 200 OK
    } catch (error) {
        console.error("Error al eliminar usuario:", error); // Log para depuración
        return NextResponse.json({ error: "Error al eliminar el usuario" }, { status: 500 }); // Status 500 para errores del servidor
    }
}