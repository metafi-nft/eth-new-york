const { abi } = require("../artifacts/contracts/examples/PingPong.sol/PingPong.json");
const { setup } = require("./setup")

async function callpp() {
  const [pp1Addr, pp2Addr] = await setup();
  console.log("setup done");
  
  const contractABI = abi;

  const [owner] = await hre.ethers.getSigners();
  const pp1contractOwner = new ethers.Contract(pp1Addr, contractABI, owner);
  
  console.log("sending ping")
  await pp1contractOwner.ping(31337, pp2Addr, 0)
}

const runMain = async () => {
  try {
    // await run();
    await callpp();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
