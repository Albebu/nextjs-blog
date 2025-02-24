import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Params } from "next/dist/server/request/params";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const postId = parseInt(params.id, 10);

  if (isNaN(postId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
      id: true,
      title: true,
      description: true,
      creationDate: true,
      user: {
        select: {
          name: true,
          firstSurname: true,
        },
      },
    },
    })

    if (!post) {
      return NextResponse.json(
        { error: "Post no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Error obteniendo el post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: "ID del post no proporcionado" }, { status: 400 });
        }

        console.log(id);

        const deletedPost = await prisma.post.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: "Post eliminado", deletedPost }, { status: 200 });
    } catch (error) {
        console.error("Error al eliminar el post:", error);
        return NextResponse.json({ error: "Error al eliminar el post" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: "ID del post no proporcionado" }, { status: 400 });
        }
        const updatedPostData = await request.json();

        if (!updatedPostData.title || !updatedPostData.description) {
            return NextResponse.json({ error: "Faltan datos para actualizar el post" }, { status: 400 });
        }
        const updatedPost = await prisma.post.update({
            where: { id: parseInt(id) },
            data: {
                title: updatedPostData.title,
                description: updatedPostData.description
            },
        });

        return NextResponse.json({ message: "Post actualizado", updatedPost }, { status: 200 });
    } catch (error) {
        console.error("Error al actualizar el post:", error);
        return NextResponse.json({ error: "Error al actualizar el post" }, { status: 500 });
    }
}


