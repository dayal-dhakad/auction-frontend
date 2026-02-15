import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import AdminAuctionPage from "./pages/AdminAuctionPage";
import PlayersPage from "./pages/PlayersPage";
import TeamsPage from "./pages/TeamsPage";
import AuctionSetupPage from "./pages/AuctionSetupPage";
import CreateAuctionPage from "./pages/CreateAuctionPage";
import AuctionsListPage from "./pages/AuctionsListPage";
import CreatePlayerPage from "./pages/CreatePlayerPage";
import CreateTeamPage from "./pages/CreateTeamPage";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#111",
          color: "#fff",
          // padding: "20px",
        }}
        className="relative"
      >
        <Link
          className="fixed top-6 left-6 z-50"
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img className="w-14" src="/logo.png" alt="" />
        </Link>
        <Routes>
          <Route path="/" element={<AuctionsListPage />} />
          <Route path="/auction/:id" element={<AdminAuctionPage />} />
          <Route path="/create-auction" element={<CreateAuctionPage />} />
          <Route
            path="/create-player/:auctionId"
            element={<CreatePlayerPage />}
          />
          <Route path="/create-team/:auctionId" element={<CreateTeamPage />} />

          <Route path="/players" element={<PlayersPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/auction/setup" element={<AuctionSetupPage />} />
        </Routes>
      </div>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
