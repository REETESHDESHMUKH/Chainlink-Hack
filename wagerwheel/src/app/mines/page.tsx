'use client';
import React, { useState } from 'react';
import BetDashboard from '../components/betDashboard';

type Block = {
  id: number;
  hasMine: boolean;
  revealed: boolean;
};

const generateBlocks = (numMines: number): Block[] => {
  const blocks = Array.from({ length: 25 }, (_, id) => ({
    id,
    hasMine: false,
    revealed: false,
  }));

  let minesPlaced = 0;
  while (minesPlaced < numMines) {
    const randomIndex = Math.floor(Math.random() * 25);
    if (!blocks[randomIndex].hasMine) {
      blocks[randomIndex].hasMine = true;
      minesPlaced++;
    }
  }

  return blocks;
};

const Mines = () => {
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

  const calculateEthAmount = (tickets: number): number => {
    return tickets * 0.005;
  };

  const startGame = () => {
    setBlocks(generateBlocks(numMines));
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  const revealBlock = (id: number) => {
    if (gameOver || blocks[id].revealed) return;

    const newBlocks = [...blocks];
    newBlocks[id].revealed = true;
    setBlocks(newBlocks);

    if (newBlocks[id].hasMine) {
      setGameOver(true);
    } else {
      setScore(score + 1);
    }
  };

  return (
    <div className='flex flex-row'>
    <div className="flex flex-col items-center mt-10 w-2/3">
      <div className="flex justify-center gap-10">
        {/* <div className="flex flex-col items-start rounded-lg shadow-lg p-10" style={{ backgroundColor: '#1b263b' }}>
          <div className="mb-4">
            <label className="block mb-1">Number of Mines:</label>
            <input
              type="number"
              value={numMines}
              onChange={(e) => setNumMines(Math.min(24, Math.max(1, parseInt(e.target.value))))}
              min={1}
              max={24}
              className="border rounded px-2 py-1 text-black"
            />
          </div>
          <button
              onClick={startGame}
              disabled={tickets < 1 || tickets > 200}
              className={`px-4 py-2 rounded ${tickets < 1 || tickets > 200 ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-green-500 text-white'}`}
              style={{ width: '120px' }} // Set fixed width for the buttons
            >
              Start
            </button>
            <br />
            {gameStarted && !gameOver && (
              <button
                onClick={() => setGameOver(true)}
                className="bg-red-500 text-white px-4 py-2 rounded"
                style={{ width: '120px' }} // Set fixed width for the buttons
              >
                Stop
              </button>
            )}
        </div> */}
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

                {!gameOver && (
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Score</label>
                        <div className="pt-2 sm:mt-0 sm:col-span-2 text-gray-500">{score} ETH</div>
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
    </div>
  );
};

export default Mines;



