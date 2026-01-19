import { prisma } from "./libs/prisma";
import TaskCard from "@/components/TaskCard";


async function loadTasks() {
  return await prisma.task.findMany();
}

async function HomePage() {
  const tasks = await loadTasks();

  return (
    <section className="container mx-auto">

      <div className="grid grid-cols-3 gap-5">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id}></TaskCard>
        ))}
      </div>
    </section>
  );
}

export default HomePage;
