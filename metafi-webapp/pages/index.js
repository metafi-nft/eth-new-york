import { Grid, Paper } from '@mui/material'
import React from 'react'
import AuthBody from '../components/auth-modal/auth-body'
import AuthHeader from '../components/auth-modal/auth-header'
import { useWeb3 } from '../contexts/wallet-context'

const Home = ()=>{
  const {account} = useWeb3()
  console.log(account)
  
  return <Grid container style={{justifyContent:'center', alignItems:'center',minHeight:'100vh',background:'#EBECF0'}}>
    <Grid item xs={12} sm={8} md={5} style={{padding:16}}>
      <Paper style={{padding:16,borderRadius:18}}>
        <Grid>
          <AuthHeader/>
          <AuthBody/>
        </Grid>

      </Paper>
    </Grid>
  </Grid>
}
export default Home