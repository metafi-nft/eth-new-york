import { Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useWeb3 } from '../../contexts/wallet-context'
import { createWallet } from '../../utility/wallet-utils';

const AuthBody = (props)=>{
    var keystoreArray = localStorage.getItem('ksa')
    const [password,setPassword] = useState('')
    const [showPassword,setShowPassword] = useState(false)
    const {connect} = useWeb3()

    const handleChange = (event)=>{
        setPassword(event.target.value)
    }

    const handleSubmit = async ()=>{
        //if no key store, create the wallet
        if(keystoreArray===null){
            console.log('no keystore')
            
            var ksa = await createWallet(password)
            localStorage.setItem('ksa',JSON.stringify(ksa))
            //create account, encypt with the password and store the wallet in session sotrage and the keystore in local storage
            
        }
        //decrypt the account using the keystore and save the wallet in the session sotrage
        var ksa = localStorage.getItem('ksa')
        connect(password)
        
    }



    return <Grid container>
        <Grid item xs={12} style={{marginBottom:8}}>
            <img
                src={'/images/logo.png'}
                style={{height:50,width:50}}
            />
        </Grid>
        <Grid item xs={12} style={{marginBottom:16}}>
            <Typography variant='h5'><strong>Metafi Wallet</strong></Typography>
        </Grid>
        <Grid item xs={12} style={{marginBottom:16}}>
            <Typography style={{color:'#949494'}}>{keystoreArray===null?"To get started, create a new wallet or import one that you already have":"Welcome Back"}</Typography>
        </Grid>
        <Grid item xs={12} style={{marginBottom:16}}>
            <Grid container direction='row'>
            <img
                src={'/images/wallet-1.png'}
                style={{height:25,width:25,marginRight:4}}
            />
            <img
                src={'/images/wallet-2.png'}
                style={{height:25,width:25,marginRight:4}}
            />
            <img
                src={'/images/wallet-3.png'}
                style={{height:25,width:25,marginRight:4}}
            />
            </Grid>
        </Grid>
        <Grid item xs={12} style={{marginBottom:16}}>
            <TextField
                onChange={handleChange}
                variant='standard'
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        <IconButton
                            onClick={()=>{
                                setShowPassword(!showPassword)
                            }}
                        >
                            {
                                showPassword?<VisibilityOff/>:<Visibility/>
                            }
                        </IconButton>
                    </InputAdornment>
                }}
                value={password}
                type={showPassword?'default':'password'}
                fullWidth
                label={keystoreArray===null?"Enter a password to continue":"Enter your password to continue"}
            />
        </Grid>
        <Grid item xs={12} style={{marginBottom:16}}>
            <Button
                fullWidth
                variant='contained'
                onClick={handleSubmit}
            >
                {keystoreArray===null?"Create a new wallet":"Enter your password to continue"}
            </Button>
        </Grid>
        {
            keystoreArray===null?
            <Grid item xs={12}>
                <Button
                    fullWidth
                    onClick={handleSubmit}
                    variant='outlined'
                >
                    Import an existing wallet
                </Button>
            </Grid>
            :
            ""
        }
    </Grid>
}
export default AuthBody