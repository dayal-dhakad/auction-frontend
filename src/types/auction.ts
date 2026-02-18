export interface Player {
  _id: string;
  name: string;
  image?: string;
  basePrice: number;
  soldPrice?: number;
  gender: string;
  skillLevel: string;
  isSold?: boolean;
  isCaptain?: boolean;
  team: Team;
}

export interface Team {
  _id: string;
  teamName: string;
  purse: number;
  remainingPurse: number;
  players: Player[];
  captain: Player;
  logo?: string;
}

export interface Bid {
  team: string;
  amount: string;
}

export interface CurrentHighestTeam {
  _id: string;
  teamName: string;
  amount: string;
  remainingPurse: number;
  purse: number;
  logo: string;
}
export interface AuctionData {
  _id: string;
  title: string;
  description: string;
  status: "LIVE" | "NOT_STARTED" | "COMPLETED";
  currentPlayer: Player | null;
  currentHighestTeam: CurrentHighestTeam | null;
  currentBid: number;
  order: Player[];
  currentIndex: number;
  bids: Bid[];
}
