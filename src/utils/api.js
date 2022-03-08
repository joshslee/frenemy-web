// const BASE_URL = "http://localhost:8000";
const BASE_URL = "https://frenemyeth.herokuapp.com/api"

// https://frenemyeth.herokuapp.com/api/battle?p1=hayden.eth&p2=0x4f9bebe3adc3c7f647c0023c60f91ac9dffa52d5&seed=1

export const fetchDummyData = () => {
  // fetch(BASE_URL + "/battle?p1=hayden.eth&p2=0x4f9bebe3adc3c7f647c0023c60f91ac9dffa52d5&seed=1")
  // .then(body => body.json())
  // .then(data => data)
  // .catch(err => err);

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
        "text1": "0x11E4857Bb9993a50c685A79AFad4E6F65D518DDa has 518d as longest hexspeak word with 4 characters and 28 found words",
        "text2": "0x4f9bebe3adc3c7f647c0023c60f91ac9dffa52d5 has c00 as longest hexspeak word with 3 characters and 20 found words",
        "topic": "HexSpeak Wordlength",
        "winner1": true,
        "winner2": false
      }
    ],
    "success": true
  }
};

export const fetchGameData = (addressOne, addressTwo) => {

  // return dummy data for demo:
  return fetchDummyData();

  // we can send back data from alchemy
  fetch(BASE_URL + `/api/game/?p1=${addressOne}&p2=${addressTwo}&seed=1`)
  .then(body => body.json())
  .then(data => data)
  .catch(err => err);
};


export const getUserNfts = async (address) => {
  if (!window || !window.web3) throw new Error("Web3 not found!")
  const nfts = await window.web3.alchemy.getNfts({
    owner: address,
    withMetadata: true
  });

  return nfts;
}