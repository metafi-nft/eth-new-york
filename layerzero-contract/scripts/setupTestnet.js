const LZEndpointMockABI = require("../artifacts/contracts/mocks/LZEndpointMock.sol/LZEndpointMock.json");
const MetafiBridgeABI = require("../artifacts/contracts/eth-nyc/MetafiBridge.sol/MetafiBridge.json");
const { ethers } = require("hardhat");

const lzAddr = hre.network.name == "mumbai" ? "0xf69186dfBa60DdB133E91E9A4B5673624293d8F8":"0x79a63d6d8BBD5c6dfc774dA79bCcD948EAcb53FA"

async function deploy() {
  const MetafiBridge = await hre.ethers.getContractFactory("MetafiBridge");
  // bridge contract
  const bridge = await MetafiBridge.deploy(lzAddr);
  await bridge.deployed();
  console.log("bridge deployed to:", bridge.address);

  return bridge.address;
}

async function trfGas(addr) {
  const [owner] = await hre.ethers.getSigners();
 
  tx = {
    to: addr,
    value: ethers.utils.parseEther('0.01', 'ether')
  };
  await owner.sendTransaction(tx);
  console.log("transferred 0.01 ETH to", addr)
}

async function setTrustedRemotes(senderAddr, receiverAddr) {
  const contractABI = MetafiBridgeABI.abi;
  const [owner] = await hre.ethers.getSigners();
  const sendercontractOwner = new ethers.Contract(senderAddr, contractABI, owner);

  await sendercontractOwner.setTrustedRemote(10001, receiverAddr)
  console.log("finished setting trusted remote for addr=", senderAddr);
}


async function setup() {
  // const [_] = await deploy();
  // await trfGas("0x2D5794CE268394562Ef207570Ddf0EeEA2602e38");
  // await setTrustedRemotes("0xC5a74744dCf229AC040A86f72F07cC9b51232113", "0x2D5794CE268394562Ef207570Ddf0EeEA2602e38");
  await setTrustedRemotes("0x2D5794CE268394562Ef207570Ddf0EeEA2602e38", "0xC5a74744dCf229AC040A86f72F07cC9b51232113");
}

const runMain = async () => {
  try {
    await setup();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();