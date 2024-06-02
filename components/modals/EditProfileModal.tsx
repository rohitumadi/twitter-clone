"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { fetchUserById, updateUser } from "@/actions/user-actions";
import useEditProfileModal from "@/hooks/useEditProfileModal";
import { UpdateUserSchema } from "@/schemas/updateUserSchema";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
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
import { User } from "@prisma/client";

export default function EditProfileModal() {
  const pathname = usePathname();
  const currentUserId = pathname.slice(6);

  const [user, setUser] = useState<User>();
  useEffect(() => {
    async function fetchUser() {
      console.log(currentUserId);
      const data = await fetchUserById(currentUserId);
      if (data) {
        setUser(data?.user as User);
        form.reset({
          name: data?.user?.name as string,
          username: data?.user?.username as string,
          bio: data?.user?.bio as string,
        });
      }
    }

    if (currentUserId) fetchUser();
  }, [currentUserId]);

  const editProfileModal = useEditProfileModal();
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: "",
      username: "",
      bio: "",
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      editProfileModal.onClose();
    }
  };

  const onSubmit = async (values: z.infer<typeof UpdateUserSchema>) => {
    setError("");
    startTransition(async () => {
      const data = await updateUser(values);
      if (data.error) {
        setError(data.error);
      }
    });
    toast.success("Profile updated");
    editProfileModal.onClose();
  };

  return (
    <Modal
      title="Update Profile"
      isOpen={editProfileModal.isOpen}
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
                  <Input {...field} disabled={isPending} />
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
                  <Input {...field} disabled={isPending} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} />
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
            Submit
          </Button>
        </form>
      </Form>
    </Modal>
  );
}
