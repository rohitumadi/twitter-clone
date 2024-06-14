import Link from "next/link";
import { FaFeather } from "react-icons/fa";

export default function SidebarTweetButton() {
  return (
    <>
      <Link
        href="/"
        className="lg:hidden flex items-center justify-center bg-sky-500 hover:bg-sky-600 p-3 rounded-full"
      >
        <FaFeather size={24} color="white" />
      </Link>
      <Link
        href="/"
        className="hidden  text-center px-4 py-2 text-white lg:block bg-sky-500 hover:bg-sky-600 w-full rounded-full"
      >
        Tweet
      </Link>
    </>
  );
}
