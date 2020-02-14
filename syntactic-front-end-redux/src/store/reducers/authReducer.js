const initState = {
    requestProcessing: false,
    user: {},
    loadingUser: false,
    error: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        // Success
        case "AUTH_REQUEST_PROCESSING_STARTED":
            return {
                ...state,
                requestProcessing: true,
                error: null,
            }

        case "FIREBASE_LOGIN_SUCCESS":
            return {
                ...state,
                requestProcessing: false,
                error: null
            }

        case "SIGNUP_SUCCESS":
            return {
                ...state,
                error: null,
                signupSucess: true,
                requestProcessing: false,
                user: action.payload
            }

        case "AUTH_ONBOARDING_COMPLETED":
            let user = state.user
            user.completed_onboarding = true
            
            return {
                ...state,
                user
            }

        // Errors
        case "ERROR_AUTH_NO_VALUE_INPUT":
            return {
                ...state,
                error: action.payload
            }

        case "FIREBASE_LOGIN_ERROR":
            return {
                ...state,
                requestProcessing: false,
                error: action.payload
            }

        case "SIGNUP_ERROR":
            return {
                ...state,
                requestProcessing: false,
                error: action.payload
            }









        // case "LOGIN_ERROR":
        //     // console.log("login error")
            
        //     return {
        //         ...state,
        //         authError: action.err.message
        //     }

        // case "SIGNOUT_SUCCESS":
        //     console.log("signout success")
        //     return state

        // case "SIGNUP_ERROR":
        //     console.log("signup error")
        //     console.log(action.err);
            
        //     return {
        //         ...state,
        //         authError: action.err.response.data.message
        //     }
        // case "LOADING_USER":
        //     return {
        //         ...state,
        //         loadingUser: true
        //     }
        // case "FETCH_USER_SUCCESS":

        //     return {
        //         ...state,
        //         user: action.user,
        //         loadingUser: false,
        //         authError: null
        //     }
        //     case "FETCH_USER_ERROR":

        //         return {
        //             ...state,
        //             authError: action.error,
        //             loadingUser: false
        //         }
        //     case "FIREBASE_AUTH_GET_TOKEN_ERROR":

        //         return {
        //             ...state,
        //             authError: action.error
        //         }
        default:
            return state
    }
}

export default authReducer
