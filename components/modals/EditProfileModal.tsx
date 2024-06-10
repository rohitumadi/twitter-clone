"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { updateUser, uploadImage } from "@/actions/user-actions";
import useEditProfileModal from "@/hooks/useEditProfileModal";
import { UPLOADTHING_URL } from "@/lib/constants";
import { UpdateUserSchema } from "@/schemas/updateUserSchema";
import Image from "next/image";
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

export default function EditProfileModal() {
  const pathname = usePathname();
  const currentUserId = pathname.slice(6);

  const [previewProfileImage, setPreviewProfileImage] = useState<string>();
  const [profileImage, setProfileImage] = useState<File>();
  const [previewCoverImage, setPreviewCoverImage] = useState<string>();
  const [coverImage, setCoverImage] = useState<File>();
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

  useEffect(() => {
    async function fetchUser() {
      const data = await fetch(`/api/user/${currentUserId}`);
      const { user } = await data.json();
      console.log(data);
      if (data.ok) {
        setPreviewProfileImage(user.profileImage);
        setPreviewCoverImage(user.coverImage);
        form.reset({
          name: user.name,
          username: user.username,
          bio: user.bio,
        });
      }
    }

    if (editProfileModal.isOpen && currentUserId) fetchUser();
  }, [currentUserId]);
  useEffect(() => {
    if (!editProfileModal.isOpen) {
      setPreviewProfileImage("");
      setPreviewCoverImage("");
    }
  }, [editProfileModal.isOpen]);

  const onChange = (open: boolean) => {
    if (!open) {
      editProfileModal.onClose();
    }
  };
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setProfileImage(file);
    setPreviewProfileImage(URL.createObjectURL(file));
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setCoverImage(file);
    setPreviewCoverImage(URL.createObjectURL(file));
  };

  const onSubmit = async (values: z.infer<typeof UpdateUserSchema>) => {
    setError("");

    const imageData = new FormData();
    let profileImageUrl: string | undefined;
    let coverImageUrl: string | undefined;
    startTransition(async () => {
      if (profileImage) {
        imageData.append("profileImage", profileImage);
        const { data } = await uploadImage(imageData, "profileImage");
        profileImageUrl = UPLOADTHING_URL + data?.key;
      }

      if (coverImage) {
        imageData.append("coverImage", coverImage);
        const { data } = await uploadImage(imageData, "coverImage");
        coverImageUrl = UPLOADTHING_URL + data?.key;
      }
      const data = await updateUser(values, profileImageUrl, coverImageUrl);
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
          className="flex flex-col overflow-y-auto gap-4 text-white mt-8"
        >
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <Input
                    id="coverImage"
                    type="file"
                    {...rest}
                    onChange={handleCoverImageChange}
                    disabled={isPending}
                  />
                </FormControl>
                {previewCoverImage && (
                  <div className="relative aspect-video">
                    <Image
                      src={previewCoverImage}
                      alt="Cover Image Preview"
                      fill
                      className="mt-2  object-cover"
                    />
                  </div>
                )}

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profileImage"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>Profile Image </FormLabel>
                <FormControl>
                  <Input
                    id="profileImage"
                    type="file"
                    onChange={handleProfileImageChange}
                    {...rest}
                    disabled={isPending}
                  />
                </FormControl>
                {previewProfileImage && (
                  <div className="relative aspect-square">
                    <Image
                      src={previewProfileImage}
                      alt="Image Preview"
                      fill
                      className="mt-2 rounded-full  object-cover"
                    />
                  </div>
                )}

                <FormMessage />
              </FormItem>
            )}
          />

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
