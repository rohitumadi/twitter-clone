import Link from "next/link";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

interface SidebarItemProps {
  icon: IconType;
  href: string;
  label: string;
  alert?: boolean;
}

export default function SidebarItem({
  alert,
  icon: Icon,
  href,
  label,
}: SidebarItemProps) {
  return (
    <Link href={href} className="">
      <div className="rounded-full lg:hidden relative  h-14 w-14  hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer p-4">
        <Icon size={28} color="white" />
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-4 left-1 " size={70} />
        ) : null}
      </div>
      <div className="hidden relative lg:flex gap-4 items-center rounded-full    hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer p-4">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
        {alert ? (
          <BsDot className="text-sky-500 absolute -top-2 left-1" size={70} />
        ) : null}
      </div>
    </Link>
  );
}
