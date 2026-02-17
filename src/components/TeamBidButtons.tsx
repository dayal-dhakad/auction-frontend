import type { AuctionData, Team } from "../types/auction";

interface Props {
  teams: Team[];
  auction: AuctionData | null;
  onBid: (teamId: string) => void;
  disabled: boolean;
}

const TeamBidButtons = ({ teams, auction, onBid, disabled }: Props) => {
  const isAuctionLive = auction?.status === "LIVE";

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {teams.map((team) => (
        <button
          key={team._id}
          onClick={() => onBid(team._id)}
          disabled={
            !isAuctionLive ||
            disabled ||
            team._id === auction.currentHighestTeam?._id
          }
          className="
              px-2 py-2 rounded-lg 
                     shadow-md text-sm font-semibold
            bg-blue-600 hover:bg-blue-700 disabled:bg-red-600
            text-white 
            transition-all duration-200 hover:scale-105 disabled:scale-100 disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {team.teamName}
        </button>
      ))}
    </div>
  );
};

export default TeamBidButtons;
