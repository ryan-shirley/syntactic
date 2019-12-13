import authReducer from "./authReducer"
import categoryReducer from "./categoryReducer"
import { combineReducers } from "redux"
import { firebaseReducer } from "react-redux-firebase"

/**
 * rootReducer - Combine multiple reducers into one main reducer
 */
const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    firebase: firebaseReducer
})

export default rootReducer
