
export function reducer(state= {
    walletBalance:{
      USD:1220.45,
      APE:451.20,
      ETH:12.2391
    },
    USDRates:{
        USD:1,
        APE:0.2192982456140351,
        ETH:0.000816593
    }
  }, action) {
      switch(action.type){
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