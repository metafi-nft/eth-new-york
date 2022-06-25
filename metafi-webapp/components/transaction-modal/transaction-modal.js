import React, { useState } from 'react' 
import { Button, Dialog, DialogContent, DialogTitle, Divider, Grid, Icon, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { useWeb3 } from '../../contexts/wallet-context'
import { useSelector } from 'react-redux'
import LoadingOverlay from './loading-overlay'

const TransactionModal = (props)=>{
    const {showTransactionModal,approveTransaction,transaction} = useWeb3()
    const USDRates = useSelector(state=>state.walletReducer.USDRates)
    var usdAmount = transaction.amount/USDRates[transaction.symbol]
    var gasFees = 0
    if(transaction.symbol!=='USD'){
        //gasfee is 1% of crypto
        gasFees = transaction.amount*0.01/USDRates[transaction.symbol]
    }
    return <Dialog open={showTransactionModal} >
        <DialogTitle>
            <Typography><strong>Transaction Request</strong></Typography>
        </DialogTitle>
        <DialogContent>
            {
                transaction===''?"":
                <Grid container>
                    <Grid item xs={12} style={{marginBottom:16}}>
                        <Typography style={{fontSize:14}}><a style={{color:'#2172E5'}} href={transaction.url} target='_blank'>{transaction.url}</a> is requesting the following transaction:</Typography>
                    </Grid>
                    <Grid item xs={12} style={{marginBottom:16}}>
                        <Typography style={{marginBottom:8}}><strong>Transfer</strong></Typography>
                        <Grid container direction='row' style={{alignItems:'center'}}>
                            <img
                                src={`/images/${transaction.symbol}.svg`}
                                style={{height:25,width:25,marginRight:4}}
                            />
                            <Typography style={{marginRight:4}}><strong>{transaction.amount.toFixed(2)}</strong></Typography>
                            <Typography style={{color:'#949494',fontSize:14}}>{transaction.symbol}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{marginBottom:16}}>
                        <Typography style={{marginBottom:8}}><strong>To</strong></Typography>
                        <Grid container direction='row' style={{alignItems:'center'}}>
                            <Typography style={{marginRight:4}}><strong>{transaction.toWalletAddress.substring(0,5)}...{transaction.toWalletAddress.substring(transaction.toWalletAddress.length-4)}</strong></Typography>
                            <Typography style={{color:'#949494',fontSize:14}}>{transaction.symbol}</Typography>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} style={{marginBottom:16}}>
                    <Divider/>
                    </Grid>
                    <Grid item xs={12} style={{marginBottom:16}}>
                        <Typography variant='h6' style={{color:'#949494',marginBottom:16}}><strong>Transaction Summary</strong></Typography>
                        <Grid container direction='row' style={{alignItems:'center'}}>
                            <Typography style={{flexGrow:1,fontSize:14}}><strong>Transaction Amount</strong></Typography>
                            <Typography style={{fontSize:14,color:'#949494'}}>USD {usdAmount.toFixed(2)}</Typography>
                        </Grid>
                        <Grid container direction='row' style={{alignItems:'center',marginBottom:8}}>
                            <Typography style={{flexGrow:1,fontSize:14}}><strong>Gas Fees</strong></Typography>
                            <Typography style={{fontSize:14,color:'#949494'}}>USD {gasFees.toFixed(2)}</Typography>
                        </Grid>
                        <Grid container direction='row' style={{alignItems:'center'}}>
                            <Typography style={{flexGrow:1,fontSize:16}}><strong>Total</strong></Typography>
                            <Typography><strong>USD {(usdAmount+gasFees).toFixed(2)}</strong></Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction='row'>
                            <Grid item xs={6} style={{paddingRight:4}}>
                                <Button onClick={approveTransaction} variant='contained' fullWidth>
                                    Approve
                                </Button>
                            </Grid>
                            <Grid item xs={6} style={{paddingLeft:4}}>
                                <Button variant='outlined' fullWidth>
                                    Reject
                                </Button>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            }
            {
                transaction.status==='pending'?<LoadingOverlay/>:""
            }
           
        </DialogContent>
    </Dialog>

}
export default TransactionModal