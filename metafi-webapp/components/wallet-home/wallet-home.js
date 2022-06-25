import { Grid, Typography } from '@mui/material'
import React from 'react' 
import { useWeb3 } from '../../contexts/wallet-context'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CircleIcon from '@mui/icons-material/Circle';
const WalletHome = (props)=>{
    const {account} = useWeb3()
    console.log(account)
    return <Grid container>
        <Grid item xs={12}>
            <Grid container direction='row' style={{alignItems:'center'}}>
                <Typography style={{flexGrow:1,color:'#949494'}}>Welcome,</Typography>
                <img
                    src='/wallet-avatar'
                    style={{height:35,width:35}}
                />
            </Grid>

        </Grid>
        <Grid item xs={12}>
            <CopyToClipboard text={this.state.value}
            onCopy={() => this.setState({copied: true})}>
                <Grid container direction='row' style={{alignItems:'center'}}>
                    <CircleIcon 
                        style={{fontSize:12,color:'green'}}
                    />
                    <Typography style={{fontSize:12}}>
                        0xb8e...283a
                    </Typography>
                    <ContentCopyIcon
                        style={{fontSize:12}}
                    />
                </Grid>

            </CopyToClipboard>
        </Grid>
        <Grid item xs={12}>
            <Grid container direction='row' style={{alignItems:'center'}}>
                <Typography style={{flexGrow:1,color:'#949494'}}>Welcome,</Typography>
                <img
                    src='/wallet-avatar'
                    style={{height:35,width:35}}
                />
            </Grid>

        </Grid>
    </Grid>
}
export default WalletHome