"use client";

import useLoginModal from "@/hooks/useLoginModal";
import { BiLogIn } from "react-icons/bi";

export default function SignInBtn() {
  const logInModal = useLoginModal();
  const handleOpenLogInModal = () => {
    logInModal.onOpen();
  };
  return (
    <div>
      <button
        onClick={handleOpenLogInModal}
        className="rounded-full lg:hidden  h-14 w-14  hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer p-4"
      >
        <BiLogIn size={28} color="white" />
      </button>
      <button
        onClick={handleOpenLogInModal}
        className="hidden lg:flex gap-4 items-center rounded-full    hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer p-4"
      >
        <BiLogIn size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">Login</p>
      </button>
    </div>
  );
}
