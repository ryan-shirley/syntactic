import axios from "axios"

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

export function fetchCategories() {
    // const categories = [
    //     { id: "1", title: "Test", content: "this is data" },
    //     { id: "2", title: "Test 2", content: "this is data 2" }
    // ]
    return (dispatch, getState, { getFirebase }) => {
        console.log("Fetching Categories")
        const firebase = getFirebase()

        // const token = await auth.currentUser.getIdToken();
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(token) {
            // Send token to your backend via HTTPS
            // console.log(idToken);

            axios
            .get(
                "http://localhost:4444/users/writer/5dd92e71e5cfa00b6e369d52/categories",
                { headers: { authorization: `Bearer ${token}` } }
            )
            .then(res => {
                const categories = res.data.categories

                dispatch({ type: "FETCH_CATEGORIES_SUCCESS", categories })
            })
            .catch(error => {
                dispatch({ type: "FETCH_CATEGORIES_ERROR" })
            })

          }).catch(function(error) {
            // Handle error
          });

        

        // dispatch({ type: "FETCH_CATEGORIES_SUCCESS", categories })

        // dispatch(fetchProductsBegin())
        // return fakeGetProducts()
        //     .then(json => {
        //         dispatch(fetchProductsSuccess(json.products))
        //         return json.products
        //     })
        //     .catch(error => dispatch(fetchProductsFailure(error)))
    }
}
