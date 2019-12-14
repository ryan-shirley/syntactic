const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN_ERROR":
            // console.log("login error")
            
            return {
                ...state,
                displayName: action.displayName,
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
                // displayName: action.displayName,
                authError: null
            }

        case "SIGNUP_ERROR":
            console.log("signup error")
            console.log(action.err);
            
            return {
                ...state,
                authError: action.err.response.data.message
            }

        default:
            return state
    }
}

export default authReducer
