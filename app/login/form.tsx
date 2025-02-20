"use client";

import { FormEvent } from "react";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";

export default function Form() {
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);

        const response = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        })

        console.log({response});

        if(!response?.error) {
            router.push('/');
            router.refresh();
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="email" type="email" placeholder="Email" required />
                <input name="password" type="password" placeholder="Contraseña" required />
                <button type="submit">Iniciar sesión</button>
            </form>

        </div>
    );
}
