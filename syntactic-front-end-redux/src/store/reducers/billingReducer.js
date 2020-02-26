const initState = {
    isLoadingdata: false,
    payments: [],
    error: {}
}

const BillingReducer = (state = initState, action) => {
    switch (action.type) {
        // Success
        case "LOADING_PAYMENTS":
            return {
                ...state,
                isLoadingdata: true,
                error: {}
            }

        case "PAYMENTS_SUCCESSFULLY_LOADED":
            return {
                ...state,
                payments: action.payload,
                isLoadingdata: false,
                error: {}
            }

        // Errors
        case "PAYMENTS_REQUEST_ERROR":
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default BillingReducer
