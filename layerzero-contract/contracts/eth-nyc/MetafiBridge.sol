// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;
pragma abicoder v2;

import "../lzApp/NonblockingLzApp.sol";
import "hardhat/console.sol";

contract MetafiBridge is NonblockingLzApp {
    
    // event emitted whenever amount is transferred to destination address
    event TransferToDest(uint amt, address destAddr);

    // constructor requires the LayerZero endpoint for this chain
    constructor(address _lzEndpoint) NonblockingLzApp(_lzEndpoint) {}
    
    function pay(
        uint16 _dstChainId, // pay to this destination chainId
        address _dstMetafiBridgeAddr, // destination address of MetafiBridge contract
        uint amount,
        address dstAddr
    ) public payable {
        console.log("enter pay on addr=%s, amount=%s, dstAddr=%s", address(this), amount, dstAddr);
        require(this.isTrustedRemote(_dstChainId, abi.encodePacked(_dstMetafiBridgeAddr)), "you must allow inbound messages to ALL contracts with setTrustedRemote()");
        require(address(this).balance > 0, "the balance of this contract is 0. pls send gas for message fees");
        
        // encode the payload with the amount and dest addr
        bytes memory payload = abi.encode(amount, dstAddr);

        // use adapterParams v1 to specify more gas for the destination
        uint16 version = 1;
        uint gasForDestinationLzReceive = 350000;
        bytes memory adapterParams = abi.encodePacked(version, gasForDestinationLzReceive);

        // get the fees we need to pay to LayerZero for message delivery
        (uint messageFee, ) = lzEndpoint.estimateFees(_dstChainId, address(this), payload, false, adapterParams);
        require(address(this).balance >= messageFee, "address(this).balance < messageFee. fund this contract with more ether");

        // send LayerZero message
        lzEndpoint.send{value: messageFee}( // {value: messageFee} will be paid out of this contract!
            _dstChainId, // destination chainId
            abi.encodePacked(_dstMetafiBridgeAddr), // destination address of PingPong contract
            payload, // abi.encode()'ed bytes
            payable(this), // (msg.sender will be this contract) refund address (LayerZero will refund any extra gas back to caller of send()
            address(0x0), // future param, unused for this example
            adapterParams // v1 adapterParams, specify custom destination gas qty
        );
        console.log("leaving pay function");
    }

    function _nonblockingLzReceive(
        uint16 _srcChainId,
        bytes memory _srcAddress,
        uint64, /*_nonce*/
        bytes memory _payload
    ) internal override {   
        console.log("enter _nonblockingLzReceive on addr=", address(this));

        (uint amount, address destAddr) = abi.decode(_payload, (uint, address));
        console.log("received amount=%s, destAddr=%s", amount, destAddr);
        
        require(address(this).balance >= amount, "there is not enough balance to send to the destAddr");
        
        payable(destAddr).transfer(amount);
        emit TransferToDest(amount, destAddr);
    }
    
    // allow this contract to receive ether
    receive() external payable {}
}
