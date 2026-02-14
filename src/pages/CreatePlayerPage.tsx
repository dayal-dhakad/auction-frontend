import { useState } from "react";
import { createPlayerService } from "../services/player.service";
import type { SkillLevel, Gender } from "../types/player";

const CreatePlayerPage = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [skillLevel, setSkillLevel] = useState<SkillLevel>("medium");
  const [gender, setGender] = useState<Gender>("male");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      await createPlayerService({
        name,
        image,
        skillLevel,
        gender,
      });

      setSuccess("Player created successfully 🎉");
      setName("");
      setImage("");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          🏸 Create Player
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-semibold">
              Player Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter player name"
            />
          </div>

          {/* Skill Level */}
          <div>
            <label className="block mb-2 text-sm font-semibold">
              Skill Level
            </label>
            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value as SkillLevel)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="elite">Elite</option>
              <option value="strong">Strong</option>
              <option value="medium">Medium</option>
              <option value="beginner">Beginner</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2 text-sm font-semibold">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold">Image</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter Image Url"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Player"}
          </button>

          {/* Messages */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {success && (
            <p className="text-green-400 text-sm text-center">{success}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreatePlayerPage;
