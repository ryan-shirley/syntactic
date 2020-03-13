import admin from "../../config/firebase-service"
const axios = require("axios")

let csFirebaseToken = async () => {
    let customToken = await admin
        .auth()
        .createCustomToken("iDtDuZ0gC9c06sMJmovO8XANql33")

    let response = await axios.post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.FIREBASE_AUTH_API_KEY}`,
        {
            token: customToken,
            returnSecureToken: true
        }
    )

    return response.data.idToken
}
let wFirebaseToken = async () => {
    let customToken = await admin
        .auth()
        .createCustomToken("CgDu81fxdfQWpSQiQS9NAN5V9Vk2")

    let response = await axios.post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.FIREBASE_AUTH_API_KEY}`,
        {
            token: customToken,
            returnSecureToken: true
        }
    )

    return response.data.idToken
}

export { csFirebaseToken, wFirebaseToken }
