const parseWallet = (wallet: string = '') =>
  `${wallet.slice(0, 6)}...${wallet.slice(-5)}`;

export default parseWallet;
