"use client";

import PostCard from "../PostCard";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener el post");
        }
        const data = await response.json();
        setPost(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>No se encontró el post</div>;

  return (
    <div className="flex justify-center align-center">
      <PostCard post={post}/>
    </div>
  );
}
