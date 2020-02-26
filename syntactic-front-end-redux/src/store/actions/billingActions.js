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