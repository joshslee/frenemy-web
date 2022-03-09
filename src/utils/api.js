const BASE_URL = "https://frenemyeth.herokuapp.com"

export const fetchDummyData = () => {
  return {
    "p1": "hayden.eth",
    "p2": "0x4f9bebe3adc3c7f647c0023c60f91ac9dffa52d5",
    "steps": [
      {
        "text1": "0x11E4857Bb9993a50c685A79AFad4E6F65D518DDa has 93.65526231578998 ETH balance.",
        "text2": "0x4f9bebe3adc3c7f647c0023c60f91ac9dffa52d5 has 210.47206473460767 ETH balance.",
        "topic": "ETH Balance",
        "winner1": false,
        "winner2": true
      },
      {
        "text1": "0x11E4857Bb9993a50c685A79AFad4E6F65D518DDa has 2597 NFTs..",
        "text2": "0x4f9bebe3adc3c7f647c0023c60f91ac9dffa52d5 has not one single NFT :(",
        "topic": "Total number of NFTs",
        "winner1": true,
        "winner2": false
      },
      {
        "text1": "0x11E4857Bb9993a50c685A79AFad4E6F65D518DDa has 518d as longest hexspeak word with 4 characters and 28 found words.",
        "text2": "0x4f9bebe3adc3c7f647c0023c60f91ac9dffa52d5 has c00 as longest hexspeak word with 3 characters and 20 found words.",
        "topic": "HexSpeak Wordlength",
        "winner1": true,
        "winner2": false
      }
    ],
    "success": true
  }
};

export const fetchGameData = (addressOne, addressTwo) => {
  return fetch(BASE_URL + `/api/battle?p1=${addressOne}&p2=${addressTwo}&steps=3`)
  .then(body => body.json())
  .then(data => addDamagePerRound(data))
  .catch(err => {
    console.log("err",err)
    throw new Error()
  });
};

function addDamagePerRound(data) {
  const { steps } = data;

  const roundsP1Wins = steps.filter(step => step.winner1).length;
  const roundsP2Wins = steps.length - roundsP1Wins;

  const doesP1Win = roundsP1Wins > roundsP2Wins;

  const damage = Math.ceil(100 / (doesP1Win ? roundsP1Wins : roundsP2Wins));
  data.steps = data.steps.map(step => ({
    ...step,
    damage
  }));
  data.success = doesP1Win; //P2 wins if false
  return data;
}

export const getUserNfts = async (address) => {
  if (!window || !window.web3) throw new Error("Web3 not found!")
  const nfts = await window.web3.alchemy.getNfts({
    owner: address,
    withMetadata: true
  });

  return nfts;
}