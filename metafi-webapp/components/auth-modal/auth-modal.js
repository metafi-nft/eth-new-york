import React, { useState } from 'react' 
import { Button, Dialog, DialogContent, DialogTitle, Grid, Icon, IconButton, InputAdornment, TextField, Typography } from '@mui/material'

import AuthHeader from './auth-header';
import AuthBody from './auth-body';
import { useWeb3 } from '../../contexts/wallet-context';
const AuthModal = (props)=>{
    const {showAuthModal} = useWeb3()
    return <Dialog open={showAuthModal} >
        <DialogTitle>
            <AuthHeader/>
        </DialogTitle>
        <DialogContent>
           <AuthBody/>
        </DialogContent>
    </Dialog>

}
export default AuthModal