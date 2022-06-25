const LZEndpointMockABI = require("../artifacts/contracts/mocks/LZEndpointMock.sol/LZEndpointMock.json");
const MetafiBridgeABI = require("../artifacts/contracts/eth-nyc/MetafiBridge.sol/MetafiBridge.json");
const { ethers } = require("hardhat");

async function deploy() {
  const LzMock = await hre.ethers.getContractFactory("LZEndpointMock");
  // const greeter = await Greeter.deploy(hre.ethers.BigNumber.from(31337));
  const lzMock = await LzMock.deploy(31337);
  await lzMock.deployed();
  console.log("LZEndpointMock deployed to:", lzMock.address);

  const MetafiBridge = await hre.ethers.getContractFactory("MetafiBridge");
  // sender
  const sender = await MetafiBridge.deploy(lzMock.address);
  await sender.deployed();
  console.log("sender deployed to:", sender.address);
  // receiver
  const receiver = await MetafiBridge.deploy(lzMock.address);
  await receiver.deployed();
  console.log("receiver deployed to:", receiver.address);

  return [lzMock.address, sender.address, receiver.address];
}

async function trfGas(addr) {
  const [owner] = await hre.ethers.getSigners();
 
  tx = {
    to: addr,
    value: ethers.utils.parseEther('1', 'ether')
  };
  await owner.sendTransaction(tx);
  console.log("transferred 1 ETH to", addr)
}

async function setTrustedRemotes(senderAddr, receiverAddr) {
  const contractABI = MetafiBridgeABI.abi;
  const [owner] = await hre.ethers.getSigners();
  const sendercontractOwner = new ethers.Contract(senderAddr, contractABI, owner);
  const receivercontractOwner = new ethers.Contract(receiverAddr, contractABI, owner)

  await sendercontractOwner.setTrustedRemote(31337, receiverAddr)
  console.log("finished setting trusted remote for addr=", senderAddr);

  await receivercontractOwner.setTrustedRemote(31337, senderAddr)
  console.log("finished setting trusted remote for addr=", receiverAddr);
}

async function setDestLzEndpoints(lzAddr, senderAddr, receiverAddr) {
  const contractABI = LZEndpointMockABI.abi;

  const [owner] = await hre.ethers.getSigners();
  const lzmockcontractOwner = new ethers.Contract(lzAddr, contractABI, owner);

  await lzmockcontractOwner.setDestLzEndpoint(senderAddr, lzAddr)
  console.log("finished setting destinaton lz for addr=", senderAddr);

  await lzmockcontractOwner.setDestLzEndpoint(receiverAddr, lzAddr)
  console.log("finished setting destinaton lz for addr=", senderAddr);
}

async function setup() {
  const [lzAddr, senderAddr, receiverAddr] = await deploy();
  await trfGas(senderAddr);
  await trfGas(receiverAddr);

  await setTrustedRemotes(senderAddr, receiverAddr);

  await setDestLzEndpoints(lzAddr, senderAddr, receiverAddr)

  return [senderAddr, receiverAddr];
}

module.exports["setup"] = setup;