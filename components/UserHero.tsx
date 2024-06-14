import { User } from "@prisma/client";
import Image from "next/image";
import Avatar from "./Avatar";

interface UserHeroProps {
  user: User;
}

export default function UserHero({ user }: UserHeroProps) {
  return (
    <div>
      <div className="bg-neutral-700 h-44 rounded-lg relative">
        {user?.coverImage && (
          <Image
            className="object-cover"
            src={user?.coverImage}
            alt="cover image"
            fill
          />
        )}

        <div className="absolute -bottom-16 left-1  lg:left-4">
          <Avatar imageUrl={user?.profileImage as string} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
}
