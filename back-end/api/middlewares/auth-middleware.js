import admin from "../../config/firebase-service"
import User from "../../models/user.model"

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

export const checkifWriter = (req, res, next) => {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req
            const userInfo = await admin.auth().verifyIdToken(authToken)
            const uid = userInfo.uid

            console.log('- - User is authenticated');

            // Get user data from mongo
            User.findOne({ uid }, (err, user) => {
                if (err) return res.status(400).json(err)

                if(user.role[0].name === 'writer') {
                    return next()
                }
                else {
                    return res
                    .status(401)
                    .send({ error: "You are not authorized to make this request. You do not have the correct role." })
                }
            })
        } catch (e) {
            console.log('– - User is not authenticated');
            return res
                .status(401)
                .send({ error: "You are not authorized to make this request" })
        }
    })
}

export const checkifContentSeeker = (req, res, next) => {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req
            const userInfo = await admin.auth().verifyIdToken(authToken)
            const uid = userInfo.uid

            console.log('- - User is authenticated');

            // Get user data from mongo
            User.findOne({ uid }, (err, user) => {
                if (err) return res.status(400).json(err)

                if(user.role[0].name === 'content seeker') {
                    return next()
                }
                else {
                    return res
                    .status(401)
                    .send({ error: "You are not authorized to make this request. You do not have the correct role." })
                }
            })
        } catch (e) {
            console.log('– - User is not authenticated');
            return res
                .status(401)
                .send({ error: "You are not authorized to make this request" })
        }
    })
}