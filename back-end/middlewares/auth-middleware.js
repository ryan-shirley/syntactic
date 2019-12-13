import admin from "../firebase-service"

const getAuthToken = (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        req.authToken = req.headers.authorization.split(" ")[1]
    } else {
        req.authToken = null
    }
    next()
}

export const checkIfAuthenticated = (req, res, next) => {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req
            const userInfo = await admin.auth().verifyIdToken(authToken)
            req.authId = userInfo.uid
            console.log('- - User is authenticated');
            
            return next()
        } catch (e) {
            console.log('– - User is not authenticated');
            return res
                .status(401)
                .send({ error: "You are not authorized to make this request" })
        }
    })
}