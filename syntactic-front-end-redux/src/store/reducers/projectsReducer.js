const initState = {
    projects: [],
    singleProject: {},
    requestProcessing: false,
    error: ''
}

const projectsReducer = (state = initState, action) => {
    switch (action.type) {
        // Success
        case "ALL_PROJECTS_REQUESTED":
            return {
                ...state,
                projects: [],
                requestProcessing: true,
                error: ""
            }

        case "PROJECTS_REQUEST_SENT":
            return {
                ...state,
                requestProcessing: true,
                error: ""
            }

        case "PROJECT_CREATED_SUCCESSFULLY":
            return {
                ...state,
                requestProcessing: false,
                singleProject: action.payload,
                error: ""
            }

        case "PROJECTS_RECEIVED_SUCCESSFULLY":
            if (action.payload.message) {
                return {
                    ...state,
                    requestProcessing: false,
                    error: action.payload.message
                }
            }
            else {
                return {
                    ...state,
                    projects: action.payload,
                    requestProcessing: false,
                    error: ""
                }
            }

        // Errors
        case "PROJECTS_REQUEST_ERROR":
            return {
                ...state,
                error: action.payload,
                requestProcessing: false
            }
            
        default:
            return state
    }
}

export default projectsReducer
