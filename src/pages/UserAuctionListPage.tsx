import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAuctionsApi } from "../api/auction.api";
import toast from "react-hot-toast";

interface Auction {
  _id: string;
  title: string;
  description?: string;
  status: "NOT_STARTED" | "LIVE" | "COMPLETED";
  createdAt: string;
}

const UserAuctionListPage = () => {
  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await getAllAuctionsApi();

        const activeAuction = data.auctions.find(
          (a: Auction) => a.status !== "COMPLETED",
        );

        setAuction(activeAuction || null);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Failed to load auction");
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div
      style={{
        backgroundImage: "url(/images/background.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-screen w-full flex items-center justify-center px-6 py-10"
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl text-center">
        {loading && <p className="text-gray-300 text-lg">Loading auction...</p>}

        {!loading && auction && (
          <div
            onClick={() => navigate(`/auction/${auction._id}`)}
            className="
              cursor-pointer
              bg-gradient-to-br from-gray-900/90 to-gray-800/80
              border border-gray-700
              rounded-2xl
              shadow-2xl
              p-8
              hover:scale-105
              hover:border-blue-500
              transition-all duration-300
            "
          >
            {/* Title */}
            <h2 className="text-3xl font-bold text-white mb-3">
              {auction.title}
            </h2>

            {/* Description */}
            <p className="text-gray-300 mb-6 leading-relaxed">
              {auction.description}
            </p>

            {/* Status badge */}
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold
              ${
                auction.status === "LIVE"
                  ? "bg-green-500/20 text-green-400 border border-green-400"
                  : "bg-yellow-500/20 text-yellow-400 border border-yellow-400"
              }
            `}
            >
              {auction.status === "LIVE" ? "🟢 Live Now" : "🟡 Coming Soon"}
            </span>

            {/* Call to action */}
            {auction.status === "LIVE" && (
              <div className="mt-6">
                <button
                  className="
                  px-6 py-3
                  bg-blue-600 hover:bg-blue-700
                  rounded-lg
                  font-semibold
                  text-white
                  shadow-lg
                  transition
                "
                >
                  Enter Auction →
                </button>
              </div>
            )}
          </div>
        )}

        {!loading && !auction && (
          <p className="text-gray-400 text-lg">No active auction available</p>
        )}
      </div>
    </div>
  );
};

export default UserAuctionListPage;
