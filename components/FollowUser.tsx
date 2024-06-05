"use client";
import { User } from "@prisma/client";
import Avatar from "./Avatar";
import { useRouter } from "next/navigation";
interface FollowUserProps {
  user: User;
}

export default function FollowUser({ user }: FollowUserProps) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/user/${user.id}`)}
      key={user.id}
      className="flex hover:opacity-90 transition  cursor-pointer items-center gap-4"
    >
      <Avatar imageUrl={user.profileImage as string} />
      <div className="flex flex-col">
        <span className="text-white hover:underline capitalize font-semibold">
          {user.name}
        </span>
        <span className="capitalize text-neutral-400">@{user.username}</span>
      </div>
    </div>
  );
}
