import { useEffect, useState } from "react";
import CurrentPlayerCard from "../components/CurrentPlayerCard";
import TeamBidButtons from "../components/TeamBidButtons";
import AuctionControls from "../components/AuctionControls";
import TeamsTable from "../components/TeamsTable";
import type { AuctionData, Team } from "../types/auction";
import {
  bidOnPlayerService,
  getAuctionByIdService,
  startAuctionService,
} from "../services/auction.service";
import { useParams } from "react-router-dom";
import { getAllTeamService } from "../services/team.service";
import AuctionPlayersTable from "../components/PlayersTable";
import toast from "react-hot-toast";
import {
  randomAssignBidApi,
  sellPlayerApi,
  undoLastBidApi,
} from "../api/auction.api";

const AdminAuctionPage = () => {
  const { id } = useParams();
  const [teams, setTeams] = useState<Team[]>([]);
  const [auctionData, setAuctionData] = useState<AuctionData>();
  const [error, setError] = useState<string | null>(null);
  const [isBidding, setIsBidding] = useState<boolean>(false);
  const [refetch, setRefetch] = useState<boolean>(false);

  const fetchAuction = async (id: string) => {
    try {
      const data = await getAuctionByIdService(id);
      setAuctionData(data.auction);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch auctions");
      toast.error(err?.response?.data?.message);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchAuction(id);
    }
  }, [id]);

  const handleStartAuction = async () => {
    if (!id) {
      return;
    }
    try {
      const data = await startAuctionService(id);
      if (data) {
        fetchAuction(id);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to Start auction");
      toast.error(err?.response?.data?.message);
    }
  };
  // const handleEndAuction = async () => {
  //   if (!id) {
  //     return;
  //   }
  //   try {
  //     const data = await endAuctionService(id);
  //     if (data) {
  //       toast.success("Auction Ended");
  //       setTimeout(() => {
  //         navigate("/");
  //       }, 1500);
  //     }
  //   } catch (err: any) {
  //     setError(err?.response?.data?.message || "Failed to Start auction");
  //     toast.error(err?.response?.data?.message);
  //   }
  // };

  const fetchAllTeams = async (id: string) => {
    try {
      const data = await getAllTeamService(id);
      setTeams(data.teams);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch teams");
      toast.error(err?.response?.data?.message);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchAllTeams(id);
    }
  }, [id]);

  const handleBidOnPlayer = async (id: string, teamId: string) => {
    setIsBidding(true);
    setError(null);
    try {
      const data = await bidOnPlayerService(id, teamId);
      if (data) {
        toast.success(`Bid By ${data?.auction?.currentHighestTeam?.teamName}`);
        fetchAuction(id);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to Bid");
      toast.error(err?.response?.data?.message);
    } finally {
      setIsBidding(false);
    }
  };

  const handleSell = async () => {
    try {
      if (!id) return;

      const data = await sellPlayerApi(id);
      toast.success(`SOLD to ${data?.buyerTeam?.teamName}`);

      fetchAuction(id);
      fetchAllTeams(id);
      setRefetch((prev) => !prev);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Sell failed");
    }
  };
  const handleUndoLastBid = async () => {
    try {
      if (!id) return;

      await undoLastBidApi(id);
      fetchAllTeams(id);
      fetchAuction(id);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Undo failed");
    }
  };
  const handleRandomAssign = async () => {
    try {
      if (!id) return;

      const data = await randomAssignBidApi(id);
      toast.success(`Sold To ${data?.team?.teamName}`);
      fetchAuction(id);
      fetchAllTeams(id);
      setRefetch((prev) => !prev);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Undo failed");
    }
  };
  // Need to create separate page for teams with captain
  return (
    <div
      className="w-full max-w-7xl mx-auto px-6 py-8 space-y-8 bg-gradient-to-br 
                  from-gray-900 via-slate-800 to-gray-900
                  text-white"
    >
      {/* Page Title */}
      {error && <p className="text-center text-red-400">{error}</p>}

      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
          🏸 Auction Control Panel
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Manage bids, teams and live auction
        </p>
      </div>

      {/* Current Player Section */}
      {auctionData && auctionData.status === "LIVE" && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-xl shadow-lg p-6">
            <CurrentPlayerCard auction={auctionData} />
          </div>

          {/* Team Bid Buttons */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Place Bid
            </h2>
            <TeamBidButtons
              teams={teams}
              auction={auctionData}
              disabled={isBidding}
              onBid={(teamId) => {
                if (id) {
                  handleBidOnPlayer(id, teamId);
                }
              }}
            />
          </div>
        </div>
      )}
      {/* Auction Controls */}
      {auctionData && auctionData.status !== "COMPLETED" && (
        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <AuctionControls
            teams={teams}
            onStart={() => {
              handleStartAuction();
            }}
            // onNext={() => {}}
            onSell={() => {
              handleSell();
            }}
            onUndo={() => {
              handleUndoLastBid();
            }}
            onRandomAssign={() => {
              handleRandomAssign();
            }}
            // onEnd={() => {
            //   handleEndAuction();
            // }}
            auctionData={auctionData}
          />
        </div>
      )}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Teams Summary
        </h2>
        <TeamsTable teams={teams} auction={auctionData} />
      </div>

      <div className="bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Players Summary
        </h2>
        <AuctionPlayersTable refetch={refetch} />
      </div>
    </div>
  );
};

export default AdminAuctionPage;
