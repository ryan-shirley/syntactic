import axios from "axios"
const API_URL = "http://localhost:4444"

/**
 * signIn() Signs in using Firebase Auth
 */
export const signIn = credentials => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        firebase
            .auth()
            .signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(() => {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    displayName: firebase.auth().currentUser.displayName
                })
            })
            .catch(err => {
                dispatch({ type: "LOGIN_ERROR", err })
            })
    }
}

/**
 * signOut() Signs out using Firebase Auth
 */
export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch({ type: "SIGNOUT_SUCCESS" })
            })
    }
}

/**
 * signUp() Signs up a new user using Firebase Auth.
 * Sets display name in Firebase and creates user in MongoDB
 */
export const signUp = newUser => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then(result => {
                const displayName = `${newUser.first_name} ${newUser.last_name}`

                // Add display name to Firebase profile
                result.user.updateProfile({
                    displayName
                })
                // console.log("New user signed up on Firebase!", result)

                newUser.uid = result.user.uid

                axios
                    .post(API_URL + "/signup", newUser)
                    .then(resp => {
                        // console.log(
                        //     "New user signed up on Mongo DB!",
                        //     resp.data
                        // )

                        dispatch({ type: "SIGNUP_SUCCESS", displayName })
                    })
                    .catch(err => {
                        dispatch({ type: "SIGNUP_ERROR", err })
                    })
            })
            .catch(err => {
                dispatch({ type: "SIGNUP_ERROR", err })
            })
    }
}
