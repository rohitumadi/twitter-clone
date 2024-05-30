"use client";

import Modal from "../Modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { useState } from "react";
import register from "@/actions/register";
import toast from "react-hot-toast";

export default function RegisterModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const onChange = (open: boolean) => {
    if (!open) {
      registerModal.onClose();
    }
  };
  const onToggle = () => {
    loginModal.onOpen();
    registerModal.onClose();
  };
  const onSubmit = async (formData: any) => {
    await register(formData);
    toast.success("Account created");
    registerModal.onClose();
  };

  return (
    <Modal
      title="Create an account"
      isOpen={registerModal.isOpen}
      onChange={onChange}
    >
      <form action={onSubmit} className="flex flex-col gap-4 text-white mt-8">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          type="name"
        />
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          type="username"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <Button
          onClick={onSubmit}
          type="submit"
          className="w-full mt-4 rounded-full bg-white text-black hover:bg-neutral-400"
        >
          Register
        </Button>
        <div className="text-neutral-500 text-center mt-2 font-light">
          <span
            onClick={onToggle}
            className="text-white cursor-pointer hover:underline"
          >
            Already have an account?
          </span>
        </div>
      </form>
    </Modal>
  );
}
