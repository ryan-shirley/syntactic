import axios from "axios"
import API from "../../utils/API"

const API_URL = process.env.REACT_APP_BACKEND_API

/**
 * signIn() Signs in using Firebase Auth
 */
export const signIn = credentials => {
    let error = {
        message: "",
        fields: {}
    }

    // validate details were sent
    if (!credentials.email) {
        error.fields.email = "You must enter an email address!"
    }
    if (!credentials.password) {
        error.fields.password = "You must enter a password!"
    }

    // Check for errors
    if (
        Object.entries(error.fields).length !== 0 &&
        error.fields.constructor === Object
    ) {
        error.message = "You must fill out all the input fields."

        return dispatch => {
            dispatch({ type: "ERROR_AUTH_NO_VALUE_INPUT", payload: error })
        }
    }

    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        dispatch({ type: "AUTH_REQUEST_PROCESSING_STARTED" })

        firebase
            .auth()
            .signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(() => {
                dispatch({
                    type: "FIREBASE_LOGIN_SUCCESS",
                    displayName: firebase.auth().currentUser.displayName
                })
            })
            .catch(err => {
                dispatch({
                    type: "FIREBASE_LOGIN_ERROR",
                    payload: { message: err.message }
                })
            })
    }
}

/**
 * signUp() Signs up a new user using Firebase Auth.
 * Sets display name in Firebase and creates user in MongoDB
 */
export const signUp = (newUser, role) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        if (newUser.password !== newUser.conf_password) {
            let error = {
                message: "Error with passwords",
                fields: {
                    conf_password: "Passwords do not match"
                }
            }

            dispatch({ type: "SIGNUP_ERROR", payload: error })
        } else {
            dispatch({ type: "AUTH_REQUEST_PROCESSING_STARTED" })

            firebase
                .auth()
                .createUserWithEmailAndPassword(newUser.email, newUser.password)
                .then(result => {
                    const displayName = `${newUser.first_name} ${newUser.last_name}`

                    // Add display name to Firebase profile
                    result.user
                        .updateProfile({
                            displayName
                        })
                        .then(() => {
                            // console.log("New user signed up on Firebase!", result)

                            newUser.uid = result.user.uid
                            newUser.role =
                                role === "writer" ? "writer" : "content seeker"

                            axios
                                .post(API_URL + "/register", newUser)
                                .then(resp => {
                                    dispatch({
                                        type: "SIGNUP_SUCCESS",
                                        payload: resp.data
                                    })
                                })
                                .catch(err => {
                                    dispatch({
                                        type: "SIGNUP_ERROR",
                                        payload: {
                                            message: err.response.data.message
                                        }
                                    })
                                })
                        })
                })
                .catch(err => {
                    dispatch({
                        type: "SIGNUP_ERROR",
                        payload: { message: err }
                    })
                })
        }
    }
}

/**
 * signUpWithRoleMongo() Signs up a new user using in
 * mongo with set role.
 */
export const signUpWithRoleMongo = role => {
    return (dispatch, getState, { getFirebase }) => {
        let state = getState()
        let { email, uid, displayName } = state.firebase.auth

        // Get Name Seperated
        const nameWords = displayName.split(" ")
        let first_name = nameWords.shift()
        let last_name = nameWords.join(" ")

        let newUser = {
            first_name,
            last_name,
            email,
            uid,
            role
        }

        dispatch({ type: "AUTH_REQUEST_PROCESSING_STARTED" })

        API.post("/register", newUser)
            .then(resp => {
                dispatch({
                    type: "SIGNUP_SUCCESS",
                    payload: resp
                })
            })
            .catch(err => {
                dispatch({
                    type: "SIGNUP_ERROR",
                    payload: {
                        message: err.response.data.message
                    }
                })
            })
    }
}

/**
 * signOut() Signs out using Firebase Auth
 */
export const signOut = () => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        await firebase.auth().signOut()
        dispatch({ type: "SIGNOUT_SUCCESS" })
    }
}

/**
 * getUser() Get the user that is current logged in
 */
export const getUser = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        // console.log("Getting User")

        firebase
            .auth()
            .currentUser.getIdToken(/* forceRefresh */ true)
            .then(token => {
                dispatch({ type: "LOADING_USER" })

                axios
                    .get(API_URL + "/users/current", {
                        headers: { authorization: `Bearer ${token}` }
                    })
                    .then(res => {
                        let user = res.data

                        if (user) {
                            dispatch({
                                type: "FETCH_USER_SUCCESS",
                                payload: user
                            })
                        } else {
                            dispatch({
                                type: "NO_USER_IN_MONGO",
                                payload: {
                                    code: 404,
                                    message: "No user found in mongo database."
                                }
                            })
                        }
                    })
                    .catch(error => {
                        dispatch({
                            type: "FETCH_USER_ERROR",
                            payload: { message: error.message }
                        })
                    })
            })
            .catch(function(error) {
                // Handle error
                dispatch({ type: "FIREBASE_AUTH_GET_TOKEN_ERROR" })
            })
    }
}

/**
 * updateUser() Upate user
 */
export const updateUser = userDTO => {
    return dispatch => {
        dispatch({ type: "USER_REQUEST_PROCESSING" })

        API.uploadFilePut("/users/" + userDTO._id, userDTO)
            .then(data => {
                // dispatch({ type: "PROJECT_UPDATED_SUCCESSFULLY", payload: data.project })
                // dispatch({ type: "PROJECT_WRITER_LIST_RECEIVED", payload: data.writers })
            })
            .catch(error => {
                // dispatch({ type: "PROJECTS_REQUEST_ERROR", payload: error })
            })
    }
}
