import { useState } from "react";
import { createAuctionService } from "../services/auction.service";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateAuctionPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      toast.error("Title is required");

      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      await createAuctionService({
        title,
        description,
      });

      setSuccess("Auction created successfully 🎉");
      setTitle("");
      setDescription("");
      setTimeout(() => {
        navigate("/auctions");
      }, 1500);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err.message || "Something went wrong",
      );
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex flex-col items-center justify-center text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          🏸 Create Auction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-semibold">
              Auction Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter auction title"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter description"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Auction"}
          </button>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {success && (
            <p className="text-green-400 text-sm text-center">{success}</p>
          )}
        </form>
      </div>
      <div className="flex items-center justify-center">
        <Link
          to={"/"}
          className="bg-amber-800 text-white px-5 py-2 my-5 rounded-md hover:bg-amber-900 transition-all duration-150"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CreateAuctionPage;
