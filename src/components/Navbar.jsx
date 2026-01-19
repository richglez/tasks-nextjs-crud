import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-slate-900">
      <div className="container mx-auto flex justify-between items-center py-2">
        <h3 className="font-bold text-3xl">
          <Link href={"/"}>NextjsCRUD</Link>
        </h3>
        <ul className="flex gap-3 text-lg font-bold text-slate-300">
          <li className="hover:text-slate-400 hover:underline">
            <Link href={"/new"}>New</Link>
          </li>
          <li className="hover:text-slate-400 hover:underline">
            <Link href={"/about"}>About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
