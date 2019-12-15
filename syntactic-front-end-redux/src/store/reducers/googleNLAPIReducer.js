const initState = {
    error: null
}

const googleNLAPIReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_CONTENT_ERROR":
            // console.log(action.error);
            return {
                ...state,
                error: action.error.details
            }
        case "ADD_CONTENT_SUCCESS":
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export default googleNLAPIReducer
