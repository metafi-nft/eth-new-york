const hre = require("hardhat");

export async function deploy() {
  const LzMock = await hre.ethers.getContractFactory("LZEndpointMock");
  // const greeter = await Greeter.deploy(hre.ethers.BigNumber.from(31337));
  const lzMock = await LzMock.deploy(31337);
  await lzMock.deployed();
  console.log("LZEndpointMock deployed to:", lzMock.address);

  const PingPong = await hre.ethers.getContractFactory("PingPong");
  // pp1
  const pingPong1 = await PingPong.deploy(lzMock.address);
  await pingPong1.deployed();
  console.log("PingPong1 deployed to:", pingPong1.address);
  // pp2
  const pingPong2 = await PingPong.deploy(lzMock.address);
  await pingPong2.deployed();
  console.log("PingPong2 deployed to:", pingPong2.address);

  return [lzMock.address, pingPong1.address, pingPong2.address];
}

// deploy().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
