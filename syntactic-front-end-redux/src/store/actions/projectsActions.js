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
 * getWriters() return writers for a project
 */
export const getWriters = id => {
    return dispatch => {
        dispatch({ type: "PROJECTS_REQUEST_SENT" })

        API.get('/projects/' + id + '/writers')
            .then(data => {
                dispatch({ type: "PROJECT_WRITER_LIST_RECEIVED", payload: data })
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
                        if(res.data.code === 204) {
                            dispatch({ type: "PROJECTS_REQUEST_ERROR", payload: { message: res.data.message } })
                        }
                        else {
                            dispatch({ type: "PROJECTS_RECEIVED_SUCCESSFULLY", payload: res.data })
                        }
                    })
                    .catch(error => {
                        dispatch({ type: "PROJECTS_REQUEST_ERROR", payload: { message: error.response.data } })
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

        API.post('/projects', projectDTO)
            .then(data => {
                dispatch({ type: "PROJECT_CREATED_SUCCESSFULLY", payload: data })
            }) 
            .catch(error => {
                dispatch({ type: "PROJECTS_REQUEST_ERROR", payload: error })
            })
    }
}

/**
 * uploadBrief() create new project
 */
export const uploadBrief = (brief, projectId) => {
    return dispatch => {
        dispatch({ type: "PROJECTS_REQUEST_SENT" })

        API.uploadFile('/projects/' + projectId + '/upload/brief', brief)
            .then(data => {
                dispatch({ type: "PROJECT_UPDATED_SUCCESSFULLY", payload: data.project })
                dispatch({ type: "PROJECT_WRITER_LIST_RECEIVED", payload: data.writers })
            }) 
            .catch(error => {
                dispatch({ type: "PROJECTS_REQUEST_ERROR", payload: error })
            })
    }
}

/**
 * inviteWriterToProject() Invite writer to project
 */
export const inviteWriterToProject = (writer_id, project) => {
    // Update project with new information
    let updatedProject = project
    updatedProject.writer_id = writer_id
    updatedProject.status = 'invitation pending'

    return dispatch => {
        dispatch({ type: "PROJECTS_REQUEST_SENT" })

        API.put('/projects/' + updatedProject._id, updatedProject)
            .then(data => {
                dispatch({ type: "PROJECT_UPDATED_SUCCESSFULLY", payload: data })
            }) 
            .catch(error => {
                dispatch({ type: "PROJECTS_REQUEST_ERROR", payload: error })
            })
    }
}

/**
 * updateWriterDecision() Update writers decision on project acceptance
 */
export const updateWriterDecision = (decision, project) => {
    // Update project with new information
    let updatedProject = project

    // Decision = true – Writer accepts project
    if(decision) {
        updatedProject.status = 'writing'
    }
    else {
        updatedProject.writer_id = null
        updatedProject.status = 'invitation rejected'
    }

    return dispatch => {
        dispatch({ type: "PROJECTS_REQUEST_SENT" })

        API.put('/projects/' + updatedProject._id, updatedProject)
            .then(data => {
                dispatch({ type: "PROJECT_UPDATED_SUCCESSFULLY", payload: data })
            }) 
            .catch(error => {
                dispatch({ type: "PROJECTS_REQUEST_ERROR", payload: error })
            })
    }
}

/**
 * saveText() Update text in project
 */
export const saveText = (newText, project) => {
    return dispatch => {
        // Update project with new information
        let updatedProject = project
        updatedProject.content = newText

        dispatch({ type: "PROJECTS_REQUEST_SENT" })

        API.put('/projects/' + updatedProject._id, updatedProject)
            .then(data => {
                dispatch({ type: "PROJECT_UPDATED_SUCCESSFULLY", payload: data })
            }) 
            .catch(error => {
                dispatch({ type: "PROJECTS_REQUEST_ERROR", payload: error })
            })
    }
}

/**
 * submitText() Submit text for approval
 */
export const submitText = (data, project) => {
    return dispatch => {
        // Update project with new information
        let updatedProject = project

        if (updatedProject.deliverables) {
            updatedProject.deliverables.push(data)
        } else {
            updatedProject.deliverables = [data]
        }

        dispatch({ type: "PROJECTS_REQUEST_SENT" })

        API.put('/projects/' + updatedProject._id, updatedProject)
            .then(data => {
                dispatch({ type: "PROJECT_UPDATED_SUCCESSFULLY", payload: data })
            }) 
            .catch(error => {
                dispatch({ type: "PROJECTS_REQUEST_ERROR", payload: error })
            })
    }
}

/**
 * updateDeliverable() create new project
 */
export const updateDeliverable = (deliverable, project) => {
    return dispatch => {
        // dispatch({ type: "PROJECTS_REQUEST_SENT" })

        // Update Deliverable
        for(let i = 0; i < project.deliverables.length; i++) {
            let deliv = project.deliverables[i]

            if(deliv._id === deliverable._id) {
                project.deliverables[i] = deliverable
            }
        }

        API.put('/projects/' + project._id, project)
            .then(data => {
                dispatch({ type: "PROJECT_UPDATED_SUCCESSFULLY", payload: data })
            }) 
            .catch(error => {
                dispatch({ type: "PROJECTS_REQUEST_ERROR", payload: error })
            })
    }
}
