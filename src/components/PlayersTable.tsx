import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllPlayersService } from "../services/player.service";

interface Player {
  _id: string;
  name: string;
  gender: "male" | "female";
  skillLevel: string;
  basePrice: number;
  soldPrice: number;
  isSold: boolean;
  isCaptain: boolean;
  image?: string;
  team?: {
    _id: string;
    teamName: string;
  } | null;
}

const AuctionPlayersTable = ({ refetch }: { refetch: boolean }) => {
  const { id: auctionId } = useParams();

  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auctionId) return;

    const fetchPlayers = async () => {
      try {
        const data = await getAllPlayersService(auctionId);
        setPlayers(data.players);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [auctionId, refetch]);

  if (loading)
    return (
      <p className="text-center text-gray-400 mt-10">Loading players...</p>
    );

  if (!players?.length) {
    return <div className="text-center text-sm">Teams Not Available</div>;
  }

  return (
    <div className="mt-10 overflow-x-auto">
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="bg-gray-700 text-gray-200 uppercase text-sm">
            <th className="py-3 px-4">Image</th>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Skill</th>
            <th className="py-3 px-4">Gender</th>
            <th className="py-3 px-4">Base Price</th>
            <th className="py-3 px-4">Sold Price</th>
            <th className="py-3 px-4">Team</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {players &&
            players.map((player, index) => (
              <tr
                key={player._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-600`}
              >
                {/* Image */}
                <td className="py-2 px-4">
                  <img
                    src={player.image || "/images/dummyPlayer.png"}
                    alt={player.name}
                    className="w-10 h-10 rounded-full mx-auto object-cover"
                  />
                </td>

                {/* Name */}
                <td className="py-2 px-4 font-semibold">
                  {player.name} {player.isCaptain && "(C)"}
                </td>

                {/* Skill */}
                <td className="py-2 px-4 capitalize">{player.skillLevel}</td>

                {/* Gender */}
                <td className="py-2 px-4">
                  {player.gender === "female" ? "♀️ Female" : "♂️ Male"}
                </td>

                {/* Base Price */}
                <td className="py-2 px-4">{player.basePrice}</td>

                {/* Sold Price */}
                <td className="py-2 px-4">
                  {player.isSold ? player.soldPrice : "-"}
                </td>

                {/* Team */}
                <td className="py-2 px-4">
                  {player.team ? player.team.teamName : "-"}
                </td>

                {/* Status */}
                <td className="py-2 px-4">
                  {player.isSold ? (
                    <span className="text-green-400 font-bold">SOLD</span>
                  ) : (
                    <span className="text-yellow-400 font-bold">UNSOLD</span>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuctionPlayersTable;
