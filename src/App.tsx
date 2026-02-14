import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminAuctionPage from "./pages/AdminAuctionPage";
import PlayersPage from "./pages/PlayersPage";
import TeamsPage from "./pages/TeamsPage";
import AuctionSetupPage from "./pages/AuctionSetupPage";
import CreateAuctionPage from "./pages/CreateAuctionPage";
import AuctionsListPage from "./pages/AuctionsListPage";
import CreatePlayerPage from "./pages/CreatePlayerPage";
import CreateTeamPage from "./pages/CreateTeamPage";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#111",
          color: "#fff",
          padding: "20px",
        }}
      >
        <Routes>
          <Route path="/" element={<AuctionsListPage />} />
          <Route path="/auction/:id" element={<AdminAuctionPage />} />
          <Route path="/create-auction" element={<CreateAuctionPage />} />
          <Route path="/create-player" element={<CreatePlayerPage />} />
          <Route path="/create-team" element={<CreateTeamPage />} />

          <Route path="/players" element={<PlayersPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/auction/setup" element={<AuctionSetupPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
