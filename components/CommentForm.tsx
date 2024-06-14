"use client";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Avatar from "./Avatar";
import { CommentSchema } from "@/schemas/CommentSchema";
import { useState, useTransition } from "react";
import { User } from "@prisma/client";
import { commentPost } from "@/actions/user-actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface CommentFormProps {
  currentUser: User;
  postId: string;
}

export default function CommentForm({ postId, currentUser }: CommentFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      body: "",
    },
  });
  const [error, setError] = useState<string | undefined>("");
  const onSubmit = (data: z.infer<typeof CommentSchema>) => {
    setError("");
    startTransition(async () => {
      await commentPost(postId, data.body);
    });
    form.reset();
    router.refresh();
    toast.success("Comment created");
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="p-4 gap-4 h-30  flex border-b-[1px] border-neutral-800">
          <div className="flex flex-col gap-4 items-center">
            <Avatar imageUrl={currentUser?.profileImage as string} />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      {...field}
                      maxLength={200}
                      placeholder="Write a comment..."
                      className="w-full resize-none bg-transparent outline-none text-white text-lg placeholder-neutral-500"
                    ></textarea>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <div className="self-end">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-sky-500  text-white hover:bg-sky-600 rounded-full"
              variant="secondary"
            >
              Comment
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
