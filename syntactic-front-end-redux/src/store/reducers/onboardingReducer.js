const initState = {
    completed: false,
    contentCount: 0,
    stage: 1,
    requestProcessing: false,
    bio: "",
    business: "",
    inputType: null,
    error: ""
}

const onboardingReducer = (state = initState, action) => {
    switch (action.type) {
        // Success
        case "MOVE_STAGE":
            let stage = state.stage + action.value

            return {
                ...state,
                stage,
                error: "",
                inputType: null
            }

        case "SET_STAGE":
            return {
                ...state,
                stage: action.value,
                error: "",
                inputType: null
            }

        case "ONBOARDING_REQUEST_PROCESSING_STARTED":
            return {
                ...state,
                requestProcessing: true
            }

        case "BIO_ADDED_SUCCESSFULLY":
            return {
                ...state,
                bio: action.value,
                requestProcessing: false
            }

        case "ONBOARDING_SET_INPUT_TYPE":
            return {
                ...state,
                inputType: action.value
            }

        case "PROJECT_ANALYSED_SUCCESS":
            let contentCount = state.contentCount + 1

            return {
                ...state,
                contentCount,
                requestProcessing: false
            }
        
        case "ONBOARDING_COMPLETED":
            return {
                ...state,
                completed: true,
                requestProcessing: false,
                error: ''
            }

        // Errors
        case "ERROR_ONBOARDING_NO_VALUE_INPUT":
            return {
                ...state,
                error: action.error
            }

        case "ONBOARDING_REQUEST_ERROR":
            return {
                ...state,
                requestProcessing: false,
                error: action.error
            }
            
        default:
            return state
    }
}

export default onboardingReducer
