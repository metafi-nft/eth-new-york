import { Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react' 
import { useSelector } from 'react-redux'
import { useWeb3 } from '../../contexts/wallet-context'
import { useRouter } from 'next/router'

const ProductDetails = (props)=>{
    const router = useRouter()
    const {requestTransaction} = useWeb3()
    const product = useSelector((state)=>state.amazonReducer.product)
    return <Grid container>
        <Grid item xs={12} md={6}>
            <img
                src={product.photo}
                style={{width:'100%'}}
            />
        </Grid>
        <Grid item xs={12} md={6} style={{padding:8}}>
            <Typography variant='h5' style={{marginBottom:16}}><strong>{product.name}</strong></Typography>
            <Typography variant='h4' style={{marginBottom:16}}>${product.price.toFixed(2)}</Typography>

            <Typography style={{marginBottom:32}}>{product.description}</Typography>
           
            <Button 
                onClick={()=>{
                    var url = `${window.location.protocol}//${window.location.hostname}${window.location.pathname}`

                    requestTransaction({
                        url:url,
                        toWalletAddress:"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
                        amount:product.price,
                        symbol:'USD'
                    })
                }}
                fullWidth 
                style={{
                    backgroundColor:'#FFD814',
                    color:'#1E2F12',
                    borderRadius:18
                }}>
                    Buy Now
            </Button>
        </Grid>

    </Grid>
}
export default ProductDetails