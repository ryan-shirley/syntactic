import React from "react"

// Firebase Auth
import { StyledFirebaseAuth } from "react-firebaseui"
import firebase from "firebase/app"
import "firebase/auth"

// Firebase UI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "redirect",
    // Redirect to /dashboard after sign in is successful.
    signInSuccessUrl: "/dashboard",
    // We will display Google as the auth provider.
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
}

const FirebaseAuthSignIn = () => {
    return (
        <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
        />
    )
}

export default FirebaseAuthSignIn
