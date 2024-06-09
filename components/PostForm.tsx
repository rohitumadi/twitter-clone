"use client";
import { User } from "@prisma/client";
import Avatar from "./Avatar";
import { Button } from "./ui/button";
import * as z from "zod";
import { FaImage } from "react-icons/fa6";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState, useTransition } from "react";
import { PostSchema } from "@/schemas/PostSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import Image from "next/image";
import { createPost, uploadImage } from "@/actions/user-actions";
import { UPLOADTHING_URL } from "@/lib/constants";
import toast from "react-hot-toast";

interface PostFormProps {
  currentUser: User;
}
export default function PostForm({ currentUser }: PostFormProps) {
  const [postImage, setPostImage] = useState<File | null>();
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const [postImagePreview, setPostImagePreview] = useState<string>();
  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      post: "",
    },
  });
  const handlePostImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setPostImage(file);
    setPostImagePreview(URL.createObjectURL(file));
  };
  const onSubmit = async (values: z.infer<typeof PostSchema>) => {
    setError("");
    const imageData = new FormData();
    let postImageUrl: string | undefined;
    startTransition(async () => {
      if (postImage) {
        imageData.append("postImage", postImage);
        const { data } = await uploadImage(imageData, "postImage");
        postImageUrl = UPLOADTHING_URL + data?.key;
      }
      await createPost(values.post, postImageUrl);
    });
    form.reset();
    toast.success("Tweet created");
    setPostImage(null);
    setPostImagePreview("");
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="p-4 gap-4 h-40  flex border-b-[1px] border-neutral-800">
          <div className="flex flex-col gap-4 items-center">
            <Avatar imageUrl={currentUser?.profileImage as string} />

            <FormField
              control={form.control}
              name="postImage"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormControl>
                    <Label htmlFor="postImage">
                      <Input
                        onChange={handlePostImageChange}
                        id="postImage"
                        className="hidden"
                        {...rest}
                        type="file"
                      />
                      <FaImage className="text-sky-500 cursor-pointer" />
                    </Label>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="post"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <textarea
                      {...field}
                      maxLength={200}
                      placeholder="What's happening?"
                      className="w-full resize-none bg-transparent outline-none text-white text-lg placeholder-neutral-500"
                    ></textarea>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-red-500">{error}</p>}

            {postImagePreview && (
              <div className="relative aspect-square ">
                <Image
                  src={postImagePreview}
                  alt="post image"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <div className="self-end">
            <Button
              type="submit"
              className="bg-sky-500 text-white hover:bg-sky-600 rounded-full"
              variant="secondary"
            >
              Tweet
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
