import ccThumbnail from "../assets/characters/coolcat/thumbnail.png";
import ccStanding from "../assets/characters/coolcat/standing.png";
import ccVictory from "../assets/characters/coolcat/victory.png";
import ccAttack from "../assets/characters/coolcat/attack.png";
import ccInjured from "../assets/characters/coolcat/injured.png";
import ccDefeat from "../assets/characters/coolcat/defeat.png";

import cpThumbnail from "../assets/characters/cryptopunk/thumbnail.png";
import cpStanding from "../assets/characters/cryptopunk/standing.png";
import cpAttack from "../assets/characters/cryptopunk/attack.png";
import cpInjured from "../assets/characters/cryptopunk/injured.png";
import cpVictory from "../assets/characters/cryptopunk/victory.png";
import cpDefeat from "../assets/characters/cryptopunk/defeat.png";



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
    attack: ccAttack,
    injured: ccInjured,
    victory: ccVictory,
    defeat: ccDefeat,
    isLocked: false
  },
  {
    name: "cryptopunk",
    thumbnail: cpThumbnail,
    standing: cpStanding,
    attack: cpAttack,
    injured: cpInjured,
    victory: cpVictory,
    defeat: cpDefeat,
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
];


export const ATTACK_DURATION = 1200;
export const DAMAGE_DURATION = 1200;