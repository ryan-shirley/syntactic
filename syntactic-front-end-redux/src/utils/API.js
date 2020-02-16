import store from "../store"
import axios from "axios"
const API_URI = process.env.REACT_APP_BACKEND_API

export default {
    post: (url, data = null, authRequired = true) => {
        // Setup request config
        let config = {}
        if(authRequired) {
            const state = store.getState()
            let token = state.firebase.auth.stsTokenManager.accessToken
            config.headers = { Authorization: `Bearer ${token}` }
        }

        // axios request
        // Return promise so that .then & .catch can be called from outside the class when this method is called
        return new Promise((resolve, reject) => {
            axios.post(API_URI + url, data, config)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error.response.data)
                })
        })
    },
    get: (url, authRequired = true) => {
        // Setup request config
        let config = {}
        if(authRequired) {
            const state = store.getState()
            let token = state.firebase.auth.stsTokenManager.accessToken
            config.headers = { Authorization: `Bearer ${token}` }
        }

        // axios request
        // Return promise so that .then & .catch can be called from outside the class when this method is called
        return new Promise((resolve, reject) => {
            axios.get(API_URI + url, config)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error.response.data)
                })
        })
    }
}
