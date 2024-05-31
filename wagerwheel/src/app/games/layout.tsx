import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import Topbar from "@/app/components/topbar";
import Sidebar from "../components/sidebar";

// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        <Topbar/>
        <div className="flex flex-row">
        <Sidebar/>
            <div className="w-4/5">
                {children}
            </div>
        </div>
      </div>
  );
}
