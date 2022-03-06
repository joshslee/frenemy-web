

export const abbreviateEthAddress = (address = "") => {
  const prefix = address.slice(0, 5);
  const suffix = address.slice(-4);
  return prefix + "..." + suffix;
}