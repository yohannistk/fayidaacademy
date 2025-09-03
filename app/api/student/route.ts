import prisma from "@/app/lib/prisma";
import { StudentSchema } from "@/app/schemas/students";
import { hashPassword } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function GET() {
  const students = await prisma.student.findMany({ omit: { password: true } });
  return NextResponse.json({ students }, { status: 200 });
}
export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const id = body.id;
  if (!id)
    return NextResponse.json(
      { message: "Id is required to delete the student" },
      { status: 400 }
    );
  try {
    await prisma.student.delete({ where: { id } });
  } catch (e) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function PUT() {}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = StudentSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid input", details: z.formatError(parsedData.error) },
        { status: 400 }
      );
    }
    const {
      firstName,
      lastName,
      grandName,
      age,
      schoolName,
      city,
      region,
      email,
      password,
      gradeId,
      referralSource,
    } = parsedData.data;

    const existingStudent = await prisma.student.findUnique({
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

    await prisma.student.create({
      data: {
        firstName,
        lastName,
        grandName,
        age,
        schoolName,
        city,
        region,
        email,
        password: hashedPassword,
        gradeId: gradeId,
        referralSource: referralSource,
      },
    });

    return NextResponse.json(
      { message: `Student registered successfully` },
      { status: 201 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  } finally {
    prisma.$disconnect();
  }
}
