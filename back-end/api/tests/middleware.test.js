const app = require("../../app") // Link to your server
const request = require("supertest")(app)
import { csFirebaseToken, wFirebaseToken } from "./firebase.mock"

it("Auth middleware fail", async () => {
    const response = await request.post("/users/current")

    expect(response.status).toBe(401)
})

it("Auth middleware pass", async () => {
    let token = await csFirebaseToken()

    return request
        .get("/users/current")
        .set("Authorization", `Bearer ${token}`)
        .then(response => {
            expect(response.body.email).toBe("rey.kreiger@syntactic.com")
        })
})

it("Writer middleware fail", async () => {
    let token = await csFirebaseToken()

    return request
        .post("/analyse/project")
        .set("Authorization", `Bearer ${token}`)
        .then(response => {
            expect(response.status).toBe(401)
        })
})

it("Content Seeker middleware fail", async () => {
    let token = await wFirebaseToken()

    return request
        .post("/projects")
        .set("Authorization", `Bearer ${token}`)
        .then(response => {
            expect(response.status).toBe(401)
        })
})
