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
      alert: session?.user?.hasNotification,
    },
    {
      label: "Profile",
      href: `/user/${session?.user?.id}`,
      icon: FaUser,
    },
  ];
  return (
    <div className="col-span-1 sticky top-0  md:pr-4">
      <div className="flex sticky top-0  flex-col items-end">
        <div className="space-y-2">
          <SidebarLogo />
          {session?.user &&
            items.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                href={item.href}
                label={item.label}
                alert={item.alert}
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
