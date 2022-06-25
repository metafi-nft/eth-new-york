const { abi } = require("../artifacts/contracts/eth-nyc/MetafiBridge.sol/MetafiBridge.json");

async function pay() {  
  const contractABI = abi;
  const srcMetafiAddress = "0xC5a74744dCf229AC040A86f72F07cC9b51232113";
  const dstMetafiAddr = "0x2D5794CE268394562Ef207570Ddf0EeEA2602e38";
  
  const dstWalletAddr = "0x40562Cf2E90f23b3969d782B5c8f134A77069b49";
  
  const [caller] = await hre.ethers.getSigners();
  const senderContractCaller = new ethers.Contract(srcMetafiAddress, contractABI, caller);

  console.log("Balances, balance of sendingWallet=", await ethers.provider.getBalance(caller.address));
  // function pay(
  //   uint16 _dstChainId, // pay to this destination chainId
  //   address _dstMetafiBridgeAddr, // destination address of MetafiBridge contract
  //   uint amount,
  //   address dstAddr 
  
  console.log("calling pay from sender wallet")
  options = {
    value: ethers.utils.parseEther('0.0011293', 'ether')
  }
  await senderContractCaller.pay(10009, dstMetafiAddr, options.value, dstWalletAddr, options)

  console.log("Balances, balance of sendingWallet=", await ethers.provider.getBalance(caller.address));
}

const runMain = async () => {
  try {
    // await run();
    await pay();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
