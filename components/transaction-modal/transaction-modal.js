import React, { useState } from 'react' 
import { Button, Dialog, DialogContent, DialogTitle, Divider, Grid, Icon, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { useWeb3 } from '../../contexts/wallet-context'
import { useSelector } from 'react-redux'


const TransactionModal = (props)=>{
    const {showTransactionModal,approveTransaction,transaction,rejectTransaction} = useWeb3()
    const USDRates = useSelector(state=>state.walletReducer.USDRates)
    var usdAmount = transaction.amount/USDRates[transaction.symbol]
    console.log(transaction.demo==1)
    var toWalletAddress = transaction!==''?transaction.toWalletAddress.substring(0,5) + "..." + transaction.toWalletAddress.substring(transaction.toWalletAddress.length-4):""
    if(transaction.demo==1)
    {
        toWalletAddress = transaction.toWalletAddress
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
                        <Typography style={{fontSize:14}}><a style={{color:'#2172E5'}} href={transaction.url} rel="noreferrer" target='_blank'>{transaction.url}</a> is requesting the following transaction:</Typography>
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
                            <Typography style={{marginRight:4}}><strong>{toWalletAddress}</strong></Typography>
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
                        {
                            transaction.gasFees===0?"":<Grid container direction='row' style={{alignItems:'center',marginBottom:8}}>
                                <Typography style={{flexGrow:1,fontSize:14}}><strong>Gas Fees</strong></Typography>
                                <Typography style={{fontSize:14,color:'#949494'}}>USD {transaction.gasFees.toFixed(2)}</Typography>
                            </Grid>
                        }
                        <Grid container direction='row' style={{alignItems:'center',marginBottom:8}}>
                            <Typography style={{flexGrow:1,fontSize:14}}><strong>Commission</strong></Typography>
                            <Typography style={{fontSize:14,color:'#949494'}}>USD {transaction.commission.toFixed(2)}</Typography>
                        </Grid>
                        <Grid container direction='row' style={{alignItems:'center'}}>
                            <Typography style={{flexGrow:1,fontSize:16}}><strong>Total</strong></Typography>
                            <Typography><strong>USD {(usdAmount+transaction.gasFees+transaction.commission).toFixed(2)}</strong></Typography>
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
                                <Button onClick={rejectTransaction} variant='outlined' fullWidth>
                                    Reject
                                </Button>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            }
           
        </DialogContent>
    </Dialog>

}
export default TransactionModal