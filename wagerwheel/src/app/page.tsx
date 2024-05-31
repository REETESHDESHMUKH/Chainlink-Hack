'use client'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
import { Tagline } from "./components/tagline";
import { AboutProject } from "./components/aboutProject";
import { Technologies } from "./components/technologies";
import Navbar from "./components/navbar";
import { Footer } from "./components/footer";


export default function Home ()  {
    // Data AOS Animations
    useEffect(() => {
        AOS.init({
          disable: "phone",
          duration: 800,
          easing: "ease-out-cubic",
        });
      }, []);
    
    return (
        <div className="text-white">
            <Navbar />
          <div className="pt-32 pb-16 md:pt-52 md:pb-32 relative max-w-5xl min-h-screen px-4 mx-auto sm:px-6 space-y-80">
            <Tagline />
      
            <AboutProject />

            <Technologies />
            </div>
            <Footer />
            <div>
          </div>
          
        </div>
    );
}