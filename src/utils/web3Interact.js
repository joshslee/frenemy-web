import ENS from "ethjs-ens";


function initEnsService() {
  if (typeof window === "object") {
    const { web3 } = window;
    const provider = web3.currentProvider;
    const network = "1";
    const ens = new ENS({ provider, network });

    /*
    DO NOT REMOVE
    this function override needed to get ethjs-ens working.
    https://github.com/ethjs/ethjs/issues/6
    - joshlee
    */
    web3.currentProvider.sendAsync = web3.currentProvider.send;

    window.ens = ens;
  }
}

export const checkIfValidENS = async (ens) => {
  if (!window?.ens) initEnsService();
  try {
    const addressFromEns = await window.ens.lookup(ens);
    if (!addressFromEns) return false
    const ensFromAddress = await window.ens.reverse(addressFromEns);
    // best practice: we need to verify that the ens & address are linked
    return ens === ensFromAddress;
  } catch {
    return false
  }
};

export const isValidEthAddress = (address) => {
  if (!window?.web3) return;
  return window.web3.utils.isAddress(address);
}

