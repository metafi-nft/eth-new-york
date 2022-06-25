
import React, { useState } from 'react'
import Web3 from 'web3'
import { decryptWallet } from '../utility/wallet-utils'
const WalletContext = React.createContext(null)

export const WalletProvider = ({children}) =>{

    const [loading,setLoading] = useState(false)
    const [account,setAccount] = useState('')
    const [ethereum,setEthereum] = useState('')
    const [showAuthModal,setShowAuthModal] = useState(false)

    //can only access this if ksa is available
    //connect to the wallet and return the web3 provider
    const connect = async (password)=>{
        
        try{
            var wallet = sessionStorage.getItem('wallet')
            if(wallet===null){
                console.log('no wallet')
                var ksa = localStorage.getItem('ksa')
                const accounts = await decryptWallet(JSON.parse(ksa),password) 
                var wallet = accounts["0"]
                sessionStorage.setItem('wallet',JSON.stringify(wallet))
                setAccount(wallet)
            }else{
                setAccount(JSON.parse(wallet))
            }
            setLoading(true)
            var ksa = sessionStorage.getItem('ksa')
            //make web3 accessible globally
            window.web3 = new Web3('https://eth-rinkeby.alchemyapi.io/v2/VpqW4lD7DYfTwhmOvkRexky9H2_sAXfZ');
            setEthereum(window.web3)
            setShowAuthModal(false)
            setLoading(false)
        }catch(error){
            setLoading(false)
            console.log(error)
        }
        

    }

    return <WalletContext.Provider value={{
        loading,
        showAuthModal,
        account,
        ethereum,
        setShowAuthModal,
        setLoading,
        connect
    }}>
        {children}
    </WalletContext.Provider>
}

export const useWeb3 = ()=> React.useContext(WalletContext)