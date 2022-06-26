import { Button, Card, CardHeader, Divider, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react' 
import { useSelector } from 'react-redux'
import { useWeb3 } from '../../contexts/wallet-context'
import { useRouter } from 'next/router'
import CircleIcon from '@mui/icons-material/Circle';
import LinkIcon from '@mui/icons-material/Link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SegmentIcon from '@mui/icons-material/Segment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import RefreshIcon from '@mui/icons-material/Refresh';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TimelineIcon from '@mui/icons-material/Timeline';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ListIcon from '@mui/icons-material/List';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
const ProductDetails = (props)=>{
    const router = useRouter()
    const {requestTransaction} = useWeb3()
    const product = useSelector((state)=>state.amazonReducer.product)
    return <Grid container style={{alignItems:'center'}}>
        <Grid item xs={12} md={4}>
            <Paper variant={'outlined'} style={{marginBottom:16}}>
                <Grid container>
                    <Grid item xs={12} style={{padding:16}}>
                        <Grid container style={{alignItems:'center'}}>
                            <LinkIcon />
                            <Grid style={{flexGrow:1}}></Grid>
                            <Typography style={{fontSize:14,marginRight:4}}>3</Typography>
                            <FavoriteBorderIcon/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <img
                            src='https://lh3.googleusercontent.com/G_EOdlBsXiaZwscD4CW963tgCGiWai-bB5ZJ8-3_SDYXCr6BXT_iojC7YkxrrSa3txn2RrcGD-g2Kco6Gq6Iirrg7ow49fnU_pF0mg=w600'
                            style={{height:'auto',width:'100%'}}
                        />
                    </Grid>

                </Grid>
      
            </Paper>
            <Paper variant={'outlined'}>
                <Grid container>
                    <Grid item xs={12} style={{padding:16}}>
                        <Grid container style={{alignItems:'center'}}>
                            <SegmentIcon/>
                            <Typography>Description</Typography>
                        </Grid>
                    
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} style={{padding:16}}>
                        <Grid container style={{alignItems:'center'}}>
           
                            <Typography>By <strong>Lil_Shiba_Boss</strong></Typography>
                        </Grid>
     
                    </Grid>

                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} style={{padding:16}}>
                        <Grid container style={{alignItems:'center'}}>
                            <FormatIndentIncreaseIcon style={{marginRight:8}}/>
                            <Typography style={{flexGrow:1}}><strong>About Lil Animal Group</strong></Typography>
                            <ExpandMoreIcon/>
                        </Grid>
     
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} style={{padding:16}}>
                        <Grid container style={{alignItems:'center'}}>
                            <ChromeReaderModeIcon style={{marginRight:8}}/>
                            <Typography style={{flexGrow:1}}><strong>Details</strong></Typography>
                            <ExpandMoreIcon/>
                        </Grid>
     
                    </Grid>

                </Grid>
      
            </Paper>

        </Grid>
        <Grid item xs={12} md={8} style={{paddingLeft:16}}>
            <Grid container style={{alignItems:'center',marginBottom:16}}>
       
                <Typography style={{flexGrow:1,color:'#3894EA'}}>Lil Animal Group</Typography>
                <Paper variant='outlined' >
                    <Grid container style={{alignItems:'center'}}> 
                        
                        <Grid item xs style={{padding:16}}>
                            <RefreshIcon/>
                        
                        </Grid>
                        <Grid item style={{height:60}}>
                            <Divider orientation={'vertical'} />
                        </Grid>
                        
                        <Grid item xs style={{padding:16}}>
                            <ShareIcon/>
    
                        </Grid>
                        <Grid item style={{height:60}}>
                            <Divider orientation={'vertical'} />
                        </Grid>
                        <Grid item xs style={{padding:16}}>
                            <MoreVertIcon/>
                
                        </Grid>

                    </Grid>
                </Paper>
        

            </Grid>
  
            <Typography variant='h4' style={{marginBottom:32}}><strong>Shiba #17150</strong></Typography>

            <Grid container style={{alignItems:'center',marginBottom:16}} >
                <Typography style={{marginRight:8}}>Owned by </Typography>
                <Typography style={{color:'#3894EA',marginRight:16}}>Lil_Shiba_Boss</Typography>
                <RemoveRedEyeIcon style={{marginRight:4,color:'#707A83'}}/>
                <Typography style={{color:'#707A83',marginRight:8}}>3 views</Typography>
                <FavoriteIcon style={{marginRight:4,color:'#707A83'}}/>
                <Typography style={{color:'#707A83',marginRight:8}}>3 favourites</Typography>
            </Grid>

            <Paper variant='outlined' style={{marginBottom:16}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container style={{alignItems:'center',padding:16}} >
                            <AccessTimeIcon style={{marginRight:8}}/>
                            <Typography>Sale ends July 7, 2022 at 11:04am GMT+8 </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12} style={{padding:16}}>
                        <Typography style={{marginBottom:16}}>Current Price</Typography>
                        <Grid container style={{alignItems:'center',marginBottom:16}} >
                            <img
                                src='https://openseauserdata.com/files/265128aa51521c90f7905e5a43dcb456_new.svg'
                                style={{height:25,width:25,marginRight:8}}
                            />
                            <Typography variant='h4'><strong>0.01</strong> </Typography>
                            <Typography>($12.36)</Typography>
                        </Grid>
                        <Grid container style={{alignItems:'center'}} >
                            <Button variant='contained' style={{width:'200px',padding:16,marginRight:8}}>
                                Buy Now
                            </Button>
                            <Button variant='outlined' style={{width:'200px',padding:16}}>
                                Make Offer
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Paper variant='outlined' style={{marginBottom:16}}>
                <Grid container style={{padding:16}}>
                    <TimelineIcon style={{marginRight:8}}/>
                    <Typography style={{flexGrow:1}}><strong>Price History</strong></Typography>
                    <ExpandMoreIcon/>
                </Grid>
            </Paper>
            <Paper variant='outlined' style={{marginBottom:16}}>
                <Grid container style={{padding:16}}>
                    <LocalOfferIcon style={{marginRight:8}}/>
                    <Typography style={{flexGrow:1}}><strong>Listings</strong></Typography>
                    <ExpandMoreIcon/>
                </Grid>
            </Paper>
            <Paper variant='outlined' style={{marginBottom:16}}>
                <Grid container style={{padding:16}}>
                    <ListIcon style={{marginRight:8}}/>
                    <Typography style={{flexGrow:1}}><strong>Offers</strong></Typography>
                    <ExpandMoreIcon/>
                </Grid>
            </Paper>
          

        </Grid>
        <Grid item xs={12} style={{marginTop:32,marginBottom:16}}>
            <Paper variant='outlined' style={{marginBottom:16}}>
                <Grid container style={{padding:16}}>
                    <SwapVertIcon style={{marginRight:8}}/>
                    <Typography style={{flexGrow:1}}><strong>Item Activity</strong></Typography>
                    <ExpandMoreIcon/>
                </Grid>
            </Paper>
        </Grid>
        <Grid item xs={12}>
            <Paper variant='outlined' style={{marginBottom:16}}>
                <Grid container style={{padding:16}}>
                    <ViewComfyIcon style={{marginRight:8}}/>
                    <Typography style={{flexGrow:1}}><strong>More From This Collection</strong></Typography>
                    <ExpandMoreIcon/>
                </Grid>
            </Paper>
        </Grid>
        
    </Grid>
}
export default ProductDetails