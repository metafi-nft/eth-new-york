
export function reducer(state= {
    walletBalance:{
        USD:3000.00,
        APE:219.129942,
        ETH:0.02000,
        MATIC:0,
        BTC:0
    },
    USDRates:{
        USD:1,
        APE:0.2192982456140351,
        ETH:0.000816593,
        MATIC:1.687339386382159,
        BTC:0.000047
    },
    page:''
  }, action) {
      switch(action.type){
        case 'SETPAGE':{
            return{
                ...state,
                page:action.data
            }
        }
        case 'SETWALLETBALANCE':{
            return{
                ...state,
                walletBalance:action.data
            }
        }
        case "UPDATEWALLETBALANCE":{
            var newWalletBalance = {
                ...state.walletBalance,
                [action.data.symbol]:state.walletBalance[action.data.symbol] + action.data.amount
            }
            console.log(newWalletBalance)
            sessionStorage.setItem('walletBalance',JSON.stringify(newWalletBalance))
            return{
                ...state,
                walletBalance:newWalletBalance
            }
        }
        default:
          return state
      }
    
}