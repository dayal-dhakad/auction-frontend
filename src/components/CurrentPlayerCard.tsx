import type { AuctionData } from "../types/auction";

interface Props {
  auction?: AuctionData | null;
}

const CurrentPlayerCard = ({ auction }: Props) => {
  if (!auction?.currentPlayer) {
    return (
      <div className="text-center text-gray-400 text-2xl py-10">
        No Active Player
      </div>
    );
  }

  const player = auction.currentPlayer;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8">
      {/* Player Image */}
      <div className="w-44 h-44 rounded-2xl overflow-hidden shadow-lg border border-gray-700 bg-black">
        <img
          src={player.image || "/images/dummyPlayer.jpg"}
          alt={player.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Player Details */}
      <div className="flex-1 text-center md:text-left space-y-4">
        {/* Name */}
        <h2 className="text-xl font-bold tracking-wide">{player.name}</h2>

        {/* Base Price */}
        <p className="text-lg text-gray-400">
          Base Price:{" "}
          <span className="text-white font-semibold">{player.basePrice}</span>
        </p>

        {auction.currentBid !== 0 && (
          <div>
            <p className="text-sm uppercase tracking-wider text-gray-500">
              Current Bid
            </p>
            <h3 className="text-3xl font-extrabold text-yellow-400 drop-shadow-lg">
              {auction.currentBid}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentPlayerCard;
