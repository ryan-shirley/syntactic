const initState = {
    categories: []
}

const categoryReducer = (state = initState, action) => {
    switch (action.type) {
        case "FETCH_CATEGORIES_SUCCESS":
            return {
                ...state,
                categories: action.categories
            }
        case "CREATE_CATEGORY_SUCCESS":
            console.log("create category success")
            return state
        case "CREATE_CATEGORY_ERROR":
            console.log("create category error")
            return state
        default:
            return state
    }
}

export default categoryReducer
