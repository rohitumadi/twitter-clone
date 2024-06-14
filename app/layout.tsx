import FollowBar from "@/components/FollowBar";
import Sidebar from "@/components/Sidebar";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToastProviders";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter",
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
          <div className="sm:container h-screen overflow-auto mx-auto xl:px-30 max-w-6xl ">
            <div className="grid sm:grid-cols-4 grid-cols-5 h-full">
              <ModalProvider />
              <Sidebar />
              <div className="col-span-4 sm:col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
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
