const initState = {
    projects: [],
    requestProcessing: false,
    error: ''
}

const projectsReducer = (state = initState, action) => {
    switch (action.type) {
        // Success
        case "ALL_PROJECTS_REQUESTED":
            return {
                ...state,
                requestProcessing: true,
                error: ""
            }

        case "PROJECTS_RECEIVED_SUCCESSFULLY":
            return {
                ...state,
                projects: action.payload,
                requestProcessing: false,
                error: ""
            }

        // Errors
        case "ONBOARDING_REQUEST_ERROR":
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
