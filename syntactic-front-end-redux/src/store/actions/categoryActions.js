import axios from "axios"
const API_URL = "http://localhost:4444"

export const createCategory = project => {
    return (dispatch, getState) => {
        // const profile = getState().firebase.profile
        // const authorId = getState().firebase.auth.uid

        dispatch({ type: "CREATE_CATEGORY_SUCCESS" })

        // TODO: Do ASYNC request for data
        // .then(() => {
        //     dispatch({ type: "CREATE_CATEGORY_SUCCESS" })
        // })
        // .catch(err => {
        //     dispatch({ type: "CREATE_CATEGORY_ERROR" }, err)
        // })
    }
}

/**
 * fetchCategories() Get all the categories for
 * the individual writer that they have written on.
 */
export function fetchCategories() {
    return (dispatch, getState, { getFirebase }) => {
        console.log("Fetching Categories")
        const firebase = getFirebase()

        firebase
            .auth()
            .currentUser.getIdToken(/* forceRefresh */ true)
            .then(function(token) {
                // TODO: replace UID with actual users UID
                axios
                    .get(
                        API_URL +
                            "/users/writer/5dd92e71e5cfa00b6e369d52/categories",
                        { headers: { authorization: `Bearer ${token}` } }
                    )
                    .then(res => {
                        const categories = res.data.categories

                        dispatch({
                            type: "FETCH_CATEGORIES_SUCCESS",
                            categories
                        })
                    })
                    .catch(error => {
                        dispatch({ type: "FETCH_CATEGORIES_ERROR" })
                    })
            })
            .catch(function(error) {
                // Handle error
                dispatch({ type: "FIREBASE_AUTH_GET_TOKEN_ERROR" })
            })
    }
}
