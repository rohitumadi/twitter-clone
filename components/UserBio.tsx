"use client";
import { User } from "@prisma/client";
import { format } from "date-fns";
import { BiCalendar } from "react-icons/bi";
import EditProfileBtn from "./EditProfileBtn";
import { Button } from "./ui/button";
import FollowToggleBtn from "./FollowToggleBtn";
interface UserBioProps {
  user: User;
  followersCount: number;
  currentUser?: User;
}

export default function UserBio({
  user,
  currentUser,
  followersCount,
}: UserBioProps) {
  const createdAt = format(new Date(user.createdAt), "MMMM yyyy");
  const isFollowing = currentUser?.followingIds?.includes(user.id);

  return (
    <div className="text-white border-b-[1px] pb-4 border-neutral-800">
      <div className="flex justify-end p-2">
        {currentUser?.id === user.id ? (
          <EditProfileBtn />
        ) : (
          <FollowToggleBtn
            isFollowing={isFollowing || false}
            userId={user.id}
          />
        )}
      </div>
      <div className="flex flex-col p-2 mt-4">
        <span className="text-white hover:underline capitalize font-semibold">
          {user.name}
        </span>
        <span className="capitalize text-neutral-400">@{user.username}</span>
      </div>
      <div>
        <p className="text-white p-2">{user.bio}</p>
      </div>
      <div className="text-neutral-400 flex gap-2 p-2 items-center">
        <BiCalendar size={24} />
        <p>Joined {createdAt}</p>
      </div>
      <div className="text-neutral-400 p-2 flex gap-4">
        <p className="text-white">
          {user?.followingIds?.length}
          <span className="text-neutral-400"> Following</span>
        </p>
        <p className="text-white">
          {followersCount}
          <span className="text-neutral-400"> Followers</span> {}
        </p>
      </div>
    </div>
  );
}
