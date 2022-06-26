import { AppBar, Grid, InputBase, TextField, Typography } from '@mui/material'
import React from 'react' 
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
const OpenSeaHeader = (props)=>{
    var isMobileView = useSelector(state=>state.generalReducer.isMobileView)
    return  <AppBar 
        
        style={{background:'white'}}>
            <Grid container direction='row' style={{alignItems:'center',padding:16}}>
                <Grid item xs={3}>
                    <Grid container direction='row' style={{alignItems:'center'}}>
                        <img
                            src={'https://static.opensea.io/Logos/opensea-pride.svg'}
                            style={{height:35,marginRight:8}}
                        />
                        <Typography variant='h5' style={{color:'black'}}><strong>OpenSea</strong></Typography>
                    </Grid>
                </Grid>
                <Grid item xs ={9}>
                    <Grid container direction='row' style={{alignItems:'center'}}>
                        <Grid style={{borderRadius:8,marginRight:16,border:'1px solid #E5E8EB',padding:8,flexGrow:1}}>
                            <Grid container style={{alignItems:'center'}}>
                                <SearchIcon style={{color:"#727C85",marginRight:8}}/>
                                <InputBase
                                    style={{flexGrow:1,color:'#869098'}}
                                
                                    placeholder='Search items, collections, and accounts'
                                />
                            </Grid>
                        </Grid>
                        
                        <Typography style={{color:'#565656',marginRight:16}}><strong>Explore</strong></Typography>
                        <Typography style={{color:'#565656',marginRight:16}}><strong>Stats</strong></Typography>
                        <Typography style={{color:'#565656',marginRight:16}}><strong>Resources</strong></Typography>
                        <Typography style={{color:'#565656',marginRight:16}}><strong>Create</strong></Typography>
                        <PersonIcon style={{color:'#565656',marginRight:16}}/>
                        <AccountBalanceWalletIcon style={{color:'#565656',marginRight:16}}/>
                    </Grid>
                </Grid>
                
             
            </Grid>
           
        </AppBar>
}
export default OpenSeaHeader