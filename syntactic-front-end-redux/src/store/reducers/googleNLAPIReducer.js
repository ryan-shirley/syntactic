const initState = {
    completed: false,
    processing: false,
    error: null,
    briefResults: {
        analysis: [],
        results: [
            {
                bestMatch: {
                    category: '',
                    writers: []
                },
                writersAdditionalRelevantCats: {
                    category: '',
                    writers: []
                },
                writersLowerCat: {
                    category: '',
                    writers: []
                },
                writersSameL2Cat: {
                    category: '',
                    writers: []
                }
            }
        ]
    }
}

const googleNLAPIReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_CONTENT_ERROR":
            // console.log(action.error);
            return {
                ...state,
                error: action.error.details
            }
        case "ANALYSE_BRIEF_ERROR":
            return {
                ...state,
                error: action.error
            }
        case "ADD_CONTENT_SUCCESS":
            return {
                ...state,
                error: null
            }
        case "PROCESSING_CONTENT":
            return {
                ...state,
                processing: true,
                error: null
            }
        case "PROCESSING_BREIF":
            return {
                ...state,
                processing: true,
                error: null
            }
        case "ANALYSE_BRIEF_SUCCESS": {
            return {
                ...state,
                completed: true,
                processing: false,
                briefResults: action.results
            }
        }
        default:
            return state
    }
}

export default googleNLAPIReducer
