
import { createStore, combineReducers } from 'redux';
import * as GeneralReducer from './reducers/general-reducer'
import * as FeedbackReducer from './reducers/feedback-reducer'
import * as InvestmentReducer from './reducers/investment-reducer'
import * as WalletInvestmentReducer from './reducers/wallet-investment-reducer'


const rootReducer = combineReducers({
  generalReducer: GeneralReducer.reducer,
  feedbackReducer: FeedbackReducer.reducer,
  investmentReducer: InvestmentReducer.reducer,
  walletInvestmentReducer:WalletInvestmentReducer.reducer
})

export const store = createStore(rootReducer);

