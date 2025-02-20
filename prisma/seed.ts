import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();


async function main() {
  console.log("🌱 Iniciando seeder...");

    const hashedPassword = await bcrypt.hash('1234', 10);

  // Crear 20 usuarios dinámicos
  const usersData = [];
  for (let i = 1; i <= 20; i++) {
    usersData.push({
      name: `Usuario ${i}`,
      firstSurname: `Apellido${i}`,
      secondSurname: `SegundoApellido${i}`,
      email: `usuario${i}@example.com`,
      password: hashedPassword,
      phone: `12345678${i}`,
    });
  }

  // Insertar usuarios en la base de datos
  await prisma.user.createMany({ data: usersData });

  // Obtener los usuarios creados
  const users = await prisma.user.findMany();

  // Crear 20 posts asignando un usuario aleatorio a cada uno
  const postsData = [];
  for (let i = 1; i <= 20; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)]; // Usuario aleatorio

    postsData.push({
      title: `Post ${i}`,
      description: `Descripción del post ${i}`,
      creationDate: new Date(),
      userId: randomUser.id, // Relación con usuario
    });
  }

  // Insertar posts en la base de datos
  await prisma.post.createMany({ data: postsData });

  // Obtener los posts creados
  const posts = await prisma.post.findMany();

  // Crear 20 comentarios asignando un usuario y un post aleatorio
  const commentsData = [];
  for (let i = 1; i <= 20; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomPost = posts[Math.floor(Math.random() * posts.length)];

    commentsData.push({
      text: `Comentario ${i} sobre el post ${randomPost.id}`,
      userId: randomUser.id,
      postId: randomPost.id,
    });
  }

  // Insertar comentarios en la base de datos
  await prisma.comment.createMany({ data: commentsData });

  console.log("✅ Seeder completado con éxito");
}

// Ejecutar el seeder
main()
  .catch((e) => {
    console.error("❌ Error en el seeder", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
