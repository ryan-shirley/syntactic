import axios from "axios"
const API_URL = process.env.REACT_APP_BACKEND_API

/**
 * getAllProjects() return all projects
 */
export const getAllProjects = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(token => {
                dispatch({ type: "ALL_PROJECTS_REQUESTED" })

                axios
                    .get(API_URL + "/projects", {
                        headers: { authorization: `Bearer ${token}` }
                    })
                    .then(res => {
                        dispatch({ type: "PROJECTS_RECEIVED_SUCCESSFULLY", payload: res.data })
                    })
                    .catch(error => {
                        dispatch({ type: "ONBOARDING_REQUEST_ERROR", payload: { message: error.response.data } })
                    })
            })
            .catch(error => {
                // Handle error
                dispatch({ type: "FIREBASE_AUTH_GET_TOKEN_ERROR", payload: { message: error } })
            })
    }
}
