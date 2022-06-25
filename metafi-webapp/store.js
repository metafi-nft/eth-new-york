
import { createStore, combineReducers } from 'redux';
import * as GeneralReducer from './reducers/general-reducer'
import * as FeedbackReducer from './reducers/feedback-reducer'


const rootReducer = combineReducers({
  generalReducer: GeneralReducer.reducer,
  feedbackReducer: FeedbackReducer.reducer,
})

export const store = createStore(rootReducer);

