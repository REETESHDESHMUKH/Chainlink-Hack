import { NAV_LINKS } from "./ui/navLinks";
import Image from "next/image";
import Link from "next/link";
import Button from "./ui/button";
import "./navbar.css"; // Make sure your CSS file is properly imported
import { Separator } from "./ui/separator";

const Navbar = () => {
  return (
    <nav className="max-container padding-container relative z-30 py-5 flex items-center justify-between">
        <div className="logo-container" style={{ paddingLeft: '20px' }}> {/* Add left padding here */}
            <Link href="/" className="flex flex-row gap-4">
                <img className="block h-12 pb-1 w-auto" src="/logo.png" alt="logo" />
                <span className="flex flex-cols items-center text-3xl">Wager Wheels</span>
            </Link>
        </div>

      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link href={link.href} key={link.key} className="regular-16 text-gray-50 text-xl flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
            {link.label}
          </Link>
        ))}
      </ul>

      <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Play!
            </span>
        </button>
    </nav>
  );
};

export default Navbar;
