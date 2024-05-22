'use client'
import { useState } from "react"
import GameOverOverlay from "../components/GameOverOverlay";
import Loading from "../components/loading";

type Row = {
    id: number;
    element: number[];
    isAttempted: boolean;
    attemptedOn: number;
};

const permutations : number[][] = [[0,1,2],
[0,2,1],
[1,0,2],
[1,2,0],
[2,0,1],
[2,1,0]];

const idToIcon: string[] = ["/coal.png","/paper.png","/scissors.png"]
const generateRows = (): Row[] => {
    const rows = Array.from({ length: 5 }, (_, id) => ({
      id,
      element: permutations[Math.floor(Math.random() * 5)],
      isAttempted: false,
      attemptedOn: -1
    }));
    return rows;
};
const calculateEthAmount = (tickets: number): number => {
    return tickets * 0.005;
  };

export default function Rock() {
    const [tickets, setTickets] = useState<number>(1); 
    const [chooseElement,setChooseElement] = useState<number>(-1);
    const [score,setScore] = useState<number>(0);
    const [rows, setRows] = useState<Row[]>(
        Array.from({ length: 5 }, (_, id) => ({
            id,
            element: [0,1,2],
            isAttempted: false,
            attemptedOn: -1
          }))
    );
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [gameStarted, setGameStarted] = useState<boolean>(false);

    const startGame = () => {
        setRows(generateRows());
        setScore(0);
        setGameOver(false);
        setGameStarted(true);
      };
    
      
    const revealRows = (id : number, optionChoosed : number) => {
        if (gameOver || rows[id].isAttempted) return;

        const newRows = [...rows];
        newRows[id].isAttempted = true;
        setRows(newRows);

        const opt = newRows[id].element[optionChoosed];
        if ((chooseElement === 0 && (opt!==1)) || 
            (chooseElement === 1 && (opt!==2)) || 
            (chooseElement === 2 && (opt!==0))) {
            setScore(score + 1);
        } else {
            console.log(chooseElement,opt);
            setGameOver(true);
            setTimeout(() => {
                setGameOver(false); // Hide overlay after some time if needed
            }, 3000);
        }

        if(id === 0) {
            console.log(chooseElement,opt);
            setGameOver(true);
            setTimeout(() => {
                setGameOver(false); // Hide overlay after some time if needed
            }, 2000);
        }
    }

    return (
        <div className='flex flex-row'>
            <div className="p-10 m-auto h-screen w-2/3 bg-gradient-to-r from-slate-100 to-slate-200 rounded-md">
                <div className="grid grid-rows-5 gap-1">
                    {rows.map((row) => (   
                        <div className="h-14 mx-10 grid grid-cols-3 gap-4">
                            <div className={`flex justify-center ${chooseElement===-1 ? 'bg-red-200' : 'bg-red-300'} ${row.attemptedOn===0 && 'border border-gray-400'} cursor-pointer text-center rounded-lg transition duration-700 ease-in-out`} 
                            onClick={()=>revealRows(row.id,0)}>
                                <div className="m-auto">
                                    {row.isAttempted && 
                                        <img className="h-8 w-8 rounded-lg" src={idToIcon[row.element[0]]} alt="image description">
                                        </img>
                                    }
                                </div>
                            </div>

                            <div className={`flex justify-center ${chooseElement===-1 ? 'bg-red-200' : 'bg-red-300'} ${row.attemptedOn===1 && 'border border-gray-400'} cursor-pointer text-center rounded-lg transition duration-700 ease-in-out`} 
                            onClick={()=>revealRows(row.id,1)}>
                                <div className="m-auto">
                                    {row.isAttempted && 
                                        <img className="h-8 w-8 rounded-lg" src={idToIcon[row.element[1]]} alt="image description">
                                        </img>
                                    }
                                </div>
                            </div>

                            <div className={`flex justify-center ${chooseElement===-1 ? 'bg-red-200' : 'bg-red-300'} ${row.attemptedOn===2 && 'border border-gray-400'} cursor-pointer text-center rounded-lg transition duration-700 ease-in-out`} 
                            onClick={()=>revealRows(row.id,2)}>
                                <div className="m-auto">
                                    {row.isAttempted && 
                                        <img className="h-8 w-8 rounded-lg" src={idToIcon[row.element[2]]} alt="image description">
                                        </img>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center mt-10"> 
                        <hr className="flex-grow border-t border-black"></hr>
                        <span className="px-3 text-gray-500"> 
                            Choose one
                        </span> 
                        <hr className="flex-grow border-t border-black"></hr>
                    </div> 
                    <div className="h-16 mx-10 grid grid-cols-3 gap-4 mt-2">
                        <div className={`flex justify-center ${chooseElement === 0? 'bg-red-300 border border-gray-400':'bg-red-200'}  text-center rounded-lg cursor-pointer hover:bg-red-300`}>
                            <div className="m-auto" onClick={()=>setChooseElement(0)}>
                                <img className="h-8 w-8 rounded-lg" src="/coal.png" alt="image description">
                                </img>
                            </div>
                        </div>
                        <div className={`flex justify-center ${chooseElement === 1? 'bg-red-300 border border-gray-400':'bg-red-200'}  text-center rounded-lg cursor-pointer hover:bg-red-300`}>
                        <div className="m-auto" onClick={()=>setChooseElement(1)}>
                                <img className="h-8 w-8 rounded-lg" src="/paper.png" alt="image description">
                                </img>
                            </div>
                        </div>
                        <div className={`flex justify-center ${chooseElement === 2? 'bg-red-300 border border-gray-400':'bg-red-200'}  text-center rounded-lg cursor-pointer hover:bg-red-300`}>
                            <div className="m-auto" onClick={()=>setChooseElement(2)}>
                                <img className="h-8 w-8 rounded-lg" src="/scissors.png" alt="image description">
                                </img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col bg-gradient-to-r from-slate-100 to-slate-200 p-6">
                <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
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
                                setTickets(value === '' ? 0 : parseInt(value));
                            }}
                            className="max-w-lg text-gray-700 p-2 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="pt-2 text-xs text-gray-500 mt-1">1 ticket = 0.005 ETH</div>
                    <div className="text-xs text-gray-500 mt-1">Max tickets: 200 (1 ETH)</div>

                    {tickets >= 1 && tickets <= 200 && (
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">ETH Amount:</label>
                            <div className="pt-2 sm:mt-0 sm:col-span-2 text-gray-500">{calculateEthAmount(tickets)} ETH</div>
                        </div>
                    )}

                    {(
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Score</label>
                            <div className="pt-2 sm:mt-0 sm:col-span-2 text-gray-500">{score}</div>
                        </div>
                    )}
                    <button
                    type="button"
                    onClick={startGame}
                    disabled={tickets < 1 || tickets > 200}
                    className="mt-5 mx-1 bg-gray-100 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                    Start
                    </button>
                    {gameStarted && !gameOver && (
                        <button
                            type="button"
                            className="mt-5 mx-1 bg-gray-100 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            onClick={() => setGameOver(true)}
                        >
                            Stop
                        </button>
                    )}
                </div>
            </div>
            <GameOverOverlay isVisible={gameOver} />
            {/* <Loading isVisible={gameOver} /> */}
        </div>
        
    )
}
