"use client";

import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import Spinner from "./Spinner";

interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
}

export default function Header({ label, showBackArrow }: HeaderProps) {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="border-b-[1px]  sticky top-0  z-50 backdrop-blur-md   border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-1">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            size={20}
            color="white"
            className="cursor-pointer hover:opacity-80 transition"
          />
        )}
        <h1 className="text-white text-xl capitalize font-semibold">{label}</h1>
      </div>
    </div>
  );
}
