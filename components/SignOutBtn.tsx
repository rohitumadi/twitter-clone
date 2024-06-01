import { logout } from "@/actions/auth-actions";
import { BiLogOut } from "react-icons/bi";

export default function SignOutBtn() {
  return (
    <form action={logout}>
      <button className="rounded-full lg:hidden  h-14 w-14  hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer p-4">
        <BiLogOut size={28} color="white" />
      </button>
      <button className="hidden lg:flex gap-4 items-center rounded-full    hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer p-4">
        <BiLogOut size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">Logout</p>
      </button>
    </form>
  );
}
