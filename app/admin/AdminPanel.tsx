import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AdminPanel() {

    const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;  // Si la sesión está cargando, no hacemos nada
    if (!session || session?.user?.email !== "alexbelbui@campus.monlau.com") {
      signIn();  // Redirige al login si no es el usuario adecuado
    }
  }, [session, status]);
    return(
        <div>
            Private Dashboard
        </div>
    )
}