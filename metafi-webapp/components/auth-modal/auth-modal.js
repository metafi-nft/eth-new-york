import React, { useState } from 'react' 
import { Button, Dialog, DialogContent, DialogTitle, Grid, Icon, IconButton, InputAdornment, TextField, Typography } from '@mui/material'

import AuthHeader from './auth-header';
import AuthBody from './auth-body';
const AuthModal = (props)=>{
   
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