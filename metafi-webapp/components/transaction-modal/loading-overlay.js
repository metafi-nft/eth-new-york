import { CircularProgress, Grid } from '@mui/material'
import React from 'react' 

const LoadingOverlay = (props)=>{

    return <Grid container style={{
            width:'100%',
            height:'100%',
            position:'absolute',
            background:'rgba( 255, 255, 255, 0.65 )',
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            top:0,
            left:0,
            alignItems:'center',
            justifyContent:'center'
        }}
    >
        <CircularProgress
        
        />
    </Grid>
}
export default LoadingOverlay