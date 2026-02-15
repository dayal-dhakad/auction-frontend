import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllAuctionsApi } from "../api/auction.api";
import toast from "react-hot-toast";

interface Auction {
  _id: string;
  title: string;
  description?: string;
  status: "NOT_STARTED" | "LIVE" | "COMPLETED";
  createdAt: string;
}

const AuctionsListPage = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await getAllAuctionsApi();
        setAuctions(data.auctions);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch auctions");
        toast.error(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">🏸 All Auctions</h1>
      <div className="flex items-center justify-center mb-5">
        <Link
          to={"/create-auction"}
          className="bg-amber-800 text-white px-5 py-2 rounded-md hover:bg-amber-900 transition-all duration-150"
        >
          Create Auction
        </Link>
      </div>

      {loading && (
        <p className="text-center text-gray-400">Loading auctions...</p>
      )}

      {error && <p className="text-center text-red-400">{error}</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions?.length > 0 ? (
          auctions.map((auction) => (
            <div
              key={auction._id}
              onClick={() => navigate(`/auction/${auction._id}`)}
              className="bg-gray-800 p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-all duration-200"
            >
              <h2 className="text-xl font-bold mb-2">{auction.title}</h2>

              <p className="text-sm text-gray-400 mb-4">
                {auction.description}
              </p>

              <span
                className={`px-3 py-1 text-xs rounded-full font-semibold ${
                  auction.status === "LIVE"
                    ? "bg-green-600"
                    : auction.status === "COMPLETED"
                      ? "bg-red-600"
                      : "bg-yellow-600"
                }`}
              >
                {auction.status}
              </span>

              <p className="text-xs text-gray-500 mt-4">
                Created: {new Date(auction.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <div className="text-xl my-20 text-center col-span-1 md:col-span-2 lg:col-span-3 w-full">
            <h1>No Auction Found</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionsListPage;
