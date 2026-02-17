import type { Team, AuctionData } from "../types/auction";

interface Props {
  teams: Team[];
  auction?: AuctionData | null;
}

const TeamsTable = ({ teams, auction }: Props) => {
  if (!teams?.length) {
    return <div className="text-center text-sm">Teams Not Available</div>;
  }

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full border-collapse text-center">
        <thead>
          <tr className="bg-gray-700 text-gray-200 uppercase text-sm tracking-wider">
            <th className="py-3 px-4">Team</th>
            <th className="py-3 px-4">Purse Remaining</th>
            <th className="py-3 px-4">Total Players</th>
            <th className="py-3 px-4">Has Girl?</th>
          </tr>
        </thead>

        <tbody>
          {teams.map((team, index) => {
            // ✅ Include captain in player list
            const allPlayers = [...(team.players || [])];

            const hasGirl = allPlayers.some(
              (player) => player.gender === "female",
            );

            const isBidding = auction?.currentHighestTeam?._id === team._id;

            const purseToDisplay =
              isBidding && auction
                ? team.remainingPurse - auction.currentBid
                : team.remainingPurse;

            return (
              <tr
                key={team._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-600 transition`}
              >
                {/* Team Name */}
                <td className="py-3 px-4 font-semibold">{team.teamName}</td>

                {/* Purse */}
                <td
                  className={`py-3 px-4 font-bold ${
                    purseToDisplay < 200 ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {purseToDisplay}
                </td>

                {/* Total Players including captain */}
                <td className="py-3 px-4">{allPlayers.length}</td>

                {/* Has Girl */}
                <td className="py-3 px-4 text-xl">{hasGirl ? "✅" : "❌"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TeamsTable;
