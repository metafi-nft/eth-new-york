# Metafi
Created in ETHNewYork 2022

## What is it?
A universal, multi-currency wallet that users can use across web2 and web3

## Project Description
The project is a WalletConnect-compatible wallet that holds balances across multiple fiat and cryptocurrencies. Users never need to worry about converting currencies again - with our platform, they can top up their wallet using the currency of their choice, and pay using the destination currency - we take care of everything in-between (on-ramp/bridging/swapping). For swapping, we integrate with Uniswap, and Bridging, we integrate with LayerZero.

## How it's Made
We used react for the front end wallet UI (which is integrated with WalletConnect), and deployed smart contracts on ETH and Polygon. For Ethereum transfers, we connect with Uniswap V2, and for cross-chain transfers, we integrated with LayerZero's cross-chain messaging platform. We get live exchange rates from Chainlink, and in our demo, we go over a sample use case, which is purchasing an NFT from OpenSea.
