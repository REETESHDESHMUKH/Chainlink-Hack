'use client';
import React, { useState } from 'react';

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
  const [blocks, setBlocks] = useState<Block[]>([]);
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
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-5xl font-bold mb-8 font-sans text-center">Mines</h1>
      <div className="flex w-full justify-center gap-10">
        <div className="flex flex-col items-start rounded-lg shadow-lg p-10" style={{ backgroundColor: '#1b263b' }}>
          <div className="mb-4">
            <label className="block mb-1">Tickets:</label>
            <input
              type="text"
              value={tickets}
              onChange={(e) => {
                const value = e.target.value;
                setTickets(value === '' ? '' : parseInt(value) || '');
              }}
              className={`border rounded px-2 py-1 text-black ${tickets < 1 || tickets > 200 ? 'border-red-500' : ''}`}
            />
            {(tickets < 1 || tickets > 200) && <div className="text-red-500 text-xs mt-1">Please enter a value between 1 and 200</div>}
            <div className="text-xs text-gray-500 mt-1">1 ticket = 0.005 ETH</div>
            <div className="text-xs text-gray-500 mt-1">Max tickets: 200 (1 ETH)</div>
          </div>
          {tickets >= 1 && tickets <= 200 && (
            <div className="mb-4">
              <label className="block mb-1">ETH Amount:</label>
              <div className="text-xs text-gray-500">{calculateEthAmount(tickets)} ETH</div>
            </div>
          )}
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
        </div>
        <div className="grid grid-cols-5 grid-rows-5 gap-1">
          {blocks.map((block) => (
            <div
              key={block.id}
              onClick={() => revealBlock(block.id)}
              className={`w-24 h-24 flex items-center justify-center cursor-pointer ${
                block.revealed
                  ? block.hasMine
                    ? 'bg-red-500'
                    : 'bg-green-500'
                  : 'bg-gray-800'
              } ${
                block.revealed || gameOver ? '' : 'hover:bg-white transition duration-300 ease-in-out'
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
        <h2 className="text-2xl mb-2">Score: {score}</h2>
        {gameOver && <h2 className="text-2xl text-red-500 mb-2">Game Over!</h2>}
      </div>
    </div>
  );
};

export default Mines;



