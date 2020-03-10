const initState = {
    projects: [],
    singleProject: {},
    writersList: {},
    requestProcessing: false,
    isProcessingCompletion: false,
    justCreated: false,
    error: "",
    projectDisplay: 'table'
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

        case "PROJECTS_FINISH_PROCESSING":
            return {
                ...state,
                isProcessingCompletion: true,
                error: ""
            }

        case "PROJECT_RECEIVED_SUCCESSFULLY":
            return {
                ...state,
                requestProcessing: false,
                singleProject: action.payload,
                error: ""
            }

        case "PROJECT_CREATED_SUCCESSFULLY":
            return {
                ...state,
                requestProcessing: false,
                singleProject: action.payload,
                justCreated: true,
                error: ""
            }

        case "PROJECT_UPDATED_SUCCESSFULLY":
            return {
                ...state,
                requestProcessing: false,
                singleProject: action.payload,
                error: ""
            }

        case "PROJECT_COMPLETED_SUCCESSFULLY":
            return {
                ...state,
                isProcessingCompletion: false,
                singleProject: action.payload,
                error: ""
            }

        case "PROJECT_DELETED_SUCCESSFULLY":
            let projects = state.projects
            let idToRemove = action.payload
            let filteredProjects = projects.filter(
                project => project._id !== idToRemove
            )

            return {
                ...state,
                projects: filteredProjects,
                error: ""
            }

        case "PROJECT_WRITER_LIST_RECEIVED":
            return {
                ...state,
                requestProcessing: false,
                writersList: action.payload,
                error: ""
            }

        case "CLEAR_SINGLE_PROJECT":
            return {
                ...state,
                singleProject: {},
                justCreated: false,
                error: ""
            }

        case "CLEAR_PROJECTS_LIST":
            return {
                ...state,
                projects: [],
                error: ""
            }

        case "SWITCH_PROJECT_LAYOUT":
            return {
                ...state,
                projectDisplay: action.payload
            }

        case "PROJECTS_RECEIVED_SUCCESSFULLY":
            if (action.payload.message) {
                return {
                    ...state,
                    requestProcessing: false,
                    error: action.payload.message
                }
            } else {
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
