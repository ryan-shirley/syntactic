import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import { createStore, applyMiddleware, compose } from "redux"
import rootReducer from "./store/reducers/rootReducer"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import { reactReduxFirebase, getFirebase } from "react-redux-firebase"
import fbConfig from "./config/fbConfig"


const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase })),
        reactReduxFirebase(fbConfig, { attachAuthIsReady: true })
    )
)

store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById("root")
    )
    registerServiceWorker()
})
