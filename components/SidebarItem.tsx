import Link from "next/link";
import { IconType } from "react-icons";

interface SidebarItemProps {
  icon: IconType;
  href: string;
  label: string;
}

export default function SidebarItem({
  icon: Icon,
  href,
  label,
}: SidebarItemProps) {
  return (
    <Link href={href} className="">
      <div className="rounded-full lg:hidden  h-14 w-14  hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer p-4">
        <Icon size={28} color="white" />
      </div>
      <div className="hidden lg:flex gap-4 items-center rounded-full    hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer p-4">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </Link>
  );
}
