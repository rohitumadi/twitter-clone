import { auth } from "@/lib/auth";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";
import SidebarTweetButton from "./SidebarTweetButton";
import SignInBtn from "./SignInBtn";
import SignOutBtn from "./SignOutBtn";

export default async function Sidebar() {
  const session = await auth();

  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
    },
    {
      label: "Profile",
      href: "/users/123",
      icon: FaUser,
    },
  ];
  return (
    <div className="col-span-1 pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              href={item.href}
              label={item.label}
            />
          ))}
          {session?.user ? (
            <>
              <SignOutBtn />
              <SidebarTweetButton />
            </>
          ) : (
            <SignInBtn />
          )}
        </div>
      </div>
    </div>
  );
}
