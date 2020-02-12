import axios from "axios"
const API_URL = process.env.REACT_APP_BACKEND_API

/**
 * updateBio() Updates the users bio
 */
export const updateBio = (user_id, newBio) => {
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
                    .patch(API_URL + "/users/" + user_id, { newBio }, {
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
 * updateBusiness() Updates the users business description
 */
export const updateBusiness = (user_id, newDesc) => {
    return (dispatch, getState, { getFirebase }) => {

        if(newDesc === "") {
            return dispatch({ type: "UPDATE_BUSINESS_DESCRIPTION_ERROR", error: 'You must enter a value for your business.' })
        }
        
        const firebase = getFirebase()
        firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(token => {
                dispatch({ type: "PROCESSING_TRUE" })

                axios
                    .patch(API_URL + "/users/" + user_id, { newBusiness: newDesc }, {
                        headers: { authorization: `Bearer ${token}` }
                    })
                    .then(res => {
                        dispatch({ type: "UPDATE_BUSINESS_DESCRIPTION_SUCCESS", newDesc })
                        dispatch({ type: "NEXT_STAGE" })
                    })
                    .catch(error => {
                        dispatch({ type: "UPDATE_BUSINESS_DESCRIPTION_ERROR", error: error.response.data })
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
                    .post(API_URL + "/analyse/project", { text }, {
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
export const finishOnboarding = user_id => {
    return (dispatch, getState, { getFirebase }) => {
        // console.log('Finishing onboarding');
        
        const firebase = getFirebase()
        firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(token => {
                dispatch({ type: "PROCESSING_TRUE" })

                axios
                    .patch(API_URL + "/users/" + user_id, { newOnboardingStatus: true }, {
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