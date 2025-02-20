import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";

interface User {
  name: string;
  firstSurname: string;
  secondSurname?: string;
  email: string;
  password: string;
  phone: string;
}

export async function POST(request: Request) {
  try {
    const { 
        name, 
        firstSurname, 
        secondSurname, 
        email, 
        password, 
        phone 
    } = await request.json();

    const user: User = {
        name: name,
        firstSurname: firstSurname,
        secondSurname: secondSurname,
        email: email,
        password: await hash(password, 10),
        phone: phone,
    }

    await prisma.user.create({
        data: user
    });
  } catch (e) {
    console.error("Error: ", e);
  }
  return NextResponse.json({ message: "OK" });
}
