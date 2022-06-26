import React, { useState } from 'react' 
import { Button, Dialog, DialogContent, DialogTitle, Divider, Grid, Icon, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { useWeb3 } from '../../contexts/wallet-context'
import { useSelector } from 'react-redux'
import LoadingOverlay from './loading-overlay'
import CloseIcon from '@mui/icons-material/Close';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
const TransactionDetailsModal = (props)=>{
    const {transactionDetails,transactionLoading,showTransactionDetailsModal,closeTransactionDetails} = useWeb3()

    var transactionPaths = []
    if(transactionDetails!==''&&transactionDetails.transactionPaths.length>0){
        transactionPaths = transactionDetails.transactionPaths.map((transactionPath,index)=>{
            return <Grid key={index} container style={{alignItems:'center',marginBottom:8}}>
                <SwapHorizIcon style={{marginRight:8}}/>
                <Grid style={{flexGrow:1}}>
                    {
                        transactionPath.toAmount==0?<Typography style={{fontSize:12}}>
                        <strong>{transactionPath.fromAmount.toFixed(2)} {transactionPath.fromSymbol} </strong> 
                    </Typography>:
                    <Typography style={{fontSize:12}}>
                        <strong>{transactionPath.fromAmount.toFixed(2)} {transactionPath.fromSymbol} </strong>  to <strong>{transactionPath.toAmount.toFixed(2)} {transactionPath.toSymbol} </strong>
                    </Typography>
                    }

                    <Typography style={{fontSize:12,color:'#949494'}}>
                        via {transactionPath.protocol} Protocol
                    </Typography>
                </Grid>
                <Typography style={{fontSize:12,color:'#949494'}}>
                    USD {transactionPath.USDValue.toFixed(2)}
                </Typography>
            </Grid>
        })
    }

    return <Dialog open={showTransactionDetailsModal} >
        <DialogTitle>
            <Grid container style={{alignItems:'center'}}>
                <Typography style={{flexGrow:1}}><strong>Transaction Details</strong></Typography>
                <IconButton onClick={closeTransactionDetails}>
                    <CloseIcon/>
                </IconButton>
            </Grid>
            
        </DialogTitle>
        <DialogContent>
            {
                transactionDetails===''||transactionLoading?"":
                <Grid container>
                    <Grid item xs={12} style={{marginBottom:16}}>
                        <Grid container direction='row' style={{alignItems:'center',marginBottom:16}}>
                            <Typography style={{flexGrow:1,fontSize:14}}><strong>Transaction Amount</strong></Typography>
                            <Typography style={{fontSize:14}}><strong>USD {transactionDetails.transactionAmount.toFixed(2)}</strong></Typography>
                        </Grid>
                        {transactionPaths.length==0?"":transactionPaths}
                    </Grid>
                    <Grid item xs={12} style={{marginBottom:32}}>
                        <Grid container direction='row' style={{alignItems:'center'}}>
                            <Typography style={{flexGrow:1,fontSize:14,marginBottom:16}}><strong>Transaction Fees</strong></Typography>
                            <Typography style={{fontSize:14}}><strong>USD {(transactionDetails.gasFees + transactionDetails.commission).toFixed(2)}</strong></Typography>
                        </Grid>
                        <Grid container direction='row' style={{alignItems:'center'}}>
                            <Typography style={{flexGrow:1,fontSize:12,color:'#949494',marginLeft:4}}>Ethereum Gas Fees</Typography>
                            <Typography style={{fontSize:12,color:'#949494'}}>USD {transactionDetails.gasFees.toFixed(2)}</Typography>
                        </Grid>
                        <Grid container direction='row' style={{alignItems:'center'}}>
                            <Typography style={{flexGrow:1,fontSize:12,color:'#949494',marginLeft:4}}>Metafi Relayer Transaction Fees</Typography>
                            <Typography style={{fontSize:12,color:'#949494'}}>USD {transactionDetails.commission.toFixed(2)}</Typography>
                        </Grid>
   
                    </Grid>
                    <Grid item xs={12} style={{marginBottom:16}}>
                        <Grid container direction='row' style={{alignItems:'center'}}>
                            <Typography style={{flexGrow:1}}><strong>Total</strong></Typography>
                            <Typography><strong>USD {(transactionDetails.transactionAmount + transactionDetails.gasFees + transactionDetails.commission).toFixed(2)}</strong></Typography>
                        </Grid>
        
                    </Grid>
                </Grid>
            }
            {
                transactionLoading?<LoadingOverlay/>:""
            }
           
        </DialogContent>
    </Dialog>

}
export default TransactionDetailsModal