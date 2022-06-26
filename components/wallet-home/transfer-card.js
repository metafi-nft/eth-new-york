import { Button, Divider, Grid, IconButton, InputBase, Menu, MenuItem, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react' 
import { useWeb3 } from '../../contexts/wallet-context'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CircleIcon from '@mui/icons-material/Circle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AssetCard from './asset-card';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useSelector,useDispatch } from 'react-redux';
const TransferCard = (props)=>{
    const dispatch = useDispatch()
    const [walletAddress,setWalletAddress] = useState('')
    const [amount,setAmount] = useState(0)
    const [sendAsset,setSendAsset] = useState('ETH')
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {account,requestTransaction} = useWeb3()
    const walletBalance = useSelector(state=>state.walletReducer.walletBalance)
    const USDRates = useSelector(state=>state.walletReducer.USDRates)
    var usdBalance = 0
    for(var asset in walletBalance){
        usdBalance = usdBalance + walletBalance[asset]/USDRates[asset]
    }

    const handleChange =(type)=> (event)=>{
        if(type==='amount'){
            if(event.target.value==='')
            {
                event.target.value = 0
     
            }
            setAmount(parseFloat(event.target.value))
        }
        else 
        {
            setWalletAddress(event.target.value)
        }
        
    }

    const handleRequestTransaction = ()=>{
        var url = `${window.location.protocol}//${window.location.hostname}`
        requestTransaction({
            demo:3,
            url:url,
            toWalletAddress:walletAddress,
            amount:amount,
            symbol:sendAsset,
        })
    }

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    const closeMenu = () => {
        setAnchorEl(null);
    };

    const selectAsset =(asset)=> ()=>{
        setSendAsset(asset)
        closeMenu()
    }

    return <Grid container>
        <Grid item xs={12}>
            <Grid container direction='row' style={{alignItems:'center'}}>
                <IconButton onClick={()=>{
                    dispatch({
                        type:'SETPAGE',
                        data:''
                    })
                }}>
                    <KeyboardBackspaceIcon/>
                </IconButton>
                <Typography style={{flexGrow:1,color:'#949494'}}>Transfer</Typography>
            </Grid>

        </Grid>
        <Grid item xs={12} style={{marginBottom:16  }}>
          <Grid container  style={{background:'#fafafa',borderRadius:18}}>
            <Grid item xs={12} style={{padding:16}}>
                <Typography style={{fontSize:12,color:'#565656',marginBottom:8}}><strong>Send</strong></Typography>
                <Grid container style={{alignItems:'center'}}>
                    <InputBase
                        placeholder='Amount'
                        style={{flexGrow:1}}
                        value={amount}
                        onChange={handleChange('amount')}
                    />
                    <Grid item>
                        <Divider orientation='vertical'></Divider>
                    </Grid>
                    <img
                        src={`/images/${sendAsset}.svg`}
                        style={{height:25,width:25,marginRight:8}}
                    />
                    <Typography>{sendAsset}</Typography>
                    <IconButton onClick={openMenu}>
                        <ExpandMoreIcon/>
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={anchorEl!==null}
                        onClose={closeMenu}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={selectAsset('APE')}>
                            <Grid container>
                                <img
                                    src={`/images/APE.svg`}
                                    style={{height:25,width:25,marginRight:8}}
                                />
                                <Typography>APE</Typography>
                            </Grid>
                        </MenuItem>
                        <MenuItem onClick={selectAsset('BTC')}>
                            <Grid container>
                                <img
                                    src={`/images/BTC.svg`}
                                    style={{height:25,width:25,marginRight:8}}
                                />
                                <Typography>BTC</Typography>
                            </Grid>
                        </MenuItem>
                        <MenuItem onClick={selectAsset('ETH')}>
                            <Grid container>
                                <img
                                    src={`/images/ETH.svg`}
                                    style={{height:25,width:25,marginRight:8}}
                                />
                                <Typography>ETH</Typography>
                            </Grid>
                        </MenuItem>
                        <MenuItem onClick={selectAsset('USD')}>
                            <Grid container>
                                <img
                                    src={`/images/USD.svg`}
                                    style={{height:25,width:25,marginRight:8}}
                                />
                                <Typography>USD</Typography>
                            </Grid>
                        </MenuItem>
                    </Menu>
                </Grid>

            </Grid>
            <Grid item xs={12}>
                <Divider/>    
            </Grid>
            <Grid item xs={12} style={{padding:16}}>
                <Typography style={{fontSize:12,color:'#565656',marginBottom:8}}><strong>To</strong></Typography>
                <Grid container style={{alignItems:'center'}}>
                    <InputBase
                        placeholder='Wallet Address'
                        value={walletAddress}
                        style={{flexGrow:1}}
                        onChange={handleChange('walletAddress')}
                    />
                </Grid>
            </Grid>

          </Grid>

        </Grid>
        <Grid item xs={12} style={{marginBottom:16  }}>
            <Button onClick={handleRequestTransaction} disabled={amount<=0||walletAddress===''} variant='contained' fullWidth>Confirm</Button>  
        </Grid>
    </Grid>
}
export default TransferCard