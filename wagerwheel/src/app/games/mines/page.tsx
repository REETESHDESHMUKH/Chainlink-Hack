'use client';
import React, { useContext, useState } from 'react';
import Web3Context from '../../../../context/web3-context';
import GameOverOverlay from '@/app/components/GameOverOverlay';
import Loading from '@/app/components/loading';
type Block = {
  id: number;
  hasMine: boolean;
  revealed: boolean;
};

const generateBlocks = (numMines: number,mines: number[]): Block[] => {
  const blocks = Array.from({ length: 25 }, (_, id) => ({
    id,
    hasMine: false,
    revealed: false,
  }));

  let minesPlaced = 0;
  while (minesPlaced < numMines) {
    blocks[mines[minesPlaced]].hasMine = true;
    minesPlaced++;
  }

  return blocks;
};

const getShuffleArray = (randomNumber: bigint[]): number[] => {
    let baseArray: number[] = [], i: number = 0;
    while(i<25) {
        baseArray.push(i);
        i++;
    }
    i = 24;
    while(i>0) {
        const randomIndex = Number(randomNumber[i % randomNumber.length]) % (i + 1);
        [baseArray[i],baseArray[randomIndex]] = [baseArray[randomIndex],baseArray[i]];
        i--;
    }
    return baseArray;
}
const Mines = () => {
  const { web3, account, contract, balance, updateBalance } = useContext(Web3Context);
  const [loading, setLoading] = useState<boolean>(false);
  const [tickets, setTickets] = useState<number>(1); 
  const [numMines, setNumMines] = useState<number>(1);
  const [blocks, setBlocks] = useState<Block[]>(
    Array.from({ length: 25 }, (_, id) => ({
        id,
        hasMine: false,
        revealed: false,
      }))
  );
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [totalBlocks,setTotalBlocks] = useState<number>(25);

  const calculateEthAmount = (tickets: number): number => {
    return tickets * 0.005;
  };

  const startGame = async () => {
    if(parseFloat(balance) < tickets*0.005) return ;

    try {
        setTotalBlocks(25);
        setLoading(true);
        const response = await contract.methods.rollDice(account, 6, 20).send({ from: account });
        setTimeout(async () => {
            try {
                const random = await contract.methods.getRandom().call({ from: account });
                setBlocks(generateBlocks(numMines,getShuffleArray(random)));
                setGameOver(false);
                setScore(0);
                setGameStarted(true);
            } catch (err) {
                console.error("Error fetching random number:", err);
            } finally {
                setLoading(false); 
            }
        }, 4000);
    } catch (err) {
        alert("Error occurred while starting the game");
        setLoading(false); 
    }
};

    const stopGame = async () => {
        setGameOver(true);
        const amount = tickets*0.005;
        updateBalance(Number((score)*amount).toString(),true);
        setTimeout(() => {
            setGameOver(false); // Hide overlay after some time if needed
            setScore(0);
            setTotalBlocks(25);
        }, 6000);
        setGameStarted(false);
    }
  const revealBlock = (id: number) => {
    if (gameOver || blocks[id].revealed) return;

    const newBlocks = [...blocks];
    newBlocks[id].revealed = true;
    setBlocks(newBlocks);

    if (newBlocks[id].hasMine) {
        stopGame()
        return ;
    } else {
        setScore(Number(Number(score + 2*(numMines/totalBlocks)).toPrecision(2)));
        setTotalBlocks(totalBlocks-1);
    }
  };

  return (
    <>
        <div className='flex flex-row bg-gray-200'>
        <div className="flex flex-col items-center mt-10 w-2/3">
        <div className="flex justify-center gap-10">
            <div className="grid grid-cols-5 grid-rows-5 gap-1">
            {blocks.map((block) => (
                <div
                key={block.id}
                onClick={() => revealBlock(block.id)}
                className={`w-20 h-20 flex items-center rounded-md justify-center cursor-pointer ${
                    block.revealed
                    ? block.hasMine
                        ? 'bg-red-500'
                        : 'bg-green-500'
                    : 'bg-gray-800'
                } ${
                    block.revealed || gameOver ? '' : 'hover:bg-gray-200 transition duration-300 ease-in-out'
                }`} // Conditionally apply hover effect based on game state and block revealed status
                >
                {block.revealed && (
                    <img src={block.hasMine ? '/blast.png' : '/flag.png'} alt="icon" className="w-14 h-14" />
                    )}
                </div>
            ))}
            </div>
        </div>
        <div className="mt-6 text-center">
        </div>
        </div>
        <div className="flex-1 flex flex-col bg-gradient-to-r from-slate-100 to-slate-200 p-6">
                <div className="flex-1 flex flex-col pb-4 overflow-y-auto">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                            htmlFor="about"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                            Mines:
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                            type="number"
                            value={numMines}
                            onChange={(e) => setNumMines(Math.min(24, Math.max(1, parseInt(e.target.value))))}
                            min={1}
                            max={24}
                            className="max-w-lg text-gray-700 p-2 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
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

                    {gameStarted && (
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Multiplier</label>
                            <div className="pt-2 sm:mt-0 sm:col-span-2 text-gray-500">{score}x</div>
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
                            onClick={stopGame}
                        >
                            Stop
                        </button>
                    )}
                </div>
            </div>
        </div>
        <GameOverOverlay isVisible={gameOver} finalScore={score}/>
        <Loading isVisible={loading} />
    </>
  );
};

export default Mines;



