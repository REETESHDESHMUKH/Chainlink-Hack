import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Topbar from "./components/topbar";
import BetDashboard from "./components/betDashboard";
import Web3Provider from "../../context/Web3Provider";
import { Footer } from "./components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Wager Wheels - Exciting Blockchain Gaming setup</title>
        <meta name="description" content="Spin and win with Wager Wheels, the premier blockchain gaming experience!" />
        {/* If using a different format, e.g., PNG */}
        <link rel="icon" type="image/png" href="/logo.png" />
      </head>
      <body className="font-mono">
        <Web3Provider>
            <main className="relative overflow-hidden">
            {children}
            </main>
        </Web3Provider>
      </body>
    </html>
  );
}
