"use client"
import { useContext, useState } from "react"
import Web3Context from "../../../context/web3-context";
import GameOverOverlay from "../components/GameOverOverlay";
import Loading from "../components/loading";

export default function SpinWheel() {
    const { web3, account, contract } = useContext(Web3Context);
    const [loading,setLoading] = useState<boolean>(false);
    const [spinning,setSpinning] = useState<boolean>(false);
    const [finalRotation,setFinalRotation] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [tickets, setTickets] = useState<number>(1);
    
    const startGame = async () => {
        try {
            setLoading(true);
            const response = await contract.methods.rollDice(account, 1, 6).send({ from: account });
            setSpinning(true);
            setGameStarted(true);
        } catch (err) {
            alert("Error occurred while starting the game");
            setLoading(false); 
        } finally {
            setLoading(false);
        }
    };

    const stopGame = async () => {
        const random = await contract.methods.getRandom().call({ from: account });
        console.log(random);
        setFinalRotation((Number(random[0])/6) * 360);
        setSpinning(false);
        setGameOver(true);
        setTimeout(() => {
            setGameOver(false);
            setGameStarted(false);
            setFinalRotation(0);
        }, 4000);
    }
    return (
        <>
            <div className='flex flex-row'>
                <div className="p-10 m-auto h-screen w-2/3 bg-gradient-to-r from-slate-100 to-slate-200 rounded-md">
                    <img className="h-12 w-12 m-auto p-2" src="/arrow-point-to-down.png" alt="image description">
                    </img>
                    <img className={`h-1/2 m-auto p-2 ${spinning ? 'animate-spin' : ''}`} src="/lottery1.png" alt="image description" style={{ transform: `rotate(${finalRotation}deg)` }}>
                    </img>
                    <div className="h-10 mt-10 mx-10 grid grid-cols-6 gap-4">
                        <div className="flex bg-[#F45542] rounded-lg">
                            <span className="m-auto p-2">1.25x</span>
                        </div>
                        <div className="flex bg-[#AF2F79] rounded-lg">
                            <span className="m-auto p-2">1.50x</span>
                        </div>
                        <div className="flex bg-[#7943A3] rounded-lg">
                            <span className="m-auto p-2">1.75x</span>
                        </div>
                        <div className="flex bg-[#019A85] rounded-lg">
                            <span className="m-auto p-2">2x</span>
                        </div>
                        <div className="flex bg-[#9CDB20] rounded-lg">
                            <span className="m-auto p-2">2.25x</span>
                        </div>
                        <div className="flex bg-[#FCA313] rounded-lg">
                            <span className="m-auto p-2">2.50x</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col bg-gradient-to-r from-slate-100 to-slate-200 p-6">
                    <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
                        {/* <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                            </div>
                        </div> */}
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                                htmlFor="about"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                                Tickets
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                type="text"
                                placeholder="[1 - 200]"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // setTickets(value === '' ? 0 : parseInt(value));
                                }}
                                className="max-w-lg text-gray-700 p-2 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="pt-2 text-xs text-gray-500 mt-1">1 ticket = 0.005 ETH</div>
                        <div className="text-xs text-gray-500 mt-1">Max tickets: 200 (1 ETH)</div>

                        { (
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">ETH Amount:</label>
                                <div className="pt-2 sm:mt-0 sm:col-span-2 text-gray-500">{} ETH</div>
                            </div>
                        )}

                        { (
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Score</label>
                                <div className="pt-2 sm:mt-0 sm:col-span-2 text-gray-500">{finalRotation} </div>
                            </div>
                        )}
                        <button
                        type="button"
                        onClick={startGame}
                        disabled={tickets < 1 || tickets > 200}
                        className="mt-5 mx-1 bg-gray-100 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                        Spin
                        </button>
                        {gameStarted && !gameOver && (
                            <button
                                type="button"
                                className="mt-5 mx-1 bg-gray-100 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                onClick={stopGame}
                            >
                                Stop
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <GameOverOverlay isVisible={gameOver} finalScore={finalRotation}/>
            <Loading isVisible={loading} />
        </>
    )
}