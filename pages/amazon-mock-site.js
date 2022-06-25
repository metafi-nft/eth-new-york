import { AppBar, Grid, Typography } from '@mui/material'
import React from 'react' 
import ProductDetails from '../components/amazon-mock/product-details'
import AuthModal from '../components/auth-modal/auth-modal'
import TransactionModal from '../components/transaction-modal/transaction-modal'
import { useWeb3 } from '../contexts/wallet-context'

const AmazonMockSite = (props)=>{
    
    return <Grid container style={{minHeight:'100vh',justifyContent:'center'}}>
        <AppBar style={{background:'#131921',padding:16}}><Typography variant='h5'>Fiat Demo</Typography></AppBar>
        <Grid item xs={12} sm={11} md={10} style={{marginTop:100}}>
            <ProductDetails/>
        </Grid>
        <TransactionModal/>
        <AuthModal/>
    </Grid>

}
export default AmazonMockSite