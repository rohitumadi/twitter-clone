"use client";
import useLoginModal from "@/hooks/useLoginModal";
import { Button } from "./ui/button";
import useRegisterModal from "@/hooks/useRegisterModal";

export default function WelcomeForm() {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const handleOpenLoginModal = () => {
    loginModal.onOpen();
  };

  const handleOpenRegisterModal = () => {
    registerModal.onOpen();
  };
  return (
    <div className="p-4 py-8 text-center border-b-[1px] border-neutral-800">
      <h2 className="text-3xl font-bold text-white">Welcome to Twitter</h2>
      <div className="mt-4 flex gap-4 justify-center">
        <Button
          onClick={handleOpenLoginModal}
          className="bg-sky-500 hover:bg-sky-600 rounded-full"
        >
          Login
        </Button>
        <Button
          onClick={handleOpenRegisterModal}
          variant="secondary"
          className=" rounded-full"
        >
          Register
        </Button>
      </div>
    </div>
  );
}
