"use Client"

export default function GameOverOverlay ({ isVisible, finalScore }: { isVisible: boolean,finalScore: number }) {
  return (
    isVisible && (
      <div className="fixed inset-0 flex flex-col gap-5 items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="text-white text-4xl font-bold animate-pulse">
          Game Over
        </div>
        <div className="text-gray-200 text-2xl font-semibold">
          Score: {finalScore}
        </div>
      </div>
    )
  );
};

