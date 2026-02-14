import { useEffect, useState } from "react";
import CurrentPlayerCard from "../components/CurrentPlayerCard";
import TeamBidButtons from "../components/TeamBidButtons";
import AuctionControls from "../components/AuctionControls";
import TeamsTable from "../components/TeamsTable";
import type { AuctionState, Team } from "../types/auction";
import { auctionPlayers, dummyTeams } from "../utils/constants";
import { getAuctionByIdService } from "../services/auction.api";
import { useParams } from "react-router-dom";

const AdminAuctionPage = () => {
  const { id } = useParams();
  //   const [teams, setTeams] = useState<Team[]>([]);
  const teams = dummyTeams;
  const dummyAuction: AuctionState = {
    currentPlayer: auctionPlayers[0],
    currentBid: auctionPlayers[0].basePrice,
    currentHighestTeam: "team2",
    status: "LIVE",
  };

  const [auction, setAuction] = useState<AuctionState | null>(dummyAuction);

  useEffect(() => {
    const fetchAuctions = async (id: string) => {
      try {
        const data = await getAuctionByIdService(id);
        // setAuctions(data.auctions);
      } catch (err: any) {
        // setError(err?.response?.data?.message || "Failed to fetch auctions");
      } finally {
        // setLoading(false);
      }
    };
    if (id) {
      fetchAuctions(id);
    }
  }, [id]);

  useEffect(() => {
    setAuction(dummyAuction);
  }, []);

  return (
    <div
      className="w-full max-w-7xl mx-auto px-6 py-8 space-y-8 bg-gradient-to-br 
                  from-gray-900 via-slate-800 to-gray-900
                  text-white"
    >
      {/* Page Title */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
          🏸 Auction Control Panel
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Manage bids, teams and live auction
        </p>
      </div>

      {/* Current Player Section */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <CurrentPlayerCard auction={auction} />
        </div>

        {/* Team Bid Buttons */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-center">Place Bid</h2>
          <TeamBidButtons
            teams={teams}
            auction={auction}
            onBid={(teamId) => {
              // call bid API
            }}
          />
        </div>
      </div>
      {/* Auction Controls */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6">
        <AuctionControls
          onStart={() => {}}
          onNext={() => {}}
          onSell={() => {}}
          onUndo={() => {}}
          onRandomAssign={() => {}}
          onEnd={() => {}}
        />
      </div>

      {/* Teams Summary Table */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Teams Summary
        </h2>
        <TeamsTable teams={teams} auction={auction} />
      </div>
    </div>
  );
};

export default AdminAuctionPage;
