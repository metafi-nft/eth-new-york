import { Button, Divider, Grid, Typography } from '@mui/material'
import React, { useState } from 'react' 
import { useSelector } from 'react-redux'
import { useWeb3 } from '../../contexts/wallet-context'
import { useRouter } from 'next/router'
import CircleIcon from '@mui/icons-material/Circle';
const ProductDetails = (props)=>{
    const router = useRouter()
    const {requestTransaction} = useWeb3()
    const product = useSelector((state)=>state.amazonReducer.product)
    return <Grid container style={{alignItems:'center'}}>
        <Grid item xs={12} style={{marginBottom:32}}>
            <Grid container direction='row' style={{alignItems:'center'}}>
                <Grid item xs>
                    <Typography variant='h5'><strong>Mac</strong></Typography>
                    <Typography variant='h5'><strong>Notebooks</strong></Typography>
                </Grid>
                <Grid item xs>
                    <img
                        src={'/images/mac1.png'}
                        style={{height:75}}
                    />
                    <Typography style={{fontSize:14,color:'#1260CC'}}>Macbook Air 13" (M1)</Typography>
                </Grid>
                <Grid item xs>
                    <img
                        src={'/images/mac2.png'}
                        style={{height:75}}
                    />
                    <Typography style={{fontSize:14,color:'#1260CC'}}>Macbook Air 13" (M2)</Typography>
                </Grid>
                <Grid item xs>
                    <img
                        src={'/images/mac3.png'}
                        style={{height:75}}
                    />
                    <Typography style={{fontSize:14,color:'#1260CC'}}>Macbook Air 14" (M1)</Typography>
                </Grid>
            
            </Grid>
            
        </Grid>
        
        <Grid item xs={12}>
            <Grid container style={{alignItems:'center'}}>
                <Grid item xs={12} md={4}>
                <img
                        src={'https://m.media-amazon.com/images/I/61Y30DpqRVL._AC_SX679_.jpg'}
                        style={{width:'100%'}}
                />
                </Grid>
                <Grid item xs={12} md={8} style={{padding:8}}>
                    <Typography variant='h5' style={{marginBottom:16}}>2021 Apple MacBook Pro (16-inch, Apple M1 Pro chip with 10‑core CPU and 16‑core GPU, 16GB RAM, 1TB SSD) - Silver</Typography>
                    <Typography variant='h4' style={{marginBottom:16}}>$ 2675.00</Typography>

                    <Typography style={{marginBottom:32}}>Apple MacBook Pro is a macOS laptop with a 13.30-inch display that has a resolution of 2560x1600 pixels. It is powered by a Core i5 processor and it comes with 12GB of RAM. The Apple MacBook Pro packs 512GB of SSD storage.</Typography>
                
                    <Button 
                        onClick={()=>{
                            var url = `${window.location.protocol}//${window.location.hostname}`

                            requestTransaction({
                                demo:1,
                                url:url,
                                toWalletAddress:"Amazon",
                                amount:2675.00,
                                symbol:'USD'
                            })
                        }}
                        fullWidth 
                        style={{
                            backgroundColor:'#FFD814',
                            color:'#1E2F12',
                            borderRadius:18,
                            marginBottom:32
                        }}>
                            Buy Now
                    </Button>
                    <Grid style={{marginBottom:32}}>
                        <Grid container >
                            <Grid item xs={4}>
                                <Typography><strong>Brand</strong></Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>Apple</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4}>
                                <Typography><strong>Model Name</strong></Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>MacBook Pro</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4}>
                                <Typography><strong>Screen Size</strong></Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>16.2 Inches</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                
           

                    <Typography><strong>About this item</strong></Typography>
                    <Grid container direction='row' style={{alignItems:'center',marginBottom:4}}>
                        <Grid item style={{marginRight:8}}>
                            <CircleIcon style={{height:10,width:10}}/>
                        </Grid>
                        <Grid item xs>
                            <Typography style={{fontSize:14}}>Apple M1 Pro or M1 Max chip for a massive leap in CPU, GPU, and machine learning performance</Typography>    
                        </Grid>
                    </Grid>
                    <Grid container direction='row' style={{alignItems:'center',marginBottom:4}}>
                        <Grid item style={{marginRight:8}}>
                            <CircleIcon style={{height:10,width:10}}/>
                        </Grid>
                        <Grid item xs>
                            <Typography style={{fontSize:14}}>Up to 10-core CPU delivers up to 2x faster performance to fly through pro workflows quicker than ever</Typography>    
                        </Grid>
                    </Grid>
                    <Grid container direction='row' style={{alignItems:'center',marginBottom:4}}>
                        <Grid item style={{marginRight:8}}>
                            <CircleIcon style={{height:10,width:10}}/>
                        </Grid>
                        <Grid item xs>
                            <Typography style={{fontSize:14}}>Up to 32-core GPU with up to 4x faster performance for graphics-intensive apps and games</Typography>    
                        </Grid>
                    </Grid>
                    <Grid container direction='row' style={{alignItems:'center',marginBottom:4}}>
                        <Grid item style={{marginRight:8}}>
                            <CircleIcon style={{height:10,width:10}}/>
                        </Grid>
                        <Grid item xs>
                            <Typography style={{fontSize:14}}>16-core Neural Engine for up to 5x faster machine learning performance</Typography>    
                        </Grid>
                    </Grid>
                    
                    
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} style={{marginBottom:32}}>
            <Divider/>
        </Grid>
        <Grid item xs={12}>
            <Grid container style={{alignItems:'center',marginBottom:16}}>
                <img
                    src='https://m.media-amazon.com/images/I/111pigi1ylL.png'
                    style={{height:35,marginRight:8}}
                />
                <Typography><strong>Climate Pledge Friendly</strong></Typography>
                
            </Grid>
            <Typography>Climate Pledge Friendly uses sustainability certifications to highlight products that support our commitment to help preserve the natural world. Time is fleeting. Learn more</Typography>
        </Grid>
        <Grid item xs={12}>
            <img
                src="https://m.media-amazon.com/images/G/01/apple/MacBook_Pro_14-in_16-in_Product_Page_L__en-US_01._CB639392504_.jpg"
                style={{width:'100%'}}
            />
        </Grid>
        <Grid item xs={12}>
            <img
                src="https://m.media-amazon.com/images/G/01/apple/MacBook_Pro_14-in_16-in_Product_Page_L__en-US_02._CB639392470_.jpg"
                style={{width:'100%'}}
            />
        </Grid>
        
    </Grid>
}
export default ProductDetails