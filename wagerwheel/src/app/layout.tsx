import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Topbar from "./components/topbar";
import BetDashboard from "./components/betDashboard";
import Web3Provider from "../../context/Web3Provider";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-mono">
        <Topbar/>
        <div className="flex flex-row">
            <Navbar/>
            <Web3Provider>
                <div className="w-4/5">
                    {children}
                </div>
            </Web3Provider>
        </div>
      </body>
    </html>
  );
}
