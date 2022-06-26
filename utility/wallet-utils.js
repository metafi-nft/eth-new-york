const Web3 = require('web3')
const { v4: uuidv4 } = require('uuid');
const contractAbi = require('../contract-abi.json')
const createWallet = async (password)=>{
    const web3 = new Web3()
    //create the wallet then encrypt it
    var wallet = web3.eth.accounts.wallet.create(1,uuidv4());
    var keystores = web3.eth.accounts.wallet.encrypt(password);
    return keystores
}

const decryptWallet =async (keystoreArray,password)=>{
    const web3 = new Web3()
    var wallet = web3.eth.accounts.wallet.decrypt(keystoreArray,password);
    
    return wallet

}


const pay = async (account,amount,provider)=>{
    console.log('pay')
    var contractAddress = '0xC5a74744dCf229AC040A86f72F07cC9b51232113'
    const contractAddressOnPolygon = "0x2D5794CE268394562Ef207570Ddf0EeEA2602e38";
    const toWalletAddress = "0x40562Cf2E90f23b3969d782B5c8f134A77069b49";

    console.log('amount')
    console.log(amount)
    var value = Web3.utils.toWei(amount.toString(),'ether')
    var valueHex = Web3.utils.numberToHex(0)
    console.log('value')
    console.log(value)

    console.log(valueHex)
    console.log(provider)
    var layerZeroContract = new provider.eth.Contract(contractAbi.abi,contractAddress)
    console.log(layerZeroContract)
    var layerZeroContractABI = layerZeroContract.methods.pay(10009,contractAddressOnPolygon,1000,toWalletAddress).encodeABI()
    console.log(account.privateKey)
    console.log(layerZeroContractABI)
    try
    {   


        var transaction = {
  
            from:account.address,
            to: contractAddress,
            data:layerZeroContractABI,
            chainId:'4'
        }
 
        //sign transaction
        var signedTransaction = await provider.eth.accounts.signTransaction(transaction,account.privateKey)
        console.log('signed')
        console.log(signedTransaction.rawTransaction)
        const commitPromise = provider.eth.sendSignedTransaction(signedTransaction.rawTransaction)
        console.log(commitPromise)
   
        return commitPromise
    }
    catch(error)
    {
        console.log(error)
        throw new Error('An unexpected error has occured. Please inform us of the issue')
    }
}   

module.exports = {
    createWallet:createWallet,
    decryptWallet:decryptWallet,
    pay:pay
}