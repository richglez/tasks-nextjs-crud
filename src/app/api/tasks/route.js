import { NextResponse } from "next/server";
import { prisma } from "@/app/libs/prisma";

export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching tasks" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const { title, description } = await request.json();
    const newTask = await prisma.task.create({
      data: {
        titleTask: title,
        descriptionTask: description,
      },
    });
    return NextResponse.json(newTask);
  } catch (error) {return NextResponse.json(
      { error: "Server Error at creating new task" },
      { status: 500 },
    );
  }
}

export function PUT() {
  return NextResponse.json("Actualizando tareas!");
}

export function DELETE() {
  return NextResponse.json("Eliminando tareas!");
}
