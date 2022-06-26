import { Grid, Paper } from '@mui/material'
import React from 'react'
import AuthBody from '../components/auth-modal/auth-body'
import AuthHeader from '../components/auth-modal/auth-header'
import TransferCard from '../components/wallet-home/transfer-card'
import WalletHome from '../components/wallet-home/wallet-home'
import { useWeb3 } from '../contexts/wallet-context'
import { useSelector } from 'react-redux'
import TransactionModal from '../components/transaction-modal/transaction-modal'
import TransactionDetailsModal from '../components/transaction-details-modal/transaction-details-modal'
const Home = ()=>{
  const page = useSelector(state=>state.walletReducer.page)
  const {account} = useWeb3()
  console.log(account)

  return <Grid container style={{justifyContent:'center', alignItems:'center',minHeight:'100vh',background:'#EBECF0'}}>
    <Grid item xs={12} sm={8} md={5} style={{padding:16}}>
      <Paper style={{padding:16,borderRadius:18}}>
        {
          account!==''&&account.address!==null?
          page==='transfer'?<TransferCard/>:<WalletHome/>
          :
          <Grid>
            <AuthHeader/>
            <AuthBody/>
          </Grid>
        }


      </Paper>
      <TransactionModal/>
      <TransactionDetailsModal/>
    </Grid>
  </Grid>
}
export default Home