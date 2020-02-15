import authReducer from "./authReducer"
// import categoryReducer from "./categoryReducer"
// import googleNLAPIReducer from "./googleNLAPIReducer"
import onboardingReducer from "./onboardingReducer"
import projectsReducer from "./projectsReducer"
import { combineReducers } from "redux"
import { firebaseReducer } from "react-redux-firebase"

/**
 * rootReducer - Combine multiple reducers into one main reducer
 */
const rootReducer = combineReducers({
    auth: authReducer,
    // nlp: googleNLAPIReducer,
    // category: categoryReducer,
    projects: projectsReducer,
    firebase: firebaseReducer,
    onboarding: onboardingReducer
})

export default rootReducer
