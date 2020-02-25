import store from "../store"
import axios from "axios"
const API_URI = process.env.REACT_APP_BACKEND_API

export default {
    post: (url, data, authRequired = true) => {
        // Setup request config
        let config = {}
        if (authRequired) {
            const state = store.getState()
            let token = state.firebase.auth.stsTokenManager.accessToken
            config.headers = { Authorization: `Bearer ${token}` }
        }

        // axios request
        // Return promise so that .then & .catch can be called from outside the class when this method is called
        return new Promise((resolve, reject) => {
            axios
                .post(API_URI + url, data, config)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error.response.data)
                })
        })
    },
    put: (url, data) => {
        // Setup request config
        let config = {}
        const state = store.getState()
        let token = state.firebase.auth.stsTokenManager.accessToken
        config.headers = { Authorization: `Bearer ${token}` }

        // axios request
        // Return promise so that .then & .catch can be called from outside the class when this method is called
        return new Promise((resolve, reject) => {
            axios
                .put(API_URI + url, data, config)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error.response.data)
                })
        })
    },
    uploadFile: (url, file) => {
        // Setup request config
        let config = {}
        const state = store.getState()
        let token = state.firebase.auth.stsTokenManager.accessToken
        config.headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }

        // axios request
        // Return promise so that .then & .catch can be called from outside the class when this method is called
        return new Promise((resolve, reject) => {
            let formData = new FormData()
            formData.append("file", file)

            axios.defaults.headers.common[
                "Authorization"
            ] = localStorage.getItem("jwtToken")
            axios
                .post(API_URI + url, formData, config)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error.response.data)
                })
        })
    },
    uploadFiles: (url, files) => {
        // Setup request config
        let config = {}
        const state = store.getState()
        let token = state.firebase.auth.stsTokenManager.accessToken
        config.headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }

        // axios request
        // Return promise so that .then & .catch can be called from outside the class when this method is called
        return new Promise((resolve, reject) => {
            let formData = new FormData()

            for (var i = 0; i < files.length; i++) {
                let file = files[i]
                formData.append("file", file)
            }

            axios.defaults.headers.common[
                "Authorization"
            ] = localStorage.getItem("jwtToken")
            axios
                .post(API_URI + url, formData, config)
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
        if (authRequired) {
            const state = store.getState()
            let token = state.firebase.auth.stsTokenManager.accessToken
            config.headers = { Authorization: `Bearer ${token}` }
        }

        // axios request
        // Return promise so that .then & .catch can be called from outside the class when this method is called
        return new Promise((resolve, reject) => {
            axios
                .get(API_URI + url, config)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error.response.data)
                })
        })
    },
    delete: (url) => {
        // Setup request config
        let config = {}
        const state = store.getState()
        let token = state.firebase.auth.stsTokenManager.accessToken
        config.headers = { Authorization: `Bearer ${token}` }

        // axios request
        // Return promise so that .then & .catch can be called from outside the class when this method is called
        return new Promise((resolve, reject) => {
            axios
                .delete(API_URI + url, config)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error.response.data)
                })
        })
    }
}
