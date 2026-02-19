import { useEffect, useState } from "react";
import type { Team, AuctionData } from "../types/auction";
import { motion } from "framer-motion";
import { getAllTeamService } from "../services/team.service";
import toast from "react-hot-toast";
import TeamsShowcase from "./TeamsShowcase";

interface Props {
  auction?: AuctionData | null;
  refetch?: boolean;
}

const UserTeamsTable = ({ refetch, auction }: Props) => {
  const [teams, setTeams] = useState<Team[]>([]);

  const fetchAllTeams = async (id: string) => {
    try {
      const data = await getAllTeamService(id);
      setTeams(data.teams);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    if (auction?._id) {
      fetchAllTeams(auction?._id);
    }
  }, [auction?._id, refetch]);

  if (!teams?.length) {
    return (
      <div className="text-center text-gray-400 mt-6">No teams available</div>
    );
  }

  return (
    <>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full border-collapse text-center min-w-[700px]">
          {/* HEADER */}
          <thead>
            <tr className="bg-gray-900/80 text-gray-300 uppercase text-sm tracking-wider">
              <th className="py-4 px-4 text-left">Team</th>
              <th className="py-4 px-4">Purse Left</th>
              <th className="py-4 px-4">Players</th>
              <th className="py-4 px-4">Captain</th>
            </tr>
          </thead>

          <tbody>
            {teams.map((team, index) => {
              const players = team.players || [];

              const isActive = auction?.currentHighestTeam?._id === team._id;

              const purse =
                isActive && auction?.currentBid
                  ? team.remainingPurse - auction.currentBid
                  : team.remainingPurse;

              return (
                <motion.tr
                  key={team._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`
                  border-b border-gray-700
                  ${index % 2 === 0 ? "bg-gray-800/60" : "bg-gray-800/30"}
                  hover:bg-gray-700/60 transition
                `}
                >
                  {/* TEAM */}
                  <td className="py-4 px-4 text-left ">
                    <div className="flex items-center gap-3">
                      {/* Logo */}
                      <img
                        src={team.logo}
                        className="w-10 h-10 rounded-full object-cover border border-gray-600"
                      />

                      {/* Name */}
                      <div className="flex flex-col">
                        <span className="text-white font-bold text-lg">
                          {team.teamName}
                        </span>

                        {/* LIVE indicator */}
                        {isActive && (
                          <motion.span
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                            }}
                            className="text-green-400 text-xs font-semibold"
                          >
                            ● BIDDING
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* PURSE */}
                  <td className="py-4 px-4">
                    <motion.span
                      key={purse}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      className={`
                      font-bold text-lg
                      ${purse < 200 ? "text-red-400" : "text-green-400"}
                    `}
                    >
                      ₹{purse.toLocaleString()}
                    </motion.span>
                  </td>

                  {/* PLAYERS COUNT */}
                  <td className="py-4 px-4 text-white font-semibold">
                    {players.length}
                  </td>

                  {/* CAPTAIN */}
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-gray-200">
                        {team.captain?.name}
                      </span>
                    </div>
                  </td>

                  {/* FEMALE */}
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <TeamsShowcase teams={teams} />
    </>
  );
};

export default UserTeamsTable;
