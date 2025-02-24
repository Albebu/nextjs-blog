'use client'


import { SessionProvider } from "next-auth/react";
import Panel from "./panel";

export default function Me() {
  

  return (
    <SessionProvider>
        <Panel></Panel>
    </SessionProvider>
  );
}
