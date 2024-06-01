"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { loginByCredentials, register } from "@/actions/auth-actions";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { RegisterSchema } from "@/schemas/authSchema";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import Modal from "../Modal";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export default function RegisterModal() {
  const registerModal = useRegisterModal();
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const loginModal = useLoginModal();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      registerModal.onClose();
    }
  };
  const onToggle = () => {
    loginModal.onOpen();
    registerModal.onClose();
  };
  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    startTransition(async () => {
      const data = await register(values);
      if (data.error) {
        setError(data.error);
      }
    });
    toast.success("Account created");
    await loginByCredentials(values);
    registerModal.onClose();
  };

  return (
    <Modal
      title="Create an account"
      isOpen={registerModal.isOpen}
      onChange={onChange}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 text-white mt-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="hacker" {...field} disabled={isPending} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="hackerAtAnonymous"
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
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
            disabled={isPending}
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
      </Form>
    </Modal>
  );
}
