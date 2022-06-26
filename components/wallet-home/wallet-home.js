import { Button, Grid, IconButton, Typography } from '@mui/material'
import React from 'react' 
import { useWeb3 } from '../../contexts/wallet-context'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CircleIcon from '@mui/icons-material/Circle';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

import AssetCard from './asset-card';
import { useSelector,useDispatch } from 'react-redux';
const WalletHome = (props)=>{
    const dispatch = useDispatch()
    const {account} = useWeb3()
    const walletBalance = useSelector(state=>state.walletReducer.walletBalance)
    const USDRates = useSelector(state=>state.walletReducer.USDRates)
    var usdBalance = 0
    for(var asset in walletBalance){
        usdBalance = usdBalance + walletBalance[asset]/USDRates[asset]
    }
    return <Grid container>
        <Grid item xs={12}>
            <Grid container direction='row' style={{alignItems:'center',marginBottom:16}}>
                <Grid style={{flexGrow:1}}>
                    <Typography style={{color:'#949494'}}>Welcome,</Typography>
                    <Typography variant='h5' style={{color:'black'}}><strong>Metagai</strong></Typography>
                </Grid>
               
                <img
                    src={'/images/wallet-avatar.png'}
                    style={{height:35,width:35}}
                />
            </Grid>

        </Grid>
        <Grid item xs={12}>
            <Grid container direction='row' style={{alignItems:'center',marginBottom:16}}>
                <Grid item xs style={{textAlign:'center'}}>
                    <IconButton style={{background:'#A9A9A9'}}>
                        <PieChartOutlineIcon style={{color:'white'}}/>
                    </IconButton>
                </Grid>
                <Grid item xs style={{textAlign:'center'}}>
                    <IconButton>
                        <AccessTimeIcon/>
                    </IconButton>
                
                </Grid>
                <Grid item xs style={{textAlign:'center'}}>
                    <IconButton>
                        <PersonIcon/>
                    </IconButton>
                </Grid>
                <Grid item xs style={{textAlign:'center'}}>
                    <IconButton>
                        <SettingsIcon/>
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} style={{marginBottom:16  }}>
            <CopyToClipboard text={account.address}>
                <Grid container direction='row' style={{alignItems:'center',cursor:'pointer'}}>
                    <CircleIcon 
                        style={{fontSize:12,color:'green',marginRight:4}}
                    />
                    <Typography style={{fontSize:12,marginRight:4}}>
                        {account.address.substring(0,5)}...{account.address.substring(account.address.length-4)}
                    </Typography>
                    <ContentCopyIcon
                        style={{fontSize:12}}
                    />
                </Grid>

            </CopyToClipboard>
        </Grid>
        <Grid item xs={12} style={{marginBottom:16}}>
            <Typography variant='h5'><strong>USD{usdBalance.toFixed(2)}</strong></Typography>

        </Grid>
        <Grid item xs={12} style={{marginBottom:16}}>
            <Typography style={{marginBottom:8}}><strong>My Portfolio</strong></Typography>
            <AssetCard
                assetName='ApeCoin'
                assetType='Ethereum'
                symbol='APE'
                amount={walletBalance['APE']}
            />
            <AssetCard
                assetName='Bitcoin'
                assetType='Bitcoin'
                symbol='BTC'
                amount={walletBalance['BTC']}
            />
            <AssetCard
                assetName='Ether'
                assetType='Ethereum'
                symbol='ETH'
                amount={walletBalance['ETH']}
            />
            <AssetCard
                assetName='Matic'
                assetType='Matic'
                symbol='MATIC'
                amount={walletBalance['MATIC']}
            />
            <AssetCard
                assetName='US Dollar'
                assetType='Fiat'
                symbol='USD'
                amount={walletBalance['USD']}
            />


        </Grid>
        <Grid item xs={12}>
            <Grid container>
                <Grid item xs={12} style={{marginBottom:16}}>
                    <Button onClick={()=>{
                        dispatch({
                            type:'SETPAGE',
                            data:'transfer'
                        })
                    }} fullWidth variant='contained'>Transfer</Button>
                </Grid>
                <Grid item xs={12} style={{marginBottom:16}} >
                    <Button fullWidth variant='outlined'>Add Funds</Button>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
}
export default WalletHome