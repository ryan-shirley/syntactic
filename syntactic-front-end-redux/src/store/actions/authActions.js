import axios from "axios"
const API_URL = "http://localhost:4444"

export const signIn = credentials => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        firebase
            .auth()
            .signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(() => {
                console.log(firebase.auth().currentUser)

                dispatch({ type: "LOGIN_SUCCESS" })
            })
            .catch(err => {
                dispatch({ type: "LOGIN_ERROR", err })
            })
    }
}

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

export const signUp = newUser => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        console.log("Trying to sign up")

        firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then(resp => {
                console.log("New user signed up on Firebase!", resp)

                axios
                    .post(API_URL + "/signup", newUser)
                    .then(resp => {
                        console.log("New user signed up on Mongo DB!", resp.data)

                        dispatch({ type: "SIGNUP_SUCCESS" })
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
