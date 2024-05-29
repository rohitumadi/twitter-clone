"use client";

import useLoginModal from "@/hooks/useLoginModal";
import Modal from "../Modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import useRegisterModal from "@/hooks/useRegisterModal";

export default function LoginModal() {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (open: boolean) => {
    if (!open) {
      loginModal.onClose();
    }
  };
  const onSubmit = () => {
    loginModal.onClose();
  };
  const onToggle = () => {
    registerModal.onOpen();
    loginModal.onClose();
  };
  return (
    <Modal title="Login" isOpen={loginModal.isOpen} onChange={onChange}>
      <div className="flex flex-col gap-4 text-white">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <Button
          onClick={onSubmit}
          className="w-full mt-4 rounded-full bg-white text-black hover:bg-neutral-400"
        >
          Login
        </Button>
        <div className="text-neutral-500 text-center mt-2 font-light">
          <span
            onClick={onToggle}
            className="text-white cursor-pointer hover:underline"
          >
            Don't have an account?
          </span>
        </div>
      </div>
    </Modal>
  );
}
