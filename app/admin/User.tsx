import React, { useState } from 'react';

interface User {
    id: number;
    name: string;
    firstSurname: string;
    secondSurname?: string;
    email: string;
    phone: string;
}

interface UserProps {
    user: User;
}

const User: React.FC<UserProps> = ({ user }) => {
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [updatedUser, setUpdatedUser] = useState({
        name: '',
        firstSurname: '',
        secondSurname: '',
        email: '',
        phone: ''
    });

    
    const handleDeleteButton = async () => {
        const userId = user.id;

        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('Usuario eliminado correctamente');
        } else {
            console.error('Error al eliminar el usuario');
        }
    };

    const handleEditButton = () => {
        setEditingUser(user);
        setUpdatedUser({
            name: user.name,
            firstSurname: user.firstSurname,
            secondSurname: user.secondSurname || '',
            email: user.email,
            phone: user.phone
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdateUser = async () => {
        if (!editingUser) return;

        const response = await fetch(`/api/users/${editingUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });

        if (response.ok) {
            console.log('Usuario actualizado correctamente');
            setEditingUser(null);
        } else {
            console.error('Error al actualizar el usuario');
        }
    };

    return (
        <div>
            <p>Nombre: {user.name}</p>
            <p>Apellido 1: {user.firstSurname}</p>
            <p>Apellido 2: {user.secondSurname ? user.secondSurname : 'No tiene'}</p>
            <p>Email: {user.email}</p>
            <p>Teléfono: {user.phone}</p>
            <button onClick={handleDeleteButton} className="bg-red-500 rounded-full p-2">
                Eliminar usuario
            </button>
            <button onClick={handleEditButton} className="bg-blue-500 rounded-full p-2">
                Editar usuario
            </button>

            {editingUser && (
                <div className="modal">
                    <h3>Editar usuario</h3>
                    <label>
                        Nombre:
                        <input type="text" name="name" value={updatedUser.name} onChange={handleChange} />
                    </label>
                    <label>
                        Apellido 1:
                        <input type="text" name="firstSurname" value={updatedUser.firstSurname} onChange={handleChange} />
                    </label>
                    <label>
                        Apellido 2:
                        <input type="text" name="secondSurname" value={updatedUser.secondSurname} onChange={handleChange} />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={updatedUser.email} onChange={handleChange} />
                    </label>
                    <label>
                        Teléfono:
                        <input type="text" name="phone" value={updatedUser.phone} onChange={handleChange} />
                    </label>
                    <button onClick={handleUpdateUser} className="bg-green-500 rounded-full p-2">
                        Guardar cambios
                    </button>
                    <button onClick={() => setEditingUser(null)} className="bg-gray-500 rounded-full p-2">
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
};

export default User;
