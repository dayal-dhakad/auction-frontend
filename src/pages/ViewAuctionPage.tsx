import { useEffect, useState } from "react";
import { getAuctionByIdService } from "../services/auction.service";
import type { AuctionData } from "../types/auction";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getPlayerById } from "../api/player.api";
import SoldPlayerPopup from "../components/SoldPlayerPopup";
import UserTeamsTable from "../components/UserTeamsTable";
import UserPlayerTable from "../components/UserPlayerTable";

const ViewAuctionPage = () => {
  const { id } = useParams();
  const [auctionData, setAuctionData] = useState<AuctionData>();
  const [lastPlayerId, setLastPlayerId] = useState<string | null>(null);
  const [refetch, setRefetch] = useState(false);
  const [soldPlayer, setSoldPlayer] = useState<any>(null);

  const [showSoldPopup, setShowSoldPopup] = useState(false);

  const fetchPlayer = async (id: string) => {
    try {
      const data = await getPlayerById(id);

      if (data.player?.isSold) {
        setSoldPlayer(data.player);
        setShowSoldPopup(true);

        // auto close after 3 sec
        setTimeout(() => {
          setShowSoldPopup(false);
        }, 7000);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to fetch player");
    }
  };

  const fetchAuction = async (id: string) => {
    try {
      const data = await getAuctionByIdService(id);
      if (data.auction.status === "COMPLETED") {
        setRefetch((prev) => !prev);
      }
      setAuctionData(data.auction);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to fetch auction");
    }
  };

  useEffect(() => {
    if (id) {
      fetchAuction(id);

      const interval = setInterval(() => {
        fetchAuction(id);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [id]);

  useEffect(() => {
    if (!auctionData?.currentPlayer?._id) return;

    const currentId = auctionData.currentPlayer._id;

    // first time just store id
    if (!lastPlayerId) {
      setLastPlayerId(currentId);
      return;
    }

    // if changed → previous player sold
    if (lastPlayerId !== currentId) {
      fetchPlayer(lastPlayerId);
      setLastPlayerId(currentId);
      setRefetch((prev) => !prev);
    }
  }, [auctionData?.currentPlayer?._id]);

  const player = auctionData?.currentPlayer;
  const highestTeam = auctionData?.currentHighestTeam;

  return (
    <>
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        style={{
          backgroundImage: "url(/images/background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="min-h-screen py-5 w-full relative flex items-center justify-center overflow-hidden"
      >
        {/* Dark cinematic overlay */}
        {/* <div className="absolute inset-0 bg-black/60 backdrop-blur-md" /> */}

        {/* Gradient highlight */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl px-0 md:px-6">
          {/* Auction Title */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-wider drop-shadow-lg">
              {auctionData?.title || "Auction Arena"}
            </h1>

            {/* LIVE indicator */}
            {auctionData?.status === "LIVE" && (
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-red-500 font-bold mt-2 text-lg tracking-widest"
              >
                🔴 LIVE AUCTION
              </motion.div>
            )}
          </motion.div>

          {/* Player Card */}
          <AnimatePresence mode="wait">
            {auctionData?.status === "LIVE" && player && (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6 }}
                className="
                flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10
                bg-white/10 backdrop-blur-xl
                border border-white/20
                rounded-3xl shadow-2xl
                p-4 md:p-10
              "
              >
                {/* Player Image */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <img
                    src={player.image || "/images/dummyPlayer.png"}
                    alt={player.name}
                    className="
                    w-40 h-40 md:w-72 md:h-72 object-cover rounded-2xl
                    border-4 border-white/20
                    shadow-[0_0_30px_rgba(255,255,255,0.2)]
                  "
                  />

                  {/* glow effect */}
                  <div className="absolute inset-0 rounded-2xl shadow-[0_0_60px_rgba(59,130,246,0.3)]" />
                </motion.div>

                {/* Player Info */}
                <div className="text-center md:text-left space-y-6">
                  {/* Player Name */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="
      text-2xl md:text-5xl font-extrabold text-white
      tracking-wide
      drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]
    "
                  >
                    {player.name}
                  </motion.h2>

                  {/* Base Price */}
                  <div
                    className="
    inline-flex items-center gap-3
    bg-yellow-500/10 border border-yellow-400/30
    px-5 py-2 rounded-xl
    backdrop-blur-md
  "
                  >
                    <span className="text-yellow-400 font-semibold text-lg">
                      Base Price
                    </span>

                    <span
                      className="
      text-yellow-300 font-bold text-2xl
      drop-shadow-[0_0_10px_rgba(234,179,8,0.7)]
    "
                    >
                      ₹{player.basePrice.toLocaleString()}
                    </span>
                  </div>

                  {/* CURRENT BID — MAIN HIGHLIGHT */}
                  {auctionData.currentBid > 0 && (
                    <motion.div
                      key={auctionData.currentBid}
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="
        relative
        bg-green-500/10
        border border-green-400/30
        rounded-2xl
        px-8 py-5
        backdrop-blur-xl
        overflow-hidden
      "
                    >
                      {/* Glow animation background */}
                      <motion.div
                        animate={{
                          opacity: [0.2, 0.4, 0.2],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="
          absolute inset-0
          bg-green-400/10
          blur-xl
        "
                      />

                      {/* Label */}
                      <div className="text-green-300 text-lg font-medium mb-1 relative">
                        CURRENT BID
                      </div>

                      {/* Money display */}
                      <motion.div
                        key={auctionData.currentBid}
                        initial={{ scale: 1.5 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 10,
                        }}
                        className="
          relative
          flex items-center md:justify-start justify-center gap-3
        "
                      >
                        {/* Rupee symbol badge */}
                        {/* <div
                        className="
          bg-green-400 text-black
          font-bold
          px-3 py-1
          rounded-lg
          text-xl
          shadow-lg
        "
                      >
                        ₹
                      </div> */}

                        {/* Amount */}
                        <motion.span
                          animate={{
                            textShadow: [
                              "0px 0px 10px rgba(34,197,94,0.5)",
                              "0px 0px 25px rgba(34,197,94,1)",
                              "0px 0px 10px rgba(34,197,94,0.5)",
                            ],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                          className="
            text-2xl  md:text-5xl font-extrabold text-green-400
            tracking-wider
          "
                        >
                          {auctionData.currentBid.toLocaleString()}
                        </motion.span>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Leading Team */}
                  {highestTeam && (
                    <div
                      className="
      flex flex-col md:flex-row   items-center gap-4
      bg-blue-500/10 border border-blue-400/30
      px-6 py-3 rounded-xl
      backdrop-blur-md
    "
                    >
                      <span className="text-blue-300 whitespace-nowrap font-medium text-lg">
                        Leading Team :
                      </span>
                      <motion.span
                        animate={{
                          textShadow: [
                            "0px 0px 0px rgba(59,130,246,0)",
                            "0px 0px 25px rgba(59,130,246,1)",
                            "0px 0px 0px rgba(59,130,246,0)",
                          ],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="
          text-blue-400 font-extrabold text-3xl
          tracking-wide
        "
                      >
                        <img src={highestTeam.logo} className="w-10" alt="" />
                      </motion.span>

                      <motion.span
                        animate={{
                          textShadow: [
                            "0px 0px 0px rgba(59,130,246,0)",
                            "0px 0px 25px rgba(59,130,246,1)",
                            "0px 0px 0px rgba(59,130,246,0)",
                          ],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="
          text-blue-400 font-extrabold text-3xl
          tracking-wide
        "
                      >
                        {highestTeam.teamName}
                      </motion.span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Coming Soon */}
          {auctionData?.status === "NOT_STARTED" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
              text-center text-white text-4xl font-bold
              bg-white/10 backdrop-blur-lg
              p-10 rounded-2xl
              border border-white/20
            "
            >
              Auction Coming Soon...
            </motion.div>
          )}

          {/* Completed */}
          {auctionData?.status === "COMPLETED" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
              text-center text-white text-4xl font-bold
              bg-white/10 backdrop-blur-lg
              p-10 rounded-2xl
              border border-white/20
            "
            >
              Auction Completed
            </motion.div>
          )}

          <UserTeamsTable auction={auctionData} refetch={refetch} />
          <UserPlayerTable auction={auctionData} refetch={refetch} />
        </div>
      </motion.div>

      <SoldPlayerPopup
        player={soldPlayer}
        show={showSoldPopup}
        onClose={() => setShowSoldPopup(false)}
      />
    </>
  );
};

export default ViewAuctionPage;
