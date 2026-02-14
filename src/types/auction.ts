export interface Player {
  _id: string;
  name: string;
  image?: string;
  basePrice: number;
  soldPrice?: number;
  gender: string;
  skillLevel: string;
}

export interface Team {
  _id: string;
  teamName: string;
  remainingPurse: number;
  players: Player[];
}

export interface AuctionState {
  currentPlayer: Player | null;
  currentBid: number;
  currentHighestTeam: string | null;
  status: "LIVE" | "NOT_STARTED" | "COMPLETED";
}
