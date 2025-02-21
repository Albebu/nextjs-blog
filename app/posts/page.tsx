import { prisma } from "@/lib/prisma";
import PostCard from "./PostCard";

export default async function Posts() {
  const posts = await prisma.post.findMany({
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
});

  
  console.log(posts)

  return (
    <div>
      <h1>Posts</h1>
      <ul className="flex flex-col justify-center items-center">
        {posts.map((post) => (
          <PostCard key={post.id} post={post}/>
        ))}
      </ul>
    </div>
  );
}
