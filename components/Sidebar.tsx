import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import SidebarTweetButton from "./SidebarTweetButton";
import { auth, signOut } from "@/lib/auth";

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
  const handleLogout = async () => {
    await signOut({ redirectTo: "/" });
  };
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
            <SidebarItem
              onClick={handleLogout}
              icon={BiLogOut}
              label="Logout"
            />
          ) : (
            <SidebarItem icon={BiLogIn} label="Login" />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
}
