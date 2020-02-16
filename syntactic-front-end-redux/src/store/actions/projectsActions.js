import API from "../../utils/API"
import axios from "axios"
const API_URL = process.env.REACT_APP_BACKEND_API

/**
 * getProject() return single project
 */
export const getProject = id => {
    return dispatch => {
        dispatch({ type: "PROJECTS_REQUEST_SENT" })

        API.get('/projects/' + id)
            .then(data => {
                dispatch({ type: "PROJECT_RECEIVED_SUCCESSFULLY", payload: data })
            }) 
            .catch(error => {
                dispatch({ type: "PROJECTS_REQUEST_ERROR", payload: error })
            })
    }
}


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

/**
 * createProject() create new project
 */
export const createProject = projectDTO => {
    return dispatch => {
        dispatch({ type: "PROJECTS_REQUEST_SENT" })

        API.send('post', '/projects', projectDTO)
            .then(data => {
                dispatch({ type: "PROJECT_CREATED_SUCCESSFULLY", payload: data })
            }) 
            .catch(error => {
                dispatch({ type: "PROJECTS_REQUEST_ERROR", payload: error })
            })
    }
}
