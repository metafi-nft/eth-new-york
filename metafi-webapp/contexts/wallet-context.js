
import { Grid, Paper, Snackbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Web3 from 'web3'
import { decryptWallet } from '../utility/wallet-utils'
const WalletContext = React.createContext(null)

export const WalletProvider = ({children}) =>{
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const [account,setAccount] = useState('')
    const [ethereum,setEthereum] = useState('')
    const [showAuthModal,setShowAuthModal] = useState(false)
    const [showTransactionModal,setShowTransactionModal] = useState(false)
    const [showSuccessToast,setShowSuccessToast] = useState(false)
    const [showPendingToast,setShowPendingToast] = useState(false)
    const [transaction,setTransaction] = useState('')
    
    useEffect(()=>{
        var walletBalance = sessionStorage.getItem('walletBalance')
        if(walletBalance===null){
            walletBalance = {
                USD:1220.45,
                APE:451.20,
                ETH:12.2391
            }
            sessionStorage.setItem('walletBalance',JSON.stringify(walletBalance))
        }
        else{
            walletBalance = JSON.parse(walletBalance)
        }
        dispatch({type:'SETWALLETBALANCE',data:walletBalance})


        var wallet = sessionStorage.getItem('wallet')
        if(wallet!==null){
            window.web3 = new Web3(process.env.IPADDRESS);
            setEthereum(window.web3)
            setAccount(JSON.parse(wallet))
        }
    },[])

    const approveTransaction = ()=>{
        
        setShowTransactionModal(false)
        setShowPendingToast(true)
        if(transaction.symbol==='USD'){
            setTimeout(()=>{
                
                dispatch({
                    type:'UPDATEWALLETBALANCE',
                    data:{
                        symbol:transaction.symbol,
                        amount:-transaction.amount
                    }
                })
                setShowPendingToast(false)
                setShowSuccessToast(true)
            },2000)
        }else{
            //
        }
    }

    const requestTransaction = (transaction)=>{
        setShowTransactionModal(true)
        setTransaction({
            url:transaction.url,
            toWalletAddress:transaction.toWalletAddress,
            amount:transaction.amount,
            symbol:transaction.symbol,
            status:'pre-approval'
        })
    }

    const rejectTransaction =()=>{
        setTransaction('')
        setShowTransactionModal(false)
    }

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
        account,
        ethereum,
        loading,
        showTransactionModal,
        showAuthModal,
        transaction,
        approveTransaction,
        requestTransaction,
        rejectTransaction,
        setShowAuthModal,
        setLoading,
        connect,
        
    }}>
        {children}
        <Snackbar 
            open={showSuccessToast} 
            autoHideDuration={8000} 
            onClose={()=>{
                setShowSuccessToast(false)
            }}
            anchorOrigin={{ vertical:'bottom', horizontal:'right' }}
        >
            <Paper style={{padding:16}}>
                <Grid container direction='row' style={{alignItems:'center'}}>
                    <img
                        src='/images/logo.png'
                        style={{height:35,width:35,marginRight:8}}
                    />
                    <Typography>Transaction Completed</Typography>
                </Grid>
            </Paper>
        </Snackbar>
        <Snackbar 
            open={showPendingToast} 
            autoHideDuration={8000} 
            onClose={()=>{
                setShowPendingToast(false)
            }}
            anchorOrigin={{ vertical:'bottom', horizontal:'right' }}
        >
            <Paper style={{padding:16}}>
                <Grid container direction='row' style={{alignItems:'center'}}>
                    <img
                        src='/images/logo.png'
                        style={{height:35,width:35,marginRight:8}}
                    />
                    <Typography>Transaction Pending</Typography>
                </Grid>
            </Paper>
        </Snackbar>
    </WalletContext.Provider>
}

export const useWeb3 = ()=> React.useContext(WalletContext)