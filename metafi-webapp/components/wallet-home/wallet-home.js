import { Grid, Typography } from '@mui/material'
import React from 'react' 
import { useWeb3 } from '../../contexts/wallet-context'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CircleIcon from '@mui/icons-material/Circle';

import AssetCard from './asset-card';
import { useSelector } from 'react-redux';
const WalletHome = (props)=>{
    const {account} = useWeb3()
    const walletBalance = useSelector(state=>state.walletReducer.walletBalance)
    const USDRates = useSelector(state=>state.walletReducer.USDRates)
    var usdBalance = 0
    for(var asset in walletBalance){
        usdBalance = usdBalance + walletBalance[asset]/USDRates[asset]
    }
    return <Grid container>
        <Grid item xs={12}>
            <Grid container direction='row' style={{alignItems:'center'}}>
                <Typography style={{flexGrow:1,color:'#949494'}}>Welcome,</Typography>
                <img
                    src={'/images/wallet-avatar.png'}
                    style={{height:35,width:35}}
                />
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
                assetName='US Dollar'
                assetType='Fiat'
                symbol='USD'
                amount={walletBalance['USD']}
            />
            <AssetCard
                assetName='ApeCoin'
                assetType='Ethereum'
                symbol='APE'
                amount={walletBalance['APE']}
            />
            <AssetCard
                assetName='Ether'
                assetType='Ethereum'
                symbol='ETH'
                amount={walletBalance['ETH']}
            />

        </Grid>
    </Grid>
}
export default WalletHome