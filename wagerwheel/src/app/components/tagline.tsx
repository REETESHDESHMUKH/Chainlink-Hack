import Link from "next/link"
import { Particles } from "./particles"

export const Tagline = () => {
    return (
        <div className="pt-20">
            <Particles className="absolute inset-0 -z-10" />
            <div className="text-center px-8" id="home">
                <h1 className="pb-4 font-extrabold tracking-tight text-transparent text-7xl lg:text-8xl bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-600 to-cyan-400" data-aos="fade-down">
                    Play, Win, Earn Rewards.
                </h1>
                <p className="mb-8 text-lg text-slate-300/40 font-medium" data-aos="fade-down" data-aos-delay="200">
                    Play games on Wagerwheel and earn ETH.
                </p>
                <div className="mb-6" data-aos="fade-down">
                    <div className="relative inline-flex before:absolute before:inset-0">
                        <Link
                            className="px-6 py-3 text-lg font-medium inline-flex items-center justify-center border rounded-full text-zinc-300 hover:text-white transition duration-150 ease-in-out w-full group border-slate-100/40"
                            href="games/rock-scissor"
                        >
                            <span className="relative inline-flex items-center">
                                Get Started{" "}
                                <span className="tracking-normal text-primary-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                                    -&gt;
                                </span>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
