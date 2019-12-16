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
        const firebase = getFirebase()

        firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(token => {
                // Current logged in user
                let user = firebase.auth().currentUser;
                const uid = user.uid

                axios
                    .get(
                        API_URL +
                            `/user/writer/${uid}/categories`,
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
            .catch(error => {
                // Handle error
                dispatch({ type: "FIREBASE_AUTH_GET_TOKEN_ERROR", error })
            })
    }
}
