import { auth } from "@/lib/auth";
import { User } from "@prisma/client";
import { format } from "date-fns";
import { BiCalendar } from "react-icons/bi";
import { Button } from "./ui/button";
import EditProfileBtn from "./EditProfileBtn";
interface UserBioProps {
  user: User;
  followersCount: number;
}

export default async function UserBio({ user, followersCount }: UserBioProps) {
  const session = await auth();
  const currentUserId = session?.user?.id;
  const createdAt = format(new Date(user.createdAt), "MMMM yyyy");

  return (
    <div className="text-white border-b-[1px] pb-4 border-neutral-800">
      <div className="flex justify-end p-2">
        {currentUserId === user.id ? (
          <EditProfileBtn />
        ) : (
          <Button
            variant={"secondary"}
            className="bg-white rounded-full text-black"
          >
            Follow
          </Button>
        )}
      </div>
      <div className="flex flex-col p-2 mt-4">
        <span className="text-white hover:underline capitalize font-semibold">
          {user.name}
        </span>
        <span className="capitalize text-neutral-400">@{user.username}</span>
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
