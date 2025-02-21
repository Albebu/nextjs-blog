import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
