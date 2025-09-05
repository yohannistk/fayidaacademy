import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const grades = await prisma.grade.findMany();
  return NextResponse.json({ grades }, { status: 200 });
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = body.name;

    if (!name) {
      return NextResponse.json(
        { message: "Please specify name for the grade" },
        { status: 201 }
      );
    }

    const res = await prisma.grade.create({ data: { name } });
    return NextResponse.json(
      { message: `Grade created successfully with name ${name}` },
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
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const id = body.id;
    if (!id)
      return NextResponse.json(
        { message: "Id is required to delete the grade" },
        { status: 400 }
      );
    const grade = await prisma.grade.findUnique({ where: { id } });

    if (!grade)
      return NextResponse.json({ message: "Grade not found" }, { status: 404 });

    const deleted = await prisma.grade.delete({ where: { id } });
    return NextResponse.json(
      { message: `Grade with name ${deleted.name} deleted` },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: `Internal Server Error` },
      { status: 500 }
    );
  }
}
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const name = body.name;
    const id = body.id;
    if (!id)
      return NextResponse.json(
        { message: "id is required to delete the grade" },
        { status: 400 }
      );

    if (!name) {
      return NextResponse.json(
        { message: "Please specify name to update the grade" },
        { status: 201 }
      );
    }

    const grade = await prisma.grade.findUnique({ where: { id } });
    if (!grade)
      return NextResponse.json({ message: "Grade not found" }, { status: 404 });

    await prisma.grade.update({ where: { id }, data: { name } });

    return NextResponse.json(
      { message: `Grade created successfully with name ${name}` },
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
