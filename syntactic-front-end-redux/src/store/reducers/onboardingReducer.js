const initState = {
    stage: 1,
    content: [],
    bio: '',
    business: '',
    inputType: null,
    waitingForResponse: false,
    error: '',
    completed: false
}

const onboardingReducer = (state = initState, action) => {
    let stage, error

    switch (action.type) {
        case "PREVIOUS_STAGE":
            stage = state.stage - 1

            return {
                ...state,
                stage
            }
        case "NEXT_STAGE":
            stage = state.stage + 1

            return {
                ...state,
                stage
            }
        case "SET_STAGE":
            return {
                ...state,
                stage: action.stage,
                inputType: action.inputType
            }
        case "PROCESSING_TRUE":
            return {
                ...state,
                waitingForResponse: true,
                error: ''
            }
        case "UPDATE_BIO_SUCCESS":
            return {
                ...state,
                bio: action.newBio,
                waitingForResponse: false,
                successfulResponse: true,
                error: ''
            }
        case "UPDATE_BIO_ERROR":
            error = action.error.details || action.error

            return {
                ...state,
                waitingForResponse: false,
                error
            }
            case "UPDATE_BUSINESS_DESCRIPTION_SUCCESS":
                return {
                    ...state,
                    business: action.newDesc,
                    waitingForResponse: false,
                    successfulResponse: true,
                    error: ''
                }
            case "UPDATE_BUSINESS_DESCRIPTION_ERROR":
                error = action.error.details || action.error
    
                return {
                    ...state,
                    waitingForResponse: false,
                    error
                }
        case "ADD_CONTENT_SUCCESS":
            const newContent = [...state['content'], action.text]

            return {
                ...state,
                content: newContent,
                waitingForResponse: false,
                error: ''
            }
        case "ADD_CONTENT_ERROR":
            error = action.error.details || action.error

            return {
                ...state,
                waitingForResponse: false,
                error
            }
        case "FINISHED_ONBOARDING_SUCCESS":
            return {
                ...state,
                completed: true,
                waitingForResponse: false,
                error: ''
            }
        case "FINISHED_ONBOARDING_ERROR": 

            return {
                ...state,
                waitingForResponse: false,
                error: action.error
            }
        case "FIREBASE_AUTH_GET_TOKEN_ERROR":
            return state
        default:
            return state
    }
}

export default onboardingReducer
