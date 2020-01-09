import axios from "axios"
const API_URL = "http://localhost:4444"

/**
 * addContent() Analyse content from user and add to categories
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
                    .post(
                        API_URL + "/user/writer/add-content",
                        { text },
                        {
                            headers: { authorization: `Bearer ${token}` }
                        }
                    )
                    .then(res => {
                        dispatch({ type: "ADD_CONTENT_SUCCESS" })
                    })
                    .catch(error => {
                        dispatch({
                            type: "ADD_CONTENT_ERROR",
                            error: error.response.data
                        })
                    })
            })
            .catch(error => {
                // Handle error
                dispatch({ type: "FIREBASE_AUTH_GET_TOKEN_ERROR", error })
            })
    }
}

/**
 * analyse() Analyse text
 */
export const analyse = text => {
    return (dispatch, getState, { getFirebase }) => {
        if (text === "") {
            dispatch({
                type: "ANALYSE_BRIEF_ERROR",
                error: "You must enter a value for the brief!"
            })
        } else {
            const firebase = getFirebase()

            firebase
                .auth()
                .currentUser.getIdToken(true)
                .then(token => {
                    dispatch({ type: "PROCESSING_BREIF" })

                    axios
                        .post(
                            API_URL + "/nlp/analyse-brief",
                            { text },
                            {
                                headers: { authorization: `Bearer ${token}` }
                            }
                        )
                        .then(res => {
                            dispatch({ type: "ANALYSE_BRIEF_SUCCESS", results: res.data })
                        })
                        .catch(error => {
                            // console.log(error);
                            dispatch({
                                type: "ANALYSE_BRIEF_ERROR",
                                error: error.response.data.details
                            })
                        })
                })
                .catch(error => {
                    // Handle error
                    dispatch({ type: "FIREBASE_AUTH_GET_TOKEN_ERROR", error })
                })
        }
    }
}
