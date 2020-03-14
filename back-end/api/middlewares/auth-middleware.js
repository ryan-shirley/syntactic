import admin from "../../config/firebase-service"

// Services
const UserService = require("../../services/user.service")

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
            // console.log('- - User is authenticated');

            // Call to service layer - Get current user thats logged in
            const user = await UserService.getCurrentUser(authToken)
            req.user = user

            return next()
        } catch (e) {
            // console.log('– - User is not authenticated');
            return res.status(401).json({
                code: 401,
                message: "You are not authorized to make this request"
            })
        }
    })
}

export const checkifWriter = (req, res, next) => {
    const role = req.user.role[0].name

    if (role === "writer") {
        return next()
    } else {
        return res.status(401).send({
            code: 401,
            message:
                "You are not authorized to make this request. You do not have the correct role."
        })
    }
}

export const checkifContentSeeker = (req, res, next) => {
    const role = req.user.role[0].name

    if (role === "content seeker") {
        return next()
    } else {
        return res.status(401).send({
            code: 401,
            message:
                "You are not authorized to make this request. You do not have the correct role."
        })
    }
}
