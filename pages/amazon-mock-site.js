import { AppBar, Grid, Typography } from '@mui/material'
import React from 'react' 
import AmazonHeader from '../components/amazon-mock/header'
import ProductDetails from '../components/amazon-mock/product-details'
import AuthModal from '../components/auth-modal/auth-modal'
import TransactionDetailsModal from '../components/transaction-details-modal/transaction-details-modal'
import TransactionModal from '../components/transaction-modal/transaction-modal'
import { useWeb3 } from '../contexts/wallet-context'

const AmazonMockSite = (props)=>{
    
    return <Grid container style={{minHeight:'100vh',justifyContent:'center'}}>
        <AmazonHeader/>
        <Grid item xs={12} sm={11} md={10} style={{marginTop:150}}>
            <ProductDetails/>
        </Grid>
        <TransactionModal/>
        <AuthModal/>
        <TransactionDetailsModal/>
    </Grid>

}
export default AmazonMockSite