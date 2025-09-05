import prisma from "@/lib/prisma";
import { AdminSchema } from "@/app/schemas/admin";
import { hashPassword } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET() {
  const students = await prisma.users.findMany({
    omit: { password: true },
    include: { admin: true },
  });
  return NextResponse.json({ students }, { status: 200 });
}
export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const id = body.id;
  if (!id)
    return NextResponse.json(
      { error: "Id is required to delete the student" },
      { status: 400 }
    );
  try {
    const user = await prisma.users.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.users.delete({ where: { id } });
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function PUT() {}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = AdminSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid input", details: z.formatError(parsedData.error) },
        { status: 400 }
      );
    }
    const { firstName, lastName, email, password } = parsedData.data;

    const existingStudent = await prisma.users.findUnique({
      where: { email },
    });
    if (existingStudent) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = hashPassword(password);
    if (!hashedPassword) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }

    const user = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });
    await prisma.admins.create({
      data: {
        userId: user.id,
        firstName,
        lastName,
      },
    });

    return NextResponse.json(
      { message: `Admin registered successfully` },
      { status: 201 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  } finally {
    prisma.$disconnect();
  }
}
