"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TaskForm() {
  const router = useRouter();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // console.log("Este es el valor de params.id: " + params.id);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/tasks/${params.id}`) //peticion al backend para traer los datos titulo y descripcion por el metodo GET tasks
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error al cargar la tarea solicitada.");
          }
          return res.json(); // ✅ AQUÍ
        })
        .then((data) => {
          // data es mi database
          setTitle(data.titleTask); // por eso data.{nombre-columna-db}
          setDescription(data.descriptionTask);
        })
        .catch((error) => {
          console.log(error);
          setTitle("");
          setDescription("");
        });
    }
  }, [params.id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      // si existe el params va a hacer una peticion PUT
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    } else {
      // si no existe params entonces va a hacer una peticion POST
      try {
        if (!title || !description) {
          return alert("Por favor llena todos los campos");
        }

        const res = await fetch("/api/tasks", {
          method: "POST",
          body: JSON.stringify({ title, description }),
          headers: {
            "Content-Type": "application/json",
          },
        }); //peticion hacia el backend

        const data = await res.json();
        console.log(data);
      } catch (error) {
        return alert("Error al crear la tarea");
      }
    }
    router.refresh();
    router.push("/");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        action=""
        className="bg-slate-800 p-10 lg:w-1/4 md:w-1/2 rounded-2xl"
        onSubmit={onSubmit}
      >
        <label htmlFor="title" className="font-bold text-sm">
          Titulo de la tarea
        </label>
        <input
          id="title"
          placeholder="Titulo"
          type="text"
          required
          className="border bg-slate-50 text-black border-gray-400 p-2 mb-4 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description" className="font-bold text-sm">
          Descripcion de la tarea
        </label>
        <textarea
          className="border bg-slate-50 text-black border-gray-400 p-2 mb-4 w-full"
          placeholder="Describe tu tarea"
          id="description"
          required
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="buttons flex justify-between">
          <button
            id="btnSubmit"
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-900
             text-white font-semibold
             py-2 px-4 rounded
             shadow-md hover:shadow-lg
             transition-all duration-200 ease-in-out"
          >
            {params.id ? "Update" : "Send"}
          </button>

          {params.id && ( //cuando params.id exista entonces quiere decir que podemos actualizar o eliminar tareas
            <button
              id="btnDelete"
              type="button"
              className="bg-red-500 hover:bg-red-700 active:bg-red-900
             text-white font-semibold
             py-2 px-4 rounded
             shadow-md hover:shadow-lg
             transition-all duration-200 ease-in-out"
              onClick={async () => {
                const res = await fetch(`/api/tasks/${params.id}`, {
                  method: "DELETE",
                });
                const data = await res.json();
                router.refresh();
                router.push("/");
              }}
            >
              Delete
            </button> // pero como puedo hacerle tambien para que el boton con el id btnSubmit cambie el texto por actualizar en ves de crear?
          )}
        </div>
      </form>
    </div>
  );
}
