"use client"
import { useState } from "react"

export default function SpinWheel() {
    const [spinning,setSpinning] = useState<boolean>(false);
    const [finalRotation,setFinalRotation] = useState<number>(0);

    const spinWheel = () => {
        setSpinning(true);
        setFinalRotation(Math.floor(Math.random() * 360)); // Random final rotation

        setTimeout(() => {
            setSpinning(false);
        }, 5000); // Simulating a 3-second spinning duration
    };
    
    return (
        <div className="m-auto h-[1000px] w-[1000px] bg-gradient-to-r from-slate-100 to-slate-200 rounded-md">
            <div className="flex flex-cols justify-between">
                    <div className="flex justify-center bg-red-200 text-center rounded-full w-24 h-24 text-black">
                        <div className="m-auto">Exit
                        </div>
                    </div>
                    <div className="flex justify-center bg-red-200 text-center rounded-full w-24 h-24 text-black text-xl">
                        <div className="m-auto">{0.25}x
                        </div>
                    </div>
                    <div className="flex justify-center bg-red-200 text-center rounded-full w-24 h-24 cursor-pointer">
                        <div className="m-auto">
                                <img className="h-10 w-10 rounded-lg" src="/replay.png" alt="image description">
                                </img>
                        </div>
                    </div>
            </div>
            <img className="h-12 w-12 m-auto" src="/arrow-point-to-down.png" alt="image description">
            </img>
            <img className={`h-30 w-30 m-auto ${spinning ? 'animate-spin' : ''}`} src="/lottery1.png" alt="image description" style={{ transform: `rotate(${finalRotation}deg)` }}>
            </img>
            <div className="flex justify-center">
                <button
                    onClick={spinWheel}
                    className="my-8 px-5 py-4 bg-red-300 text-black rounded-md shadow-md focus:outline-none focus:ring focus:ring-red-400"
                >
                    Spin
                </button>

            </div>
            <div className="h-20 mx-10 grid grid-cols-6 gap-4">
                <div className="flex bg-[#F45542] rounded-lg">
                    <span className="text-xl m-auto font-semibold">1.25x</span>
                </div>
                <div className="flex bg-[#AF2F79] rounded-lg">
                    <span className="text-xl m-auto font-semibold">1.50x</span>
                </div>
                <div className="flex bg-[#7943A3] rounded-lg">
                    <span className="text-xl m-auto font-semibold">1.75x</span>
                </div>
                <div className="flex bg-[#019A85] rounded-lg">
                    <span className="text-xl m-auto font-semibold">2x</span>
                </div>
                <div className="flex bg-[#9CDB20] rounded-lg">
                    <span className="text-xl m-auto font-semibold">2.25x</span>
                </div>
                <div className="flex bg-[#FCA313] rounded-lg">
                    <span className="text-xl m-auto font-semibold">2.50x</span>
                </div>
            </div>
        </div>
    )
}