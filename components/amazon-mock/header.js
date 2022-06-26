import { AppBar, Grid, InputBase, TextField, Typography } from '@mui/material'
import React from 'react' 
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
const AmazonHeader = (props)=>{
    var isMobileView = useSelector(state=>state.generalReducer.isMobileView)
    return  <AppBar 
        
        style={{background:'#131921'}}>
            <Grid container direction='row' style={{alignItems:'center',padding:16}}>
                <img
                    src={'/images/amazon.png'}
                    style={{height:25,marginTop:8,marginRight:16}}
                />
                <Grid style={{marginRight:16}}>
                    <Typography style={{fontSize:14}}>Deliver to</Typography>
                    <Typography style={{fontSize:14}}><strong>New York</strong></Typography>
                </Grid>
                <Grid style={{background:'white',flexGrow:1,borderRadius:8,marginRight:16}}>
                    <Grid container style={{alignItems:'center'}}>
                        <InputBase
                            style={{flexGrow:1}}
                        />
                        <Grid style={{width:45,height:45,backgroundColor:'orange',textAlign:'center',borderRadius:8}}>
                            <Grid container style={{alignItems:'center',height:'100%',justifyContent:'center'}}>
                                <SearchIcon/>
                            </Grid>
                            
                        </Grid>
                    </Grid>
                </Grid>
      
                <ShoppingCartCheckoutIcon
                    style={{fontSize:40}}
                />
                <Typography style={{fontSize:14}}><strong>Cart</strong></Typography>
             
            </Grid>
            <Grid container direction={'row'} style={{background:'#232F3E',alignItems:'center',paddingLeft:16,paddingRight:16,paddingTop:8,paddingBottom:8}}>
                <MenuIcon style={{marginRight:8,color:'white'}}/>
                <Typography style={{fontSize:14,marginRight:8,color:'white'}}><strong>All</strong></Typography>
                <Typography style={{fontSize:14,marginRight:8,color:'white'}}>Today's Deals</Typography>
                <Typography style={{fontSize:14,marginRight:8,color:'white'}}>Customer Service</Typography>
                <Typography style={{fontSize:14,marginRight:8,color:'white'}}>Gift Card</Typography>
            </Grid>
        </AppBar>
}
export default AmazonHeader