import axios from "axios"
const API_URL = process.env.REACT_APP_BACKEND_API

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
export const signUp = (newUser, role) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

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
                        newUser.role = role === "writer" ? "writer" : "content seeker"

                        axios
                            .post(API_URL + "/signup", newUser)
                            .then(resp => {
                                // console.log(
                                //     "New user signed up on Mongo DB!",
                                //     resp.data
                                // )
                                dispatch({ type: "SIGNUP_SUCCESS" })
                            })
                            .catch(err => {
                                dispatch({ type: "SIGNUP_ERROR", err })
                            })
                    })
            })
            .catch(err => {
                dispatch({ type: "SIGNUP_ERROR", err })
            })
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

                        dispatch({
                            type: "FETCH_USER_SUCCESS",
                            user
                        })
                    })
                    .catch(error => {
                        dispatch({ type: "FETCH_USER_ERROR" }, error)
                    })
            })
            .catch(function(error) {
                // Handle error
                dispatch({ type: "FIREBASE_AUTH_GET_TOKEN_ERROR" })
            })
    }
}
