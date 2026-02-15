import { useEffect, useState } from "react";
import { createTeamService } from "../services/team.service";
import { getAllPlayersService } from "../services/player.service";
import { createTeamFormSchema } from "../validations/team.schema";
import { useNavigate, useParams } from "react-router-dom";
import { getAuctionByIdService } from "../services/auction.service";
import type { AuctionData } from "../types/auction";

interface Player {
  _id: string;
  name: string;
}

interface FormState {
  teamName: string;
  captain: string;
  logo: string;
}

const CreateTeamPage = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const { auctionId } = useParams();
  const navigate = useNavigate();
  const [auctionData, setAuctionData] = useState<AuctionData>();
  const [form, setForm] = useState<FormState>({
    teamName: "",
    captain: "",
    logo: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // 🔥 Fetch Players for Captain Dropdown
  useEffect(() => {
    const fetchPlayers = async (auctionId: string) => {
      try {
        const data = await getAllPlayersService(auctionId);
        setPlayers(data.players || []);
      } catch {
        setError("Failed to load players");
      }
    };
    if (auctionId) {
      fetchPlayers(auctionId);
    }
  }, [auctionId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auctionId) {
      return;
    }
    const result = createTeamFormSchema.safeParse(form);

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      await createTeamService({
        ...form,
        logo: form.logo || undefined,
        auctionId,
      });

      setSuccess("Team created successfully 🎉");

      setForm({
        teamName: "",
        captain: "",
        logo: "",
      });
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAuctions = async (id: string) => {
      try {
        const data = await getAuctionByIdService(id);
        setAuctionData(data.auction);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch auctions");
      } finally {
        setLoading(false);
      }
    };
    if (auctionId) {
      fetchAuctions(auctionId);
    }
  }, [auctionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center">🏸 Create Team</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">
            Auction Name
          </label>
          <p className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500">
            {auctionData?.title}
          </p>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">
            Auction Description
          </label>
          <p className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500">
            {auctionData?.description}
          </p>
        </div>
        <form onSubmit={handleSubmit} className=" grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-semibold">
              Team Name
            </label>
            <input
              type="text"
              name="teamName"
              value={form.teamName}
              onChange={handleChange}
              placeholder="Enter Team Name"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Captain Dropdown */}
          <div>
            <label className="block mb-2 text-sm font-semibold">
              Select Captain
            </label>
            <select
              name="captain"
              value={form.captain}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500"
            >
              <option value="">-- Select Captain --</option>
              {players?.length !== 0 &&
                players.map((player) => (
                  <option key={player._id} value={player._id}>
                    {player.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Logo URL */}
          <div>
            <label className="block mb-2 text-sm font-semibold">
              Logo URL (Optional)
            </label>
            <input
              type="text"
              name="logo"
              value={form.logo}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 "
            />
          </div>
          <div></div>
          {/* Submit */}

          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={loading}
            className="w-full bg-red-600 mt-5 hover:bg-red-700 py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105 disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading || players?.length === 0}
            className="w-full bg-green-600 mt-5 hover:bg-green-700 py-3 rounded-xl font-bold transition disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Team"}
          </button>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {success && (
            <p className="text-green-400 text-sm text-center">{success}</p>
          )}
        </form>
        {players?.length === 0 && (
          <p className="my-5 text-red-500 text-center">
            {" "}
            Please Create Atleast one player
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateTeamPage;
