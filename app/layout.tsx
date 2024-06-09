import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import FollowBar from "@/components/FollowBar";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToastProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "Tweet your heart out",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <div className=" bg-black">
          <div className="container h-full  mx-auto xl:px-30 max-w-6xl ">
            <div className="grid grid-cols-4 h-full">
              <ModalProvider />
              <Sidebar />
              <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
                {children}
              </div>
              <FollowBar />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
