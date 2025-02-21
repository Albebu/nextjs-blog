// app/admin/page.tsx

'use client'  // Marca este componente como Client Component


import { SessionProvider } from "next-auth/react";
import AdminPanel from "./AdminPanel";

export default function AdminDashboard() {
  

  return (
    <SessionProvider>
        <AdminPanel></AdminPanel>
    </SessionProvider>
  );
}
