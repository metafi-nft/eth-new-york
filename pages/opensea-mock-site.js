import { AppBar, Grid, Typography } from '@mui/material'
import React from 'react' 

import AuthModal from '../components/auth-modal/auth-modal'
import OpenSeaHeader from '../components/opensea-mock/header'
import ProductDetails from '../components/opensea-mock/product-details'
import TransactionModal from '../components/transaction-modal/transaction-modal'
import { useWeb3 } from '../contexts/wallet-context'

const OpenSeaMockSite = (props)=>{
    
    return <Grid container style={{minHeight:'100vh',justifyContent:'center'}}>
        <OpenSeaHeader/>
        <Grid item xs={12} sm={11} md={10} style={{marginTop:150}}>
            <ProductDetails/>
        </Grid>
        <TransactionModal/>
        <AuthModal/>
    </Grid>

}
export default OpenSeaMockSite