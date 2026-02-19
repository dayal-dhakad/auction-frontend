import type { Team } from "../types/auction";

interface Props {
  teams: Team[];
}

const MAX_PLAYERS = 6;

const TeamsShowcase = ({ teams }: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
        {teams.map((team) => {
          const captain = team.players.find((p) => p.isCaptain);
          const otherPlayers = team.players.filter((p) => !p.isCaptain);

          const emptySlots = MAX_PLAYERS - team.players.length;

          return (
            <div
              key={team._id}
              className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-6"
            >
              {/* 🔷 Team Header */}
              <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={team.logo}
                    alt={team.teamName}
                    className="w-14 h-14 rounded-full border border-gray-700"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {team.teamName}
                    </h2>
                    <p className="text-sm text-gray-400">
                      Purse Remaining:{" "}
                      <span className="text-green-400 font-semibold">
                        {team.remainingPurse}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* 👑 Captain Card */}
              {captain && (
                <div className="mb-6">
                  <h3 className="text-sm text-yellow-400 font-semibold mb-2">
                    Captain
                  </h3>
                  <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-400/10 border border-yellow-500 rounded-xl p-4 flex items-center gap-4">
                    <img
                      src={captain.image}
                      alt={captain.name}
                      className="w-16 h-16 rounded-full border-2 border-yellow-400"
                    />
                    <div>
                      <p className="text-white font-bold">{captain.name}</p>
                      {/* <p className="text-gray-400 text-sm">
                        {captain.skillLevel.toUpperCase()}
                      </p> */}
                    </div>
                  </div>
                </div>
              )}

              {/* 👥 Other Players */}
              <h3 className="text-sm text-blue-400 font-semibold mb-2">
                Team Members
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {otherPlayers.map((player) => (
                  <div
                    key={player._id}
                    className="bg-gray-800 border border-gray-700 rounded-xl p-3 flex items-center gap-3"
                  >
                    <img
                      src={player.image}
                      alt={player.name}
                      className="w-12 h-12 rounded-full border border-gray-600"
                    />
                    <div>
                      <p className="text-white text-sm font-semibold">
                        {player.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        Base Price: {player.basePrice}
                      </p>
                    </div>
                  </div>
                ))}

                {/* ⬜ Empty Slots */}
                {Array.from({ length: emptySlots }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="bg-gray-800/40 border-2 border-dashed border-gray-700 rounded-xl p-3 flex items-center justify-center"
                  >
                    <span className="text-gray-500 text-sm">Empty Slot</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamsShowcase;
