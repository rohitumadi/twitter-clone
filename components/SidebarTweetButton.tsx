import { FaFeather } from "react-icons/fa";

export default function SidebarTweetButton() {
  return (
    <>
      <button className="lg:hidden bg-sky-500 hover:bg-sky-600 p-4 rounded-full">
        <FaFeather size={24} color="white" />
      </button>
      <button className="hidden px-4 py-2 text-white lg:block bg-sky-500 hover:bg-sky-600 w-full rounded-full">
        Tweet
      </button>
    </>
  );
}
