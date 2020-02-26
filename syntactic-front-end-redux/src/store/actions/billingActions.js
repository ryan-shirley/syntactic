import API from "../../utils/API"

/**
 * getAllPayments() return all payments for a suer
 */
export const getAllPayments = () => {
    return dispatch => {
        dispatch({ type: "LOADING_PAYMENTS" })

        API.get('/payments')
            .then(data => {
                dispatch({ type: "PAYMENTS_SUCCESSFULLY_LOADED", payload: data })
            }) 
            .catch(error => {
                dispatch({ type: "PAYMENTS_REQUEST_ERROR", payload: error })
            })
    }
}

/**
 * getPayment() return single payment for a suer
 */
export const getPayment = id => {
    return dispatch => {
        dispatch({ type: "LOADING_PAYMENT" })

        API.get('/payments/' + id)
            .then(data => {
                dispatch({ type: "PAYMENT_SUCCESSFULLY_LOADED", payload: data })
            }) 
            .catch(error => {
                dispatch({ type: "PAYMENTS_REQUEST_ERROR", payload: error })
            })
    }
}