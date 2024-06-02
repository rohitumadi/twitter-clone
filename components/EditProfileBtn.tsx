"use client";
import useEditProfileModal from "@/hooks/useEditProfileModal";
import { Button } from "./ui/button";

export default function EditProfileBtn() {
  const editProfileModal = useEditProfileModal();
  return (
    <Button
      onClick={editProfileModal.onOpen}
      variant={"secondary"}
      className="bg-white rounded-full text-black"
    >
      Edit Profile
    </Button>
  );
}
