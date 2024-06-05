import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  imageUrl: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

export default function Avatar({ imageUrl, isLarge, hasBorder }: AvatarProps) {
  return (
    <div
      className={`relative aspect-square ${
        isLarge ? "w-32 h-32" : "w-12 h-12"
      } ${hasBorder ? "border-4 rounded-full border-black" : ""} `}
    >
      <Image
        src={imageUrl || "/images/avatar.png"}
        alt="Avatar"
        fill
        className="rounded-full object-cover"
      />
    </div>
  );
}
