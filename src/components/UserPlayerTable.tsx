import { useEffect, useState } from "react";
import type { AuctionData, Player } from "../types/auction";
import { motion } from "framer-motion";
import { getAllPlayersService } from "../services/player.service";

interface Props {
  auction?: AuctionData | null;
  refetch?: boolean;
}

const UserPlayerTable = ({ refetch, auction }: Props) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auction?._id) return;

    const fetchPlayers = async () => {
      try {
        const data = await getAllPlayersService(auction?._id);
        setPlayers(data.players);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [auction?._id, refetch]);

  if (loading)
    return (
      <p className="text-center text-gray-400 mt-10">Loading players...</p>
    );

  if (!players.length) {
    return (
      <div className="text-center text-gray-400 mt-6">No players available</div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full border-collapse text-center">
        {/* HEADER */}
        <thead>
          <tr className="bg-gray-900/80 text-gray-300 uppercase text-sm tracking-wider">
            <th className="py-4 px-4 text-left">Player</th>
            <th className="py-4 px-4">Base Price</th>
            <th className="py-4 px-4">Sold Price</th>
            <th className="py-4 px-4">Status</th>
            <th className="py-4 px-4">Team</th>
          </tr>
        </thead>

        <tbody>
          {players.map((player, index) => {
            const isSold = player.isSold;

            return (
              <motion.tr
                key={player._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`
                  border-b border-gray-700
                  ${index % 2 === 0 ? "bg-gray-800/60" : "bg-gray-800/30"}
                  hover:bg-gray-700/60 transition
                `}
              >
                {/* PLAYER */}
                <td className="py-4 px-4 text-left">
                  <div className="flex items-center gap-3">
                    <img
                      src={player.image}
                      className="w-10 h-10 rounded-full object-cover border border-gray-600"
                    />
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-lg">
                        {player.name}
                      </span>

                      {player.isCaptain && (
                        <span className="text-yellow-400 text-xs font-semibold">
                          ⭐ Captain
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* BASE PRICE */}
                <td className="py-4 px-4 text-blue-400 font-semibold">
                  ₹{player.basePrice.toLocaleString()}
                </td>

                {/* SOLD PRICE */}
                <td className="py-4 px-4">
                  {isSold ? (
                    <motion.span
                      key={player.soldPrice}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      className="text-green-400 font-bold text-lg"
                    >
                      ₹{player.soldPrice?.toLocaleString()}
                    </motion.span>
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </td>

                {/* STATUS */}
                <td className="py-4 px-4">
                  {isSold ? (
                    <span className="text-green-400 font-semibold">SOLD</span>
                  ) : (
                    <span className="text-red-400 font-semibold">UNSOLD</span>
                  )}
                </td>

                {/* TEAM */}
                <td className="py-4 px-4">
                  {player.team ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-gray-200">
                        {player.team.teamName}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserPlayerTable;
