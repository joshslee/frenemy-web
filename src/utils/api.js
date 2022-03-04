const BASE_URL = "http://localhost:8000";

export const fetchGameData = (addressOne, addressTwo) => {
  // we can send back data from alchemy
  fetch(BASE_URL + `/game/?eth_address_one=${addressOne}&eth_address_two=${addressTwo}`)
  .then(body => body.json())
  .then(data => data)
  .catch(err => err);
};


export const getUserNfts = async (address) => {
  if (!window || !window.web3) throw new Error("Web3 not found!")
  const nfts = await web3.alchemy.getNfts({
    owner: address,
    withMetadata: true
  });

  return nfts;
}