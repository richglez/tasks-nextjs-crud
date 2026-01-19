import { NextResponse } from "next/server";
import { prisma } from "@/app/libs/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const task = await prisma.task.findUnique({
      where: {
        id: Number(id), //params.id viene como string
      },
    });

    if (!task) {
      return NextResponse.json(
        { error: "Tarea no encontrada" },
        { status: 404 }
      );
    }
    // de cualquier manera :
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error interno del servidor",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const data = await request.json();

  const taskUpdated = await prisma.task.update({
    where: {
      id: Number(id),
    },
    data: {
      titleTask: data.title,
      descriptionTask: data.description,
    },
  });

  return NextResponse.json(taskUpdated);
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const taskRemoved = await prisma.task.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(taskRemoved);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error interno del servidor",
      },
      { status: 500 }
    );
  }
}
