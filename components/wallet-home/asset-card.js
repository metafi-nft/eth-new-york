import { Grid, Typography } from '@mui/material'
import React from 'react' 

const AssetCard = (props)=>{

    return <Grid container direction='row' style={{background:'#F4F4F4',alignItems:'center',marginBottom:8,padding:8,borderRadius:8}}>
        <img
            src={`/images/${props.symbol}.svg`}
            style={{marginRight:8,height:35,width:35}}
        />
        <Grid style={{flexGrow:1}}>
       
                <Typography><strong>{props.assetName}</strong></Typography>
                <Typography style={{color:'#949494',fontStyle:'italic',fontSize:14}}>{props.assetType}</Typography>
   
        </Grid>
        <Typography style={{fontSize:10,marginRight:4}}>
            {props.symbol}
        </Typography>
        <Typography>
            <strong>{props.amount.toFixed(4)}</strong>
        </Typography>
    </Grid>
}
export default AssetCard