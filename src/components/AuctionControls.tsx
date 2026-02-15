import { useNavigate } from "react-router-dom";
import type { AuctionData, Team } from "../types/auction";

interface Props {
  onStart: () => void;
  // onNext: () => void;
  onSell: () => void;
  onUndo: () => void;
  onRandomAssign: () => void;
  // onEnd: () => void;
  auctionData?: AuctionData;
  teams: Team[];
}

const AuctionControls = ({
  onStart,
  // onNext,
  onSell,
  onUndo,
  onRandomAssign,
  // onEnd,
  teams,
  auctionData,
}: Props) => {
  const isLive = auctionData?.status === "LIVE";
  const notStarted = auctionData?.status === "NOT_STARTED";
  const isCompleted = auctionData?.status === "COMPLETED";

  const navigate = useNavigate();
  return (
    <div className=" mt-6">
      <div className="flex items-center gap-5 flex-wrap justify-center">
        {notStarted && (
          <>
            <button
              onClick={onStart}
              disabled={teams.length === 0}
              className="bg-green-600 hover:bg-green-700 
                     text-white font-bold 
                     px-8 py-3 rounded-xl 
                     shadow-md transition-all duration-200 
                     hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ▶ START AUCTION
            </button>
            <button
              onClick={() => navigate(`/create-player/${auctionData?._id}`)}
              className="bg-red-600 hover:bg-red-700 
                     text-white font-bold 
                     px-8 py-3 rounded-xl 
                     shadow-md transition-all duration-200 
                     hover:scale-105"
            >
              Create Player
            </button>
            <button
              onClick={() => navigate(`/create-team/${auctionData?._id}`)}
              className="bg-yellow-600 hover:bg-yellow-700 
                     text-white font-bold 
                     px-8 py-3 rounded-xl 
                     shadow-md transition-all duration-200 
                     hover:scale-105"
            >
              Create Team
            </button>
          </>
        )}
        {isLive && (
          <>
            <button
              onClick={onSell}
              className="bg-red-600 hover:bg-red-700 
                     text-white text-sm font-bold 
                     px-10 py-2 rounded-lg 
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
                     px-10 py-2 rounded-lg 
                     shadow-md text-sm
                     transition-all duration-200 
                     hover:scale-105"
            >
              ↩ UNDO LAST BID
            </button>

            <button
              onClick={onRandomAssign}
              className="bg-blue-600 hover:bg-blue-700 
                     text-white font-semibold 
                     px-10 py-2 rounded-lg 
                     shadow-md text-sm
                     transition-all duration-200 
                     hover:scale-105"
            >
              🎲 RANDOM ASSIGN
            </button>
            {/* <button
              onClick={onNext}
              className="bg-indigo-600 hover:bg-indigo-700 
                     text-white font-semibold 
                     px-10 py-2 rounded-lg 
                     text-sm
                     shadow-md transition-all duration-200 
                     hover:scale-105"
            >
              ⏭ NEXT PLAYER
            </button> */}
            {/* <button
              onClick={onEnd}
              className="bg-gray-600 hover:bg-gray-700 
                     text-white font-semibold 
                      px-10 py-2 rounded-lg 
                     text-sm
                     shadow-md transition-all duration-200 
                     hover:scale-105"
            >
              🛑 END AUCTION
            </button> */}
          </>
        )}
      </div>
    </div>
  );
};

export default AuctionControls;
