const ethers = require("ethers")

exports.generateEthereumWallet = () => {
  // Generate a new Ethereum wallet
  const wallet = ethers.Wallet.createRandom();

  // Retrieve the address and private key
  const publicKey = wallet.publicKey;
  const privateKey = wallet.privateKey;
  

  return { publicKey, privateKey };
};