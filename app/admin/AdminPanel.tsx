import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import User from './User'

export default function AdminPanel() {

    const { data: session, status } = useSession();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;  // Si la sesión está cargando, no hacemos nada
    if (!session || session?.user?.email !== "alexbelbui@campus.monlau.com") {
      signIn();  // Redirige al login si no es el usuario adecuado
    }
  }, [session, status]);

  useEffect(() => {
    async function fetchUsers() {
        const response = await fetch(`/api/users`)
        if(!response.ok) throw new Error ("Error al obtener los usuarios");

        const users = await response.json();
        setUsers(users);
    }
    fetchUsers();
    setLoading(false);
  }, [])

  if(loading) return <div>Cargando</div>

    return(
        <div>
            {!loading &&
                users.map((user) => (
                    <User key={user.id} user={user}/>
                ))
            }
        </div>
    )
}