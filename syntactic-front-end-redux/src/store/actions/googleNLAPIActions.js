import axios from "axios"
const API_URL = "http://localhost:4444"

/**
 * getUser() Get the user that is current logged in
 */
export const addContent = text => {
    return (dispatch, getState, { getFirebase }) => {

        // TODO: Check that a value has been passed
        const firebase = getFirebase()

        firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(token => {
                dispatch({ type: "PROCESSING_CONTENT" })

                axios
                    .post(API_URL + "/user/writer/add-content", {text}, {
                        headers: { authorization: `Bearer ${token}` }
                    })
                    .then(res => {
                        dispatch({ type: "ADD_CONTENT_SUCCESS" })
                    })
                    .catch(error => {
                        dispatch({ type: "ADD_CONTENT_ERROR", error: error.response.data })
                    })
            })
            .catch(error => {
                // Handle error
                dispatch({ type: "FIREBASE_AUTH_GET_TOKEN_ERROR", error })
            })
    }
}
