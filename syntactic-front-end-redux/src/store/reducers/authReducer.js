const initState = {
    user: {},
    authError: null
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
                authError: null
            }

        case "SIGNUP_ERROR":
            console.log("signup error")
            console.log(action.err);
            
            return {
                ...state,
                authError: action.err.response.data.message
            }
        case "FETCH_USER_SUCCESS":

            return {
                ...state,
                user: action.user,
                authError: null
            }
            case "FETCH_USER_ERROR":

                return {
                    ...state,
                    authError: action.error
                }

        default:
            return state
    }
}

export default authReducer
