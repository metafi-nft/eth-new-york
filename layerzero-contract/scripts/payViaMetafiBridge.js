const { abi } = require("../artifacts/contracts/eth-nyc/MetafiBridge.sol/MetafiBridge.json");
const { setup } = require("./setup")

async function pay() {
  const [senderAddr, receiverAddr] = await setup();
  console.log("setup done");
  
  const contractABI = abi;

  const dstAddr = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

  const [caller] = await hre.ethers.getSigners();

  console.log(
    "Balances, balance of sendingUser=%s, receivingUser=%s", 
    await ethers.provider.getBalance(caller.address), 
    await ethers.provider.getBalance(dstAddr)
  );

  const senderContractCaller = new ethers.Contract(senderAddr, contractABI, caller);
  
  console.log("calling pay from sender")
  options = {
    value: ethers.utils.parseEther('0.001', 'ether')
  }
  await senderContractCaller.pay(31337, receiverAddr, options.value, dstAddr, options)

  console.log(
    "Balances, balance of sendingUser=%s, receivingUser=%s", 
    await ethers.provider.getBalance(caller.address), 
    await ethers.provider.getBalance(dstAddr)
  );
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
