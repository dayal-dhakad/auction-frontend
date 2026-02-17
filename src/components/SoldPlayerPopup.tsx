import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

type Props = {
  player: any;
  show: boolean;
  onClose: () => void;
};

const SoldPlayerPopup = ({ player, show }: Props) => {
  if (!player) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed inset-0 z-[999]
            flex items-center justify-center
            bg-black/80 backdrop-blur-md
          "
        >
          {/* Confetti */}
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={400}
            recycle={false}
          />

          {/* Popup card */}
          <motion.div
            initial={{ scale: 0.5, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="
              relative
              bg-gradient-to-br from-green-900/90 to-black/90
              border border-green-400/30
              rounded-3xl
              p-10
              shadow-[0_0_80px_rgba(34,197,94,0.6)]
              text-center
              min-w-[400px]
            "
          >
            {/* SOLD text */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                textShadow: [
                  "0 0 10px #22c55e",
                  "0 0 40px #22c55e",
                  "0 0 10px #22c55e",
                ],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
              className="
                text-green-400 text-5xl font-extrabold mb-6
                tracking-widest
              "
            >
              SOLD
            </motion.div>

            {/* Player image */}
            <motion.img
              src={player.image}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="
                w-40 h-40 rounded-full mx-auto mb-4
                border-4 border-green-400
                shadow-[0_0_40px_rgba(34,197,94,0.8)]
              "
            />

            {/* Player name */}
            <div className="text-white text-3xl font-bold mb-2">
              {player.name}
            </div>

            {/* Team logo */}
            <img src={player.team.logo} className="w-20 mx-auto mb-2" />

            {/* Team name */}
            <div className="text-blue-400 text-xl font-semibold mb-4">
              {player.team.teamName}
            </div>

            {/* Sold price */}
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="
                text-green-400 text-4xl font-extrabold
                drop-shadow-[0_0_20px_rgba(34,197,94,1)]
              "
            >
              ₹{player.soldPrice.toLocaleString()}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SoldPlayerPopup;
