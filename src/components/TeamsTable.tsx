import type { Team, AuctionState } from "../types/auction";

interface Props {
  teams: Team[];
  auction: AuctionState | null;
}

const TeamsTable = ({ teams, auction }: Props) => {
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
            const hasGirl = team.players.some(
              (player) => player.gender === "female",
            );

            const isBidding = auction?.currentHighestTeam === team._id;

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
                <td className="py-3 px-4 font-semibold">{team.teamName}</td>

                <td
                  className={`py-3 px-4 font-bold ${
                    purseToDisplay < 200 ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {purseToDisplay}
                </td>

                <td className="py-3 px-4">{team.players.length}</td>

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
