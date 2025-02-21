import React from "react";
import '@/app/styles/globals.css';

interface Post {
  id: number;
  title: string;
  description: string;
  creationDate: Date;
  user: {
    name: string;
    firstSurname: string;
  };
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-gray-100 shadow-lg rounded-lg p-4 w-[20%] mb-4">
      <h3 className="text-xl font-semibold">{post.title}</h3>
      <p className="text-gray-600 text-sm">{new Date(post.creationDate).toLocaleDateString()}</p>
      <p className="text-gray-800 mt-2">{post.description}</p>
      <p className="text-gray-500 text-sm mt-4">
        Autor: {post.user.name} {post.user.firstSurname}
      </p>
    </div>
  );
};

export default PostCard;
