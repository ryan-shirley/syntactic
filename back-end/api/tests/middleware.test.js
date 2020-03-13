const app = require("../../app") // Link to your server
const request = require("supertest")(app)
import { csFirebaseToken } from "./firebase.mock"

it("Get current user without auth", async () => {
    const response = await request.post("/users/current")

    expect(response.status).toBe(401)
})

it("Get current user with auth", async () => {
    let token = await csFirebaseToken()

    return request
        .get("/users/current")
        .set("Authorization", `Bearer ${token}`)
        .then(response => {
            expect(response.body.email).toBe("rey.kreiger@syntactic.com")
        })
})
