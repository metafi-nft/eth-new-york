
import { createStore, combineReducers } from 'redux';
import * as GeneralReducer from './reducers/general-reducer'
import * as FeedbackReducer from './reducers/feedback-reducer'
import * as AmazonReducer from './reducers/amazon-reducer'
import * as WalletReducer from './reducers/wallet-reducer'


const rootReducer = combineReducers({
  generalReducer: GeneralReducer.reducer,
  feedbackReducer: FeedbackReducer.reducer,
  amazonReducer:AmazonReducer.reducer,
  walletReducer:WalletReducer.reducer
})

export const store = createStore(rootReducer);

