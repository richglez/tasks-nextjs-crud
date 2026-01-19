import Link from "next/link";

function NotFound() {
  return (
    <section className="flex h-[calc(100vh-7rem)] justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-1">Not Found</h1>
        <Link
          className="text-slate-400 text-xl hover:underline hover:text-slate-500 text-shadow-2xs"
          href={"/"}
        >
          Volver al inicio
        </Link>
        
      </div>
    </section>
  );
}

export default NotFound;
