import authReducer from './authReducer'
import categoryReducer from './categoryReducer'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  firebase: firebaseReducer
});

export default rootReducer

// the key name will be the data property on the state object