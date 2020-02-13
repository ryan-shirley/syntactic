import axios from "axios"
const API_URL = process.env.REACT_APP_BACKEND_API

/**
 * moveStage() Move stage
 */
export const moveStage = value => {
    return (dispatch, getState, { getFirebase }) => {
        dispatch({ type: "MOVE_STAGE", value })
    }
}

/**
 * updateBio() Updates the users bio
 */
export const updateBio = (user_id, newBio) => {
    return (dispatch, getState, { getFirebase }) => {

        // Validate value
        if(newBio === "") {
            return dispatch({ type: "ERROR_ONBOARDING_NO_VALUE_INPUT", error: 'You must enter a value for your bio.' })
        }
        
        const firebase = getFirebase()
        firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(token => {
                dispatch({ type: "ONBOARDING_REQUEST_PROCESSING_STARTED" })

                axios
                    .patch(API_URL + "/users/" + user_id, { newBio }, {
                        headers: { authorization: `Bearer ${token}` }
                    })
                    .then(res => {
                        dispatch({ type: "BIO_ADDED_SUCCESSFULLY", value: res })
                        dispatch({ type: "MOVE_STAGE", value: 1 })
                    })
                    .catch(error => {
                        console.log(error);
                        
                        dispatch({ type: "ONBOARDING_REQUEST_ERROR", error: error.response.data })
                    })
            })
            .catch(error => {
                // Handle error
                dispatch({ type: "FIREBASE_AUTH_GET_TOKEN_ERROR", error })
            })
    }
}

/**
 * loadContentInput() Advances to stage for inputting content
 * Varies input fields depending on the input type
 */
export const loadContentInput = inputType => {
    return (dispatch, getState, { getFirebase }) => {
        dispatch({ type: "SET_STAGE", value: 4 })
        dispatch({ type: "ONBOARDING_SET_INPUT_TYPE", value: inputType })
    }
}

/**
 * addWriterData() Add text to writer content array
 */
export const analyseTextProject = text => {
    return (dispatch, getState, { getFirebase }) => {
        if(text === "") {
            dispatch({ type: "ERROR_ONBOARDING_NO_VALUE_INPUT", error: 'You must enter a value for your content.' })
        }

        // Send content to be analysed and added to user account
        const firebase = getFirebase()
        firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(token => {
                dispatch({ type: "ONBOARDING_REQUEST_PROCESSING_STARTED" })

                axios
                    .post(API_URL + "/analyse/project", { text }, {
                        headers: { authorization: `Bearer ${token}` }
                    })
                    .then(res => {
                        dispatch({ type: "PROJECT_ANALYSED_SUCCESS" })
                        dispatch({ type: "SET_STAGE", value: 3 })
                    })
                    .catch(error => {
                        dispatch({ type: "ONBOARDING_REQUEST_ERROR", error: error.response.data })
                    })
            })
            .catch(error => {
                // Handle error
                dispatch({ type: "FIREBASE_AUTH_GET_TOKEN_ERROR", error })
            })
    }
}

/**
 * completeOnboarding() Complete onboarding for user.
 */
export const completeOnboarding = user_id => {
    return (dispatch, getState, { getFirebase }) => {
        
        const firebase = getFirebase()
        firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(token => {
                dispatch({ type: "ONBOARDING_REQUEST_PROCESSING_STARTED" })

                axios
                    .patch(API_URL + "/users/" + user_id, { newOnboardingStatus: true }, {
                        headers: { authorization: `Bearer ${token}` }
                    })
                    .then(res => {
                        dispatch({ type: "ONBOARDING_COMPLETED" })
                        dispatch({ type: "AUTH_ONBOARDING_COMPLETED" })
                    })
                    .catch(error => {
                        dispatch({ type: "ONBOARDING_REQUEST_ERROR", error: error.response.data.error })
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