interface Props {
  onStart: () => void;
  onNext: () => void;
  onSell: () => void;
  onUndo: () => void;
  onRandomAssign: () => void;
  onEnd: () => void;
}

const AuctionControls = ({
  onStart,
  onNext,
  onSell,
  onUndo,
  onRandomAssign,
  onEnd,
}: Props) => {
  return (
    <div className="flex flex-col gap-6 mt-6">
      {/* Top Row - Auction Lifecycle */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={onStart}
          className="bg-green-600 hover:bg-green-700 
                     text-white font-bold 
                     px-8 py-3 rounded-xl 
                     shadow-md transition-all duration-200 
                     hover:scale-105"
        >
          ▶ START AUCTION
        </button>

        <button
          onClick={onNext}
          className="bg-indigo-600 hover:bg-indigo-700 
                     text-white font-semibold 
                     px-8 py-3 rounded-xl 
                     shadow-md transition-all duration-200 
                     hover:scale-105"
        >
          ⏭ NEXT PLAYER
        </button>

        <button
          onClick={onEnd}
          className="bg-gray-600 hover:bg-gray-700 
                     text-white font-semibold 
                     px-8 py-3 rounded-xl 
                     shadow-md transition-all duration-200 
                     hover:scale-105"
        >
          🛑 END AUCTION
        </button>
      </div>

      {/* Bottom Row - Live Controls */}
      <div className="flex flex-wrap justify-center gap-5">
        <button
          onClick={onSell}
          className="bg-red-600 hover:bg-red-700 
                     text-white text-xl font-bold 
                     px-10 py-4 rounded-2xl 
                     shadow-lg hover:shadow-red-500/40
                     transition-all duration-200
                     hover:scale-105"
        >
          🔨 SELL
        </button>

        <button
          onClick={onUndo}
          className="bg-yellow-500 hover:bg-yellow-600 
                     text-black font-semibold 
                     px-8 py-3 rounded-xl 
                     shadow-md 
                     transition-all duration-200 
                     hover:scale-105"
        >
          ↩ UNDO LAST BID
        </button>

        <button
          onClick={onRandomAssign}
          className="bg-blue-600 hover:bg-blue-700 
                     text-white font-semibold 
                     px-8 py-3 rounded-xl 
                     shadow-md 
                     transition-all duration-200 
                     hover:scale-105"
        >
          🎲 RANDOM ASSIGN
        </button>
      </div>
    </div>
  );
};

export default AuctionControls;
