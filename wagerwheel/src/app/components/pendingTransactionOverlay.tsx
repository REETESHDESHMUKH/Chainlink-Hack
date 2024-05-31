"use Client"

export default function PendingTransactionOverlay ({ isVisible }: { isVisible: boolean }) {
  return (
    isVisible && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="text-white text-4xl font-bold animate-pulse">
            Transaction Pending
        </div>
      </div>
    )
  );
};

