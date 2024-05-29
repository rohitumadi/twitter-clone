"use client";
import { useRouter } from "next/navigation";
import { BsTwitter } from "react-icons/bs";

interface SidebarLogoProps {}

export default function SidebarLogo() {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="rounded-full p-4 h-14 w-14   hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer transition"
    >
      <BsTwitter size={28} color="white" />
    </div>
  );
}
