"use client";

import { FormEvent } from "react";

export default function Form() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
        name: formData.get("name"),
        firstSurname: formData.get("firstSurname"),
        secondSurname: formData.get("secondSurname"),
        phone: formData.get("phone"),
      }),
    });
    console.log({ response });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        name="email"
        className="border border-black"
        type="email"
        placeholder="Email"
        required
      />
      <input
        name="password"
        className="border border-black"
        type="password"
        placeholder="Password"
        required
      />
      <input name="name" type="text" placeholder="Nombre" required />
      <input
        name="firstSurname"
        type="text"
        placeholder="Primer apellido"
        required
      />
      <input name="secondSurname" type="text" placeholder="Segundo apellido" />
      <input
        name="phone"
        type="phone"
        placeholder="Numero de telefono"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
}
