import axios from "axios"
const API_URL = "http://localhost:4444"

/**
 * getUser() Get the user that is current logged in
 */
export const updateBio = newBio => {
    return (dispatch, getState, { getFirebase }) => {
        // console.log('Updating bio');

        if(newBio === "") {
            return dispatch({ type: "UPDATE_BIO_ERROR", error: 'You must enter a value for your bio.' })
        }
        
        const firebase = getFirebase()
        firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(token => {
                dispatch({ type: "PROCESSING_TRUE" })

                axios
                    .put(API_URL + "/user/update-bio", { newBio }, {
                        headers: { authorization: `Bearer ${token}` }
                    })
                    .then(res => {
                        dispatch({ type: "UPDATE_BIO_SUCCESS", newBio })
                        dispatch({ type: "NEXT_STAGE" })
                    })
                    .catch(error => {
                        dispatch({ type: "UPDATE_BIO_ERROR", error: error.response.data })
                    })
            })
            .catch(error => {
                // Handle error
                dispatch({ type: "FIREBASE_AUTH_GET_TOKEN_ERROR", error })
            })
    }
}

/**
 * prevStage() Return to previous stage
 */
export const prevStage = () => {
    return (dispatch, getState, { getFirebase }) => {
        dispatch({ type: "PREVIOUS_STAGE" })
    }
}

/**
 * nextStage() Advances to next stage in onboarding.
 * Checks if required data has be input.
 */
export const nextStage = () => {
    return (dispatch, getState, { getFirebase }) => {
        dispatch({ type: "NEXT_STAGE" })
    }
}

/**
 * loadContentInput() Advances to stage for inputting content
 * Varies input fields depending on the input type
 */
export const loadContentInput = inputType => {
    return (dispatch, getState, { getFirebase }) => {
        // console.log('Loading content input ' + inputType);
        dispatch({ type: "SET_STAGE", stage: 4, inputType })
    }
}

/**
 * addWriterData() Add text to writer content array
 */
export const addContentText = text => {
    return (dispatch, getState, { getFirebase }) => {
        if(text === "") {
            dispatch({ type: "ADD_CONTENT_ERROR", error: 'You must enter a value for your content.' })
        }

        // Send content to be analysed and added to user account
        const firebase = getFirebase()
        firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(token => {
                dispatch({ type: "PROCESSING_TRUE" })

                axios
                    .post(API_URL + "/user/writer/add-content", { text }, {
                        headers: { authorization: `Bearer ${token}` }
                    })
                    .then(res => {
                        dispatch({ type: "ADD_CONTENT_SUCCESS", text })
                        dispatch({ type: "SET_STAGE", stage: 3 })
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

/**
 * finishOnboarding() Finish onboarding for user.
 */
export const finishOnboarding = () => {
    return (dispatch, getState, { getFirebase }) => {
        // console.log('Finishing onboarding');
        
        const firebase = getFirebase()
        firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(token => {
                dispatch({ type: "PROCESSING_TRUE" })

                axios
                    .put(API_URL + "/user/finish-onboarding", null, {
                        headers: { authorization: `Bearer ${token}` }
                    })
                    .then(res => {
                        dispatch({ type: "FINISHED_ONBOARDING_SUCCESS" })
                    })
                    .catch(error => {
                        dispatch({ type: "FINISHED_ONBOARDING_ERROR", error: error.response.data.error })
                    })
            })
            .catch(error => {
                // Handle error
                dispatch({ type: "FIREBASE_AUTH_GET_TOKEN_ERROR", error })
            })
    }
}