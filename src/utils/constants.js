import ccThumbnail from "../assets/characters/coolcat/thumbnail.png";
import ccStanding from "../assets/characters/coolcat/standing.png";
import ccVictory from "../assets/characters/coolcat/victory.png";

import cpThumbnail from "../assets/characters/cryptopunk/thumbnail.png";
import cpStanding from "../assets/characters/cryptopunk/standing.png";
import cpVictory from "../assets/characters/cryptopunk/victory.png";

import unknown from "../assets/unknown.png";

export const GAME_SUBTITLE = "The Ultimate Ethereum Wallet Battle";

export const ETH_WALLET_PLACEHOLDER = (player) => {
  return `Enter Player ${player} Wallet Address, ENS`;
}

export const PLAYABLE_CHARACTERS = [
  {
    name: "cool cat",
    thumbnail: ccThumbnail,
    standing: ccStanding,
    victory: ccVictory,
    isLocked: false
  },
  {
    name: "cryptopunk",
    thumbnail: cpThumbnail,
    standing: cpStanding,
    victory: cpVictory,
    isLocked: false
  },
  {
    name: "blank1",
    thumbnail: unknown,
    isLocked: true
  },
  {
    name: "blank2",
    thumbnail: unknown,
    isLocked: true
  },
  {
    name: "blank3",
    thumbnail: unknown,
    isLocked: true
  }
]