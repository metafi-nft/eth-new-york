
import { Button, Grid, Paper, Snackbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Web3 from 'web3'
import { decryptWallet,pay } from '../utility/wallet-utils'
const WalletContext = React.createContext(null)

export const WalletProvider = ({children}) =>{
    const dispatch = useDispatch()
    const USDRates = useSelector((state)=>state.walletReducer.USDRates)

    const [loading,setLoading] = useState(false)
    const [account,setAccount] = useState('')
    const [ethereum,setEthereum] = useState('')
    const [showAuthModal,setShowAuthModal] = useState(false)
    const [showTransactionModal,setShowTransactionModal] = useState(false)
    const [showSuccessToast,setShowSuccessToast] = useState(false)
    const [showTransactionDetailsModal,setShowTransactionDetailsModal] = useState(false)
    const [showPendingToast,setShowPendingToast] = useState(false)
    const [transaction,setTransaction] = useState('')
    const [transactionDetails,setTransactionDetails] = useState('')
    const [transactionLoading,setTransactionLoading] = useState(false)
    
    useEffect(()=>{
        var walletBalance = sessionStorage.getItem('walletBalance')
        if(walletBalance===null){
            walletBalance = {
                USD:3000,
                APE:219.129942,
                ETH:0.02000,
                MATIC:0,
                BTC:0
            }
            sessionStorage.setItem('walletBalance',JSON.stringify(walletBalance))
        }
        else{
            walletBalance = JSON.parse(walletBalance)
        }
        dispatch({type:'SETWALLETBALANCE',data:walletBalance})


        var wallet = sessionStorage.getItem('wallet')
        if(wallet!==null){
            window.web3 = new Web3(process.env.PROVIDERURL);
            setEthereum(window.web3)
            setAccount(JSON.parse(wallet))
        }
    },[])

    const approveTransaction = async ()=>{
        
        setShowTransactionModal(false)
        setShowPendingToast(true)
        setTransactionLoading(true)
        if(transaction.demo===1){
            setTimeout(()=>{
                
                dispatch({
                    type:'UPDATEWALLETBALANCE',
                    data:{
                        symbol:transaction.symbol,
                        amount:-transaction.amount
                    }
                })
                setTransactionDetails({
                    demo:transaction.demo,
                    transactionAmount:transaction.amount,
                    gasFees:0,
                    commission:transaction.amount*0.015,
                    url:"",
                    transactionPaths:[{
                        fromAmount:transaction.amount,
                        fromSymbol:transaction.symbol,
                        toAmount:0,
                        toSymbol:"",
                        USDValue:transaction.amount,
                        protocol:'Fiat'
                    }]
                })
                setTransactionLoading(false)
                setShowPendingToast(false)
                setShowSuccessToast(true)
                
            },2000)
        }else if(transaction.demo===2){
            console.log('demo2')
            
            const paymentPromise = await pay(account,transaction.amount,ethereum)
            console.log(paymentPromise)
            
            dispatch({
                type:'SETSPECIFICBAL',
                data:{
                    symbol:'ETH',
                    value:0.1
                }
            })
            setTransactionDetails({
                demo:transaction.demo,
                transactionAmount:transaction.amount/USDRates[transaction.symbol],
                gasFees:(transaction.amount*0.01)/USDRates[transaction.symbol],
                commission:(transaction.amount*0.015)/USDRates[transaction.symbol],
                url:`https://rinkeby.etherscan.io/tx/${paymentPromise.transactionHash}`,
                transactionPaths:[{
                    fromAmount:0.01,
                    fromSymbol:'ETH',
                    toAmount:transaction.amount,
                    toSymbol:transaction.symbol,
                    USDValue:transaction.amount/USDRates[transaction.symbol],
                    protocol:'Uniswap'
                }]
            })
            setTransactionLoading(false)
            setShowPendingToast(false)
            setShowSuccessToast(true)
        }else if(transaction.demo===3){
            setTimeout(()=>{
                console.log('timeout')
                
                dispatch({
                    type:'SETSPECIFICBAL',
                    data:{
                        symbol:'ETH',
                        value:0
                    }
                })
                dispatch({
                    type:'SETSPECIFICBAL',
                    data:{
                        symbol:'ETH',
                        value:0
                    }
                })
                setTransactionDetails({
                    demo:transaction.demo,
                    transactionAmount:transaction.amount/USDRates[transaction.symbol],
                    gasFees:(transaction.amount*0.01)/USDRates[transaction.symbol],
                    commission:(transaction.amount*0.015)/USDRates[transaction.symbol],
                    url:"",
                    transactionPaths:[{
                        fromAmount:0.1,
                        fromSymbol:transaction.symbol,
                        toAmount:0,
                        toSymbol:"",
                        USDValue:0.1/USDRates[transaction.symbol],
                        protocol:'Ethereum'
                    },{
                        fromAmount:219.129942,
                        fromSymbol:'APE',
                        toAmount:0.9,
                        toSymbol:"ETH",
                        USDValue:0.9/USDRates[transaction.symbol],
                        protocol:'LayerZero'
                    }]
                })
                setTransactionLoading(false)
                setShowPendingToast(false)
                setShowSuccessToast(true)
            },2000)
        }
    }

    const closeTransactionDetails= ()=>{
        setTransactionDetails('')
        setShowTransactionDetailsModal(false)
    }

    const requestTransaction = (transaction)=>{
        if(account===''){
            setShowAuthModal(true)
        }else{
            setShowTransactionModal(true)
        }
        //check if logged in
        //if logged in, show transaction modal
        //else prompt for login
        var newTransaction = {
            url:transaction.url,
            toWalletAddress:transaction.toWalletAddress,
            amount:transaction.amount,
            commission:0,
            symbol:transaction.symbol,
            status:'pre-approval',
            demo:transaction.demo
        }
        if(transaction.demo===1)
        {
            setTransaction({
                ...newTransaction,
                commission:transaction.amount*0.015,
                gasFees:0
            })
        }
        else if(transaction.demo===2){
            setTransaction({
                ...newTransaction,
                commission:transaction.amount*0.015,
                gasFees:transaction.amount*0.01
            })

         

        }else if(transaction.demo===3){
            setTransaction({
                ...newTransaction,
                commission:transaction.amount*0.015,
                gasFees:transaction.amount*0.01
            })
        }

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

            //if there is a transaction in the state, show the transaction modal
            if(transaction!=='')
            {
                setShowTransactionModal(true)
            }

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
        transactionDetails,
        transactionLoading,
        approveTransaction,
        closeTransactionDetails,
        requestTransaction,
        connect,
        rejectTransaction,
        showTransactionDetailsModal,
        setShowAuthModal,
        setLoading,
        
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
                    <Button onClick={()=>{
                        setShowTransactionDetailsModal(true)
                        setShowSuccessToast(false)
                    }}>View</Button>
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
                    <Typography style={{flexGrow:1}}>Transaction Pending</Typography>
                    <Button onClick={()=>{
                        setShowTransactionDetailsModal(true)
                        setShowPendingToast(false)
                    }}>View</Button>
                </Grid>
            </Paper>
        </Snackbar>
    </WalletContext.Provider>
}

export const useWeb3 = ()=> React.useContext(WalletContext)