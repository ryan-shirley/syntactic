const initState = {
    isLoadingdata: false,
    payments: [],
    paymentBeingPayed: {},
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

        case "LOADING_PAYMENT":
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

        case "PAYMENT_SUCCESSFULLY_LOADED":
            return {
                ...state,
                paymentBeingPayed: action.payload,
                isLoadingdata: false,
                error: {}
            }

        case "SET_PAYMENT_BEING_PAYED":
            return {
                ...state,
                paymentBeingPayed: action.payload
            }

        case "CLEAR_PAYMENT_BEING_PAYED":
            return {
                ...state,
                paymentBeingPayed: {}
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
