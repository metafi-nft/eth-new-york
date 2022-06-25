import { Grid, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react' 
import { useWeb3 } from '../../contexts/wallet-context'

const AuthHeader = (props)=>{
    const {setShowAuthModal} = useWeb3()
    return <Grid container direction={'row'} style={{alignItems:'center'}}>
    <Grid style={{flexGrow:1}}>
    </Grid>
    <IconButton
        onClick={()=>{
            setShowAuthModal(false)
        }}
    >
        <CloseIcon/>
    </IconButton>
</Grid>
}
export default AuthHeader