import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import User from "./User";  // Asumo que aquí defines la interfaz `User`

export default function AdminPanel() {
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            signIn();
        }
    }, [session, status]);

    useEffect(() => {
        if (status === "loading" || !session?.user?.email) return;

        async function fetchUser() {
            try {
                const response = await fetch(`/api/users/${(session?.user?.email)}`, {
                    method: "GET",
                });

                if (!response.ok) throw new Error("Error al obtener el usuario");

                const user: User = await response.json();
                console.log("Usuario obtenido:", user);
                setUserData(user);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [session, status]);

    if (loading) return <div>Cargando...</div>;

    return (
        <div>
            {userData ? <User user={userData} /> : <div>No se encontró usuario.</div>}
        </div>
    );
}
