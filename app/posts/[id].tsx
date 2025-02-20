import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function PostPage({ post }: { post: any }) {
  if (!post) return <h1>Post no encontrado</h1>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <p>
        <strong>Autor:</strong> {post.user.name}
      </p>
      <h3>Comentarios:</h3>
      <ul>
        {post.comments.map((comment: any) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
}

// Recupera el post según la URL
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(params?.id) },
    include: { user: true, comments: true },
  });

  return { props: { post } };
};
