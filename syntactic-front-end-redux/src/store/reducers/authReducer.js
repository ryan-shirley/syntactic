const initState = {
    user: {},
    loadingUser: false,
    authError: null,
    signupSucess: false
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN_ERROR":
            // console.log("login error")
            
            return {
                ...state,
                authError: action.err.message
            }

        case "LOGIN_SUCCESS":
            console.log("login success")
            
            return {
                ...state,
                authError: null
            }

        case "SIGNOUT_SUCCESS":
            console.log("signout success")
            return state

        case "SIGNUP_SUCCESS":
            console.log("signup success")
            return {
                ...state,
                authError: null,
                signupSucess: true
            }

        case "SIGNUP_ERROR":
            console.log("signup error")
            console.log(action.err);
            
            return {
                ...state,
                authError: action.err.response.data.message
            }
        case "LOADING_USER":
            return {
                ...state,
                loadingUser: true
            }
        case "FETCH_USER_SUCCESS":

            return {
                ...state,
                user: action.user,
                loadingUser: false,
                authError: null
            }
            case "FETCH_USER_ERROR":

                return {
                    ...state,
                    authError: action.error,
                    loadingUser: false
                }
            case "FIREBASE_AUTH_GET_TOKEN_ERROR":

                return {
                    ...state,
                    authError: action.error
                }
            case "COMPLETE_ONBOARDING":
                let user = state.user
                user.completed_onboarding = true
                
                return {
                    ...state,
                    user
                }
        default:
            return state
    }
}

export default authReducer
