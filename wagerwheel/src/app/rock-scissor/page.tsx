'use client'
import { useState } from "react"

export default function Rock() {
    const [answer,setAnswer] = useState<number>(0);
    const [currentMultiplier,setCurrentMultiplier] = useState<number>(0);

    const chooseAnswer = (param : number)=> {
        setAnswer(param);
        setCurrentMultiplier(currentMultiplier+0.50);
    }
    return (
        <div className="p-10 m-auto h-screen w-2/3 bg-gradient-to-r from-slate-100 to-slate-200 rounded-md">
            <div className="grid grid-rows-3 gap-10">
                <div className="flex flex-cols justify-between">
                    <div className="flex justify-center bg-red-200 text-center rounded-full w-24 h-24 text-black">
                        <div className="m-auto">Exit
                        </div>
                    </div>
                    <div className="flex justify-center bg-red-200 text-center rounded-full w-24 h-24 text-black text-xl">
                        <div className="m-auto">{currentMultiplier}x
                        </div>
                    </div>
                    <div className="flex justify-center bg-red-200 text-center rounded-full w-24 h-24 cursor-pointer" onClick={()=>{
                        setAnswer(0);
                    }}>
                        <div className="m-auto">
                                <img className="h-10 w-10 rounded-lg" src="/replay.png" alt="image description">
                                </img>
                        </div>
                    </div>
                </div>
                <div className="h-20 mx-10 grid grid-cols-3 gap-4">
                    <div className={`flex justify-center ${answer>0 ? 'bg-red-200' : 'bg-red-300'} ${answer===1 && 'border border-gray-400'} cursor-pointer text-center rounded-lg transition duration-700 ease-in-out`} onClick={()=>chooseAnswer(1)}>
                        <div className="m-auto">
                            {answer>0 && 
                                <img className="h-12 w-12 rounded-lg" src="/coal.png" alt="image description">
                                </img>
                            }
                        </div>
                    </div>
                    <div className={`flex justify-center ${answer>0 ? 'bg-red-200' : 'bg-red-300'} ${answer===2 && 'border-gray-300'} cursor-pointer text-center rounded-lg transition duration-700 ease-in-out`} onClick={()=>chooseAnswer(2)}>
                        <div className="m-auto">
                            {answer>0 && 
                                <img className="h-12 w-12 rounded-lg" src="/coal.png" alt="image description">
                                </img>
                            }
                        </div>
                    </div>
                    <div className={`flex justify-center ${answer>0 ? 'bg-red-200' : 'bg-red-300'} ${answer===3 && ' border-gray-300'} cursor-pointer text-center rounded-lg transition duration-700 ease-in-out`} onClick={()=>chooseAnswer(3)}>
                        <div className="m-auto">
                            {answer>0 && 
                                <img className="h-12 w-12 rounded-lg" src="/coal.png" alt="image description">
                                </img>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex items-center"> 
                    <hr className="flex-grow border-t border-black"></hr>
                    <span className="px-3 text-gray-500"> 
                        Choose one
                    </span> 
                    <hr className="flex-grow border-t border-black"></hr>
                </div> 
                <div className="h-20 mx-10 grid grid-cols-3 gap-4">
                    <div className="flex justify-center bg-red-200 text-center rounded-lg cursor-pointer hover:bg-red-300">
                        <div className="m-auto">
                            <img className="h-12 w-12 rounded-lg" src="/coal.png" alt="image description">
                            </img>
                        </div>
                    </div>
                    <div className="flex justify-center bg-red-200 text-center rounded-lg cursor-pointer hover:bg-red-300">
                    <div className="m-auto">
                            <img className="h-12 w-12 rounded-lg" src="/paper.png" alt="image description">
                            </img>
                        </div>
                    </div>
                    <div className="flex justify-center bg-red-200 text-center rounded-lg cursor-pointer hover:bg-red-300">
                        <div className="m-auto">
                            <img className="h-12 w-12 rounded-lg" src="/scissors.png" alt="image description">
                            </img>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}