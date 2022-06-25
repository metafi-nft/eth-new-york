const Web3 = require('web3')
const { v4: uuidv4 } = require('uuid');
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

module.exports = {
    createWallet:createWallet,
    decryptWallet:decryptWallet
}