"use client";

import useLoginModal from "@/hooks/useLoginModal";
import * as z from "zod";
import Modal from "../Modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import useRegisterModal from "@/hooks/useRegisterModal";
import { LoginSchema } from "@/schemas/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginByCredentials } from "@/actions/auth-actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import toast from "react-hot-toast";

export default function LoginModal() {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError("");
    startTransition(async () => {
      const data = await loginByCredentials(values);
      if (data?.error) {
        setError(data?.error);
      } else {
        loginModal.onClose();
        toast.success("Logged in");
      }
    });
  }

  const onChange = (open: boolean) => {
    if (!open) {
      loginModal.onClose();
    }
  };

  const onToggle = () => {
    registerModal.onOpen();
    loginModal.onClose();
  };
  return (
    <Modal title="Login" isOpen={loginModal.isOpen} onChange={onChange}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 text-white"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="hacker@you@example.com"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} disabled={isPending} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {error && <p className="text-red-500">{error}</p>}

          <Button
            type="submit"
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
        </form>
      </Form>
    </Modal>
  );
}
