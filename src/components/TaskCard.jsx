"use client";
import { useRouter } from "next/navigation";

function TaskCard({ task }) {
  const router = useRouter();

  return (
    <div
      className="bg-slate-900 p-3 mt-5 hover:bg-slate-800 hover:cursor-pointer hover:translate-y-1 duration-500 hover:shadow-lg shadow rounded border border-slate-700"
      onClick={() => {
        router.push("/tasks/edit/" + task.id);
      }}
    >
      <h2 className="font-bold text-2xl mb-2">{task.titleTask}</h2>
      <p>{task.descriptionTask}</p>
      <time dateTime={task.createdAt}>
        {new Date(task.createdAt).toLocaleString()}
      </time>
    </div>
  );
}

export default TaskCard;
