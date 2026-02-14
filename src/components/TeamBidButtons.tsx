import type { AuctionState, Team } from "../types/auction";

interface Props {
  teams: Team[];
  auction: AuctionState | null;
  onBid: (teamId: string) => void;
}

const TeamBidButtons = ({ teams, auction, onBid }: Props) => {
  const isAuctionLive = auction?.status === "LIVE";

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {teams.map((team) => (
        <button
          key={team._id}
          onClick={() => onBid(team._id)}
          disabled={!isAuctionLive}
          className={`
            py-4 px-6 rounded-xl text-lg font-semibold
            bg-blue-600 hover:bg-blue-700
            text-white shadow-md
            transition-all duration-200 hover:scale-105
            ${!isAuctionLive ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {team.teamName}
        </button>
      ))}
    </div>
  );
};

export default TeamBidButtons;
