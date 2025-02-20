import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  console.log(id);

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { user: true, comments: true }, // Relaciona usuario y comentarios
  });

  if (!post) {
    return res.status(404).json({ error: "Post no encontrado" });
  }

  res.status(200).json(post);
}
