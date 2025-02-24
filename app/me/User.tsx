import React, { useState } from 'react';

interface User {
    id: number;
    name: string;
    firstSurname: string;
    secondSurname?: string;
    email: string;
    phone: string;
    posts: Post[];
}

interface Post {
    id: number,
    title: string,
    description: string,
    creationDate: Date,
    userId: number,
}

interface UserProps {
    user: User
}

const User: React.FC<UserProps> = ({user}) => {
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [updatedPost, setUpdatedPost] = useState<{ title: string, description: string }>({
        title: '',
        description: ''
    });

    // Función para manejar la edición del post
    const handleEditButton = (postId: number) => {
        const postToEdit = user.posts.find(post => post.id === postId);
        if (postToEdit) {
            setEditingPost(postToEdit); // Establece el post a editar
            setUpdatedPost({ title: postToEdit.title, description: postToEdit.description });
        }
    };

    // Función para manejar los cambios en el formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdatedPost(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Función para manejar el envío del formulario de edición
    const handleUpdatePost = async () => {
        if (!editingPost) return;

        const response = await fetch(`/api/posts/${editingPost.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPost), // Envía los datos actualizados
        });

        if (response.ok) {
            console.log("Post actualizado correctamente");
            // Actualiza la lista de posts
            const updatedUserPosts = user.posts.map(post =>
                post.id === editingPost.id ? { ...post, ...updatedPost } : post
            );
            // Actualiza el estado con los posts actualizados
            // Puedes agregar aquí la lógica para actualizar el estado global o pasar los datos actualizados de vuelta al servidor
        } else {
            console.error("Error al actualizar el post");
        }
        setEditingPost(null); // Cierra el formulario de edición
    };

    const handleButton = async (postId: number) => {
        const response = await fetch(`api/posts/${postId}`, {
            method: "DELETE"
        });

        if (response.ok) {
            console.log("Post eliminado correctamente");
        } else {
            console.error("Error al eliminar el post");
        }
    };

    return (
        <div>
            Nombre: {user.name}
            Apellido 1: {user.firstSurname},
            Apellido 2: {user.secondSurname ? user.secondSurname : 'No tiene'}
            Email: {user.email}
            Teléfono: {user.phone}

            {user.posts.map((post) => (
                <div key={post.id}>
                    Título: {post.title}
                    Descripción: {post.description}
                    Fecha de creación: {post.creationDate.toString()}
                    Creador: {post.userId}
                    <button
                        onClick={() => handleButton(post.id)}
                        className="bg-red-500 rounded-full p-2"
                    >
                        Borrar post
                    </button>
                    <button
                        onClick={() => handleEditButton(post.id)}
                        className="bg-blue-500 rounded-full p-2"
                    >
                        Editar post
                    </button>
                </div>
            ))}

            {editingPost && (
                <div className="modal">
                    <h3>Editar post</h3>
                    <div>
                        <label>
                            Título:
                            <input
                                type="text"
                                name="title"
                                value={updatedPost.title}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Descripción:
                            <textarea
                                name="description"
                                value={updatedPost.description}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <button onClick={handleUpdatePost} className="bg-green-500 rounded-full p-2">
                        Guardar cambios
                    </button>
                    <button onClick={() => setEditingPost(null)} className="bg-gray-500 rounded-full p-2">
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
}

export default User;
